"""File storage abstraction — local filesystem with S3-ready interface."""

from __future__ import annotations

import logging
import os
import shutil
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import BinaryIO

from app.config import get_settings

logger = logging.getLogger(__name__)


class FileStorage:
    """Local file storage with organized directory structure.

    Stores files under: {storage_root}/{product}/{doc_type}/{YYYY}/{MM}/{filename}
    Ready to swap backend to S3/MinIO by overriding _put_file / _get_file / _delete_file.
    """

    def __init__(self, root: str | None = None) -> None:
        settings = get_settings()
        self._root = Path(root or settings.DOCUMENT_STORAGE_PATH)
        self._root.mkdir(parents=True, exist_ok=True)

    def save(
        self,
        data: BinaryIO,
        filename: str,
        product: str = "general",
        doc_type: str = "documents",
        content_type: str = "application/octet-stream",
    ) -> dict:
        """Save a file and return metadata."""
        now = datetime.now(timezone.utc)
        safe_name = self._safe_filename(filename)
        rel_path = (
            f"{product}/{doc_type}/{now.year}/{now.month:02d}/{safe_name}"
        )
        full_path = self._root / rel_path
        full_path.parent.mkdir(parents=True, exist_ok=True)

        with open(full_path, "wb") as f:
            shutil.copyfileobj(data, f)

        size = full_path.stat().st_size
        logger.info("Stored file: %s (%d bytes)", rel_path, size)

        return {
            "path": rel_path,
            "filename": safe_name,
            "size": size,
            "content_type": content_type,
            "stored_at": now.isoformat(),
        }

    def save_bytes(
        self,
        data: bytes,
        filename: str,
        product: str = "general",
        doc_type: str = "documents",
        content_type: str = "application/octet-stream",
    ) -> dict:
        """Save raw bytes."""
        import io

        return self.save(io.BytesIO(data), filename, product, doc_type, content_type)

    def get_path(self, rel_path: str) -> Path:
        """Resolve a relative storage path to absolute."""
        full = self._root / rel_path
        if not full.exists():
            raise FileNotFoundError(f"File not found: {rel_path}")
        return full

    def get_bytes(self, rel_path: str) -> bytes:
        """Read file contents as bytes."""
        return self.get_path(rel_path).read_bytes()

    def delete(self, rel_path: str) -> bool:
        """Delete a stored file."""
        full = self._root / rel_path
        if full.exists():
            full.unlink()
            logger.info("Deleted file: %s", rel_path)
            return True
        return False

    def list_files(
        self,
        product: str | None = None,
        doc_type: str | None = None,
    ) -> list[dict]:
        """List stored files with optional filtering."""
        search = self._root
        if product:
            search = search / product
        if doc_type:
            search = search / doc_type

        results = []
        if not search.exists():
            return results

        for path in search.rglob("*"):
            if path.is_file():
                rel = path.relative_to(self._root)
                results.append({
                    "path": str(rel),
                    "filename": path.name,
                    "size": path.stat().st_size,
                    "stored_at": datetime.fromtimestamp(
                        path.stat().st_mtime, tz=timezone.utc
                    ).isoformat(),
                })
        return results

    @staticmethod
    def _safe_filename(name: str) -> str:
        """Sanitize filename, preserving extension."""
        base = Path(name).stem
        ext = Path(name).suffix
        safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in base)
        uid = uuid.uuid4().hex[:8]
        return f"{safe}_{uid}{ext}"


class _SingletonHolder:
    _instance: FileStorage | None = None

    def get_instance(self) -> FileStorage:
        if self._instance is None:
            self._instance = FileStorage()
        return self._instance


_holder = _SingletonHolder()


def get_file_storage() -> FileStorage:
    return _holder.get_instance()
