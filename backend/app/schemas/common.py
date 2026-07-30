"""Shared response schemas."""

from typing import Any, Generic, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class SuccessResponse(BaseModel):
    success: bool = True
    data: Any


class ListResponse(BaseModel):
    success: bool = True
    data: list


class ErrorResponse(BaseModel):
    success: bool = False
    error: str


class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int


class PaginatedResponse(BaseModel):
    success: bool = True
    data: list
    meta: PaginationMeta


class MessageData(BaseModel):
    message: str


class DeletedResponse(BaseModel):
    deleted: bool = True
