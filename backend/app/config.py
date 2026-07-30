from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    model_config = {"env_file": ".env", "env_file_encoding": "utf-8", "extra": "ignore"}

    PORT: int = 3000
    NODE_ENV: str = "development"

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/tesle_admin"
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30
    DB_ECHO: bool = False

    JWT_SECRET: str = "tesle-admin-jwt-secret-change-in-production"
    JWT_EXPIRES_IN: str = "15m"
    JWT_REFRESH_EXPIRES_IN: str = "7d"
    JWT_REFRESH_SECRET: str = "tesle-refresh-secret-change-in-production"

    CORS_ORIGIN: str = "http://localhost:5173,http://localhost:5174,http://localhost:5175"

    BCRYPT_ROUNDS: int = 12

    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"
    AI_TEMPERATURE: float = 0.7

    DOCUMENT_STORAGE_PATH: str = "./storage/documents"

    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_ENABLED: bool = False

    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"

    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list[str] = ["*"]
    CORS_ALLOW_HEADERS: list[str] = ["*"]

    RATE_LIMIT_PER_MINUTE: int = 60
    MAX_REQUEST_SIZE: int = 52428800

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGIN.split(",")]

    @property
    def is_production(self) -> bool:
        return self.NODE_ENV == "production"

    @property
    def is_development(self) -> bool:
        return self.NODE_ENV == "development"


@lru_cache
def get_settings() -> Settings:
    return Settings()
