import logging
import sys
from typing import Any

import structlog


def setup_logging(log_level: str = "INFO", log_format: str = "json") -> None:
    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.stdlib.add_log_level,
            structlog.stdlib.add_logger_name,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.dev.set_exc_info,
            structlog.processors.format_exc_info,
            _add_source_info,
            _get_renderer(log_format),
        ],
        wrapper_class=structlog.stdlib.BoundLogger,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(_get_stdlib_formatter(log_format))

    root_logger = logging.getLogger()
    root_logger.handlers.clear()
    root_logger.addHandler(handler)
    root_logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))

    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.INFO)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)


def _add_source_info(
    logger: Any, method_name: str, event_dict: dict[str, Any]
) -> dict[str, Any]:
    return event_dict


def _get_renderer(log_format: str):
    if log_format == "json":
        return structlog.processors.JSONRenderer()
    return structlog.dev.ConsoleRenderer()


def _get_stdlib_formatter(log_format: str):
    if log_format == "json":
        return logging.Formatter(
            '{"time":"%(asctime)s","level":"%(levelname)s","logger":"%(name)s","message":"%(message)s"}'
        )
    return logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")


logger = structlog.get_logger()
