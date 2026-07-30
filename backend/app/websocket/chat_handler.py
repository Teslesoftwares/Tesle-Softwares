"""Anonymous chat WebSocket — session-based, no JWT required."""

import json
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

logger = logging.getLogger(__name__)

router = APIRouter()


class ChatConnectionManager:
    def __init__(self):
        self._sessions: dict[str, set[WebSocket]] = {}

    async def connect(self, ws: WebSocket, session_id: str) -> None:
        await ws.accept()
        self._sessions.setdefault(session_id, set()).add(ws)

    def disconnect(self, ws: WebSocket, session_id: str) -> None:
        self._sessions.get(session_id, set()).discard(ws)
        if not self._sessions.get(session_id):
            self._sessions.pop(session_id, None)

    async def broadcast_to_session(self, session_id: str, event: str, data: object) -> None:
        msg = json.dumps({"event": event, "data": data, "ts": datetime.now(timezone.utc).isoformat()})
        for ws in list(self._sessions.get(session_id, set())):
            try:
                await ws.send_text(msg)
            except Exception:
                self._sessions.get(session_id, set()).discard(ws)

    @property
    def active_connections(self) -> int:
        return sum(len(conns) for conns in self._sessions.values())


chat_manager = ChatConnectionManager()


@router.websocket("/ws/chat/{session_id}")
async def chat_websocket(ws: WebSocket, session_id: str):
    await chat_manager.connect(ws, session_id)
    try:
        while True:
            raw = await ws.receive_text()
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                await ws.send_text(json.dumps({"event": "error", "data": {"message": "Invalid JSON"}}))
                continue

            event = msg.get("event", "")
            if event == "ping":
                await ws.send_text(json.dumps({"event": "pong"}))
            else:
                await ws.send_text(json.dumps({"event": "error", "data": {"message": f"Unknown event: {event}"}}))
    except WebSocketDisconnect:
        chat_manager.disconnect(ws, session_id)
    except Exception:
        logger.exception("Chat WS error")
        chat_manager.disconnect(ws, session_id)
