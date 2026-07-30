"""WebSocket connection manager — room-based pub/sub replacing Socket.IO."""

import json
import logging
from datetime import datetime, timezone
from fastapi import WebSocket

logger = logging.getLogger(__name__)


class ConnectionManager:
    """Tracks WebSocket connections by user, org, workspace, and team rooms."""

    def __init__(self):
        # room_name -> set of (user_id, websocket)
        self._rooms: dict[str, set[tuple[int, WebSocket]]] = {}
        # user_id -> set of websockets (all connections for that user)
        self._user_connections: dict[int, set[WebSocket]] = {}

    # ── connection lifecycle ──────────────────────────────────────────────

    async def connect(
        self, ws: WebSocket, user_id: int, org_id: int | None = None
    ) -> None:
        await ws.accept()
        self._user_connections.setdefault(user_id, set()).add(ws)
        # auto-join user room
        self._join("user", user_id, ws, user_id)
        if org_id is not None:
            self._join("org", org_id, ws, user_id)

    def disconnect(self, ws: WebSocket, user_id: int) -> None:
        self._user_connections.get(user_id, set()).discard(ws)
        if not self._user_connections.get(user_id):
            self._user_connections.pop(user_id, None)
        # remove from all rooms
        to_remove = []
        for room_name, members in self._rooms.items():
            members.discard((user_id, ws))
            if not members:
                to_remove.append(room_name)
        for room_name in to_remove:
            del self._rooms[room_name]

    # ── room management ──────────────────────────────────────────────────

    def join_room(
        self, room_type: str, room_id: int, ws: WebSocket, user_id: int
    ) -> None:
        self._join(room_type, room_id, ws, user_id)

    def leave_room(
        self, room_type: str, room_id: int, ws: WebSocket, user_id: int
    ) -> None:
        key = self._room_key(room_type, room_id)
        self._rooms.get(key, set()).discard((user_id, ws))

    # ── sending messages ─────────────────────────────────────────────────

    async def send_to_user(self, user_id: int, event: str, data: object) -> None:
        msg = json.dumps({"event": event, "data": data, "ts": _now_iso()})
        for ws in list(self._user_connections.get(user_id, set())):
            try:
                await ws.send_text(msg)
            except Exception:
                self._user_connections.get(user_id, set()).discard(ws)

    async def send_to_room(
        self, room_type: str, room_id: int, event: str, data: object
    ) -> None:
        key = self._room_key(room_type, room_id)
        msg = json.dumps({"event": event, "data": data, "ts": _now_iso()})
        for uid, ws in list(self._rooms.get(key, set())):
            try:
                await ws.send_text(msg)
            except Exception:
                self.disconnect(ws, uid)

    async def broadcast(self, event: str, data: object) -> None:
        msg = json.dumps({"event": event, "data": data, "ts": _now_iso()})
        for uid, ws in list(self._rooms.get("user:*", set())):
            try:
                await ws.send_text(msg)
            except Exception:
                self.disconnect(ws, uid)

    # ── helpers ──────────────────────────────────────────────────────────

    def _join(
        self, room_type: str, room_id: int, ws: WebSocket, user_id: int
    ) -> None:
        key = self._room_key(room_type, room_id)
        self._rooms.setdefault(key, set()).add((user_id, ws))
        # also join global broadcast room if first connection
        self._rooms.setdefault("user:*", set()).add((user_id, ws))

    @staticmethod
    def _room_key(room_type: str, room_id: int) -> str:
        return f"{room_type}:{room_id}"

    @property
    def active_count(self) -> int:
        return sum(len(c) for c in self._user_connections.values())


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


manager = ConnectionManager()
