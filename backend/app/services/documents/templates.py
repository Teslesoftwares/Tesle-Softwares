"""Template engine — dynamic data injection for document generation."""

from __future__ import annotations

import logging
import re
from datetime import date, datetime
from decimal import Decimal
from typing import Any

logger = logging.getLogger(__name__)


class TemplateEngine:
    """Simple template engine with {{variable}} interpolation and conditional blocks.

    Supports:
      - {{variable}} interpolation
      - {{variable | default("fallback")}} with defaults
      - {{item.field}} dot-notation for nested data
      - Currency formatting: {{amount | currency}}
      - Date formatting: {{date | date("YYYY-MM-DD")}}
    """

    def render(self, template: str, data: dict[str, Any]) -> str:
        """Render a template string with the given data context."""
        result = template
        # Handle {{ var | filter("arg") }} patterns
        result = re.sub(
            r"\{\{\s*(.+?)\s*\}\}",
            lambda m: self._evaluate(m.group(1), data),
            result,
        )
        return result

    def render_sections(self, template: str, data: dict[str, Any]) -> str:
        """Render template with section blocks: {% section_name %}...{% /section_name %}"""
        result = self.render(template, data)
        # Process conditional sections: {% if var %}...{% endif %}
        result = re.sub(
            r"\{%\s*if\s+(\w+)\s*%\}(.*?)\{%\s*endif\s*%\}",
            lambda m: m.group(2) if self._resolve(m.group(1), data) else "",
            result,
            flags=re.DOTALL,
        )
        return result

    def _evaluate(self, expression: str, data: dict[str, Any]) -> str:
        """Evaluate a single template expression."""
        parts = [p.strip() for p in expression.split("|")]
        value_expr = parts[0]
        filters = parts[1:] if len(parts) > 1 else []

        value = self._resolve(value_expr, data)

        for filt in filters:
            value = self._apply_filter(value, filt)

        return self._to_string(value)

    def _resolve(self, path: str, data: dict[str, Any]) -> Any:
        """Resolve a dot-notation path against the data context."""
        keys = path.split(".")
        current: Any = data
        for key in keys:
            if isinstance(current, dict):
                current = current.get(key)
            elif hasattr(current, key):
                current = getattr(current, key)
            else:
                return None
        return current

    def _apply_filter(self, value: Any, filt: str) -> Any:
        """Apply a named filter to a value."""
        match = re.match(r'(\w+)(?:\("(.+?)"\))?', filt)
        if not match:
            return value

        name = match.group(1)
        arg = match.group(2)

        if name == "default":
            return value if value is not None else (arg or "")
        elif name == "currency":
            if value is None:
                return "$0.00"
            if isinstance(value, str):
                try:
                    value = Decimal(value)
                except Exception:
                    return value
            return f"${value:,.2f}"
        elif name == "date":
            if value is None:
                return ""
            if isinstance(value, str):
                try:
                    value = datetime.fromisoformat(value.replace("Z", "+00:00"))
                except Exception:
                    return value
            fmt = arg or "%Y-%m-%d"
            if isinstance(value, (datetime, date)):
                return value.strftime(fmt)
            return str(value)
        elif name == "upper":
            return str(value).upper() if value else ""
        elif name == "lower":
            return str(value).lower() if value else ""
        elif name == "title":
            return str(value).title() if value else ""
        elif name == "number":
            if value is None:
                return "0"
            try:
                return f"{float(value):,.2f}"
            except (ValueError, TypeError):
                return str(value)
        elif name == "pluralize":
            if value is None:
                return ""
            try:
                n = int(value)
                return arg if n != 1 else (arg.rstrip("s") if arg else "")
            except (ValueError, TypeError):
                return str(value)

        return value

    @staticmethod
    def _to_string(value: Any) -> str:
        if value is None:
            return ""
        if isinstance(value, bool):
            return "Yes" if value else "No"
        if isinstance(value, (datetime, date)):
            return value.strftime("%Y-%m-%d")
        if isinstance(value, Decimal):
            return f"{value:,.2f}"
        return str(value)


class _SingletonHolder:
    _instance: TemplateEngine | None = None

    def get_instance(self) -> TemplateEngine:
        if self._instance is None:
            self._instance = TemplateEngine()
        return self._instance


_holder = _SingletonHolder()


def get_template_engine() -> TemplateEngine:
    return _holder.get_instance()
