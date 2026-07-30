"""WebSocket endpoint — native FastAPI WebSocket replacing Socket.IO.

Auth via JWT query param: ws://localhost:3000/ws?token=<jwt>
Events are JSON: {"event": "<name>", "data": {...}}
"""

import json
import logging
from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect

from app.services.auth import decode_access_token
from app.websocket.manager import manager

logger = logging.getLogger(__name__)

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    ws: WebSocket,
    token: str = Query(default=None),
):
    # ── authenticate ─────────────────────────────────────────────────────
    user_id: int | None = None
    org_id: int | None = None
    if token:
        payload = decode_access_token(token)
        if payload:
            user_id = payload.get("id")
            org_id = payload.get("orgId")

    if user_id is None:
        # allow anonymous but reject
        await ws.close(code=4001, reason="Missing or invalid token")
        return

    await manager.connect(ws, user_id, org_id)

    try:
        while True:
            raw = await ws.receive_text()
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                await ws.send_text(
                    json.dumps({"event": "error", "data": {"message": "Invalid JSON"}})
                )
                continue

            event = msg.get("event", "")
            data = msg.get("data", {})

            # ── room management events ────────────────────────────────
            if event == "join":
                uid = data.get("userId")
                if uid == user_id:
                    manager.join_room("user", uid, ws, uid)

            elif event == "join:org":
                oid = data.get("orgId")
                if oid is not None:
                    manager.join_room("org", oid, ws, user_id)

            elif event == "join:workspace":
                ws_id = data.get("workspaceId")
                if ws_id is not None:
                    manager.join_room("workspace", ws_id, ws, user_id)

            elif event == "join:team":
                team_id = data.get("teamId")
                if team_id is not None:
                    manager.join_room("team", team_id, ws, user_id)

            elif event == "leave:org":
                oid = data.get("orgId")
                if oid is not None:
                    manager.leave_room("org", oid, ws, user_id)

            elif event == "leave:workspace":
                ws_id = data.get("workspaceId")
                if ws_id is not None:
                    manager.leave_room("workspace", ws_id, ws, user_id)

            elif event == "leave:team":
                team_id = data.get("teamId")
                if team_id is not None:
                    manager.leave_room("team", team_id, ws, user_id)

            else:
                await ws.send_text(
                    json.dumps({"event": "error", "data": {"message": f"Unknown event: {event}"}})
                )

    except WebSocketDisconnect:
        manager.disconnect(ws, user_id)
    except Exception as exc:
        logger.exception("WebSocket error: %s", exc)
        manager.disconnect(ws, user_id)
