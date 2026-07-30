"""
Core AI Service — OpenAI + LangChain integration.

Central service that provides LLM capabilities to all agents.
Independent from business logic — only handles AI model interactions.
"""

from __future__ import annotations

import logging
from typing import Any

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI

from app.config import get_settings

logger = logging.getLogger(__name__)


class AIService:
    """Core AI service wrapping OpenAI via LangChain.

    Handles LLM initialization, prompt management, and conversation execution.
    Designed as a singleton — use `get_ai_service()` for the shared instance.
    """

    def __init__(self) -> None:
        settings = get_settings()
        self._model = settings.OPENAI_MODEL
        self._temperature = settings.AI_TEMPERATURE
        self._api_key = settings.OPENAI_API_KEY

    @property
    def _llm(self) -> ChatOpenAI:
        return ChatOpenAI(
            model=self._model,
            temperature=self._temperature,
            api_key=self._api_key,
        )

    async def chat(
        self,
        messages: list[dict[str, str]],
        system_prompt: str | None = None,
        temperature: float | None = None,
        max_tokens: int | None = None,
    ) -> dict[str, Any]:
        """Run a chat completion against the LLM.

        Args:
            messages: Conversation history as [{"role": "user", "content": "..."}]
            system_prompt: Optional system-level instruction.
            temperature: Override default temperature for this request.
            max_tokens: Optional response length cap.

        Returns:
            {"content": str, "usage": dict, "model": str}
        """
        llm = self._llm
        if temperature is not None:
            llm = llm.model_copy(update={"temperature": temperature})

        lc_messages: list[BaseMessage] = []
        if system_prompt:
            lc_messages.append(SystemMessage(content=system_prompt))

        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            if role == "system":
                lc_messages.append(SystemMessage(content=content))
            elif role == "assistant":
                lc_messages.append(AIMessage(content=content))
            else:
                lc_messages.append(HumanMessage(content=content))

        response = await llm.ainvoke(lc_messages, max_tokens=max_tokens)

        return {
            "content": response.content,
            "model": self._model,
            "usage": {
                "prompt_tokens": getattr(
                    response, "response_metadata", {}
                ).get("token_usage", {})
                .get("prompt_tokens", 0),
                "completion_tokens": getattr(
                    response, "response_metadata", {}
                )
                .get("token_usage", {})
                .get("completion_tokens", 0),
            },
        }

    async def complete(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float | None = None,
    ) -> str:
        """Single-turn completion — returns just the text content."""
        result = await self.chat(
            messages=[{"role": "user", "content": prompt}],
            system_prompt=system_prompt,
            temperature=temperature,
        )
        return result["content"]

    async def structured_output(
        self,
        messages: list[dict[str, str]],
        output_schema: dict,
        system_prompt: str | None = None,
    ) -> dict[str, Any]:
        """Request structured JSON output from the LLM.

        Injects output format instructions into the system prompt
        and parses the response as JSON.
        """
        format_instruction = (
            f"\n\nYou MUST respond with valid JSON matching this schema:\n"
            f"{output_schema}\nDo not include any text outside the JSON."
        )
        enhanced_system = (system_prompt or "") + format_instruction

        result = await self.chat(
            messages=messages,
            system_prompt=enhanced_system,
        )

        import json

        try:
            return json.loads(result["content"])
        except json.JSONDecodeError:
            # Attempt to extract JSON from markdown code blocks
            text = result["content"]
            if "```" in text:
                start = text.index("```") + 3
                # Skip language tag if present
                if text[start] == "\n":
                    start += 1
                end = text.rindex("```")
                text = text[start:end].strip()
                return json.loads(text)
            raise


class _SingletonHolder:
    _instance: AIService | None = None

    def get_instance(self) -> AIService:
        if self._instance is None:
            self._instance = AIService()
        return self._instance


_holder = _SingletonHolder()


def get_ai_service() -> AIService:
    """Get or create the shared AIService instance."""
    return _holder.get_instance()
