"""
Analytics Agent — Tesle AI.

Processes, analyzes, and visualizes data using AI.
Independent module — only depends on AIService, not on business data models.
"""

from __future__ import annotations

import json
import logging
from enum import Enum
from typing import Any

from app.services.ai.ai_service import AIService, get_ai_service

logger = logging.getLogger(__name__)


class AnalysisType(str, Enum):
    SUMMARY = "summary"
    TRENDS = "trends"
    COMPARISON = "comparison"
    PREDICTION = "prediction"
    ANOMALY = "anomaly"
    RECOMMENDATION = "recommendation"
    CUSTOM = "custom"


ANALYSIS_PROMPTS: dict[AnalysisType, str] = {
    AnalysisType.SUMMARY: (
        "You are a data analysis expert for Tesle Platform. "
        "Analyze the provided data and return a clear summary with key metrics, "
        "totals, averages, and notable observations. Use structured JSON."
    ),
    AnalysisType.TRENDS: (
        "You are a trend analysis expert for Tesle Platform. "
        "Identify patterns, trends, and directional changes in the data. "
        "Include percentage changes, growth rates, and seasonal patterns where applicable."
    ),
    AnalysisType.COMPARISON: (
        "You are a comparative analysis expert for Tesle Platform. "
        "Compare the provided datasets, highlighting differences, similarities, "
        "and which performs better on key metrics."
    ),
    AnalysisType.PREDICTION: (
        "You are a predictive analytics expert for Tesle Platform. "
        "Based on the provided historical data, generate predictions and forecasts. "
        "Include confidence levels and reasoning. Note these are AI estimates, not guarantees."
    ),
    AnalysisType.ANOMALY: (
        "You are an anomaly detection expert for Tesle Platform. "
        "Scan the data for outliers, unusual patterns, or values that deviate significantly "
        "from the norm. Flag suspicious entries with explanations."
    ),
    AnalysisType.RECOMMENDATION: (
        "You are a business recommendation engine for Tesle Platform. "
        "Based on the data analysis, provide actionable recommendations "
        "with priority levels, expected impact, and implementation suggestions."
    ),
    AnalysisType.CUSTOM: (
        "You are a data analysis expert for Tesle Platform. "
        "Analyze the data according to the user's specific instructions."
    ),
}


class AnalyticsAgent:
    """Processes and analyzes data using the AI service.

    Usage:
        agent = AnalyticsAgent()
        result = await agent.analyze(
            data=[...],
            analysis_type=AnalysisType.SUMMARY,
        )
    """

    def __init__(self, ai: AIService | None = None) -> None:
        self._ai = ai or get_ai_service()

    async def analyze(
        self,
        data: Any,
        analysis_type: AnalysisType = AnalysisType.SUMMARY,
        instructions: str | None = None,
        schema: dict | None = None,
    ) -> dict[str, Any]:
        """Analyze data using the specified analysis type.

        Args:
            data: The data to analyze (list, dict, or JSON string).
            analysis_type: Type of analysis to perform.
            instructions: Optional additional instructions for the analysis.
            schema: Optional expected output schema for structured responses.

        Returns:
            {"analysis_type": str, "result": dict, "summary": str}
        """
        system_prompt = ANALYSIS_PROMPTS.get(analysis_type, ANALYSIS_PROMPTS[AnalysisType.CUSTOM])
        data_str = self._serialize_data(data)

        prompt = f"Data to analyze:\n```json\n{data_str}\n```"
        if instructions:
            prompt += f"\n\nAdditional instructions: {instructions}"

        if schema:
            result = await self._ai.structured_output(
                messages=[{"role": "user", "content": prompt}],
                output_schema=schema,
                system_prompt=system_prompt,
            )
        else:
            result = await self._ai.structured_output(
                messages=[{"role": "user", "content": prompt}],
                output_schema={
                    "summary": "string — brief overview of findings",
                    "metrics": "object — key metrics and numbers",
                    "insights": "array of strings — detailed observations",
                    "recommendations": "array of strings — actionable next steps",
                    "confidence": "string — low/medium/high",
                },
                system_prompt=system_prompt,
            )

        summary = result.get("summary", "Analysis complete.")

        return {
            "analysis_type": analysis_type.value,
            "result": result,
            "summary": summary,
        }

    async def compare(
        self,
        data_a: Any,
        data_b: Any,
        labels: tuple[str, str] = ("Dataset A", "Dataset B"),
        metrics: list[str] | None = None,
    ) -> dict[str, Any]:
        """Compare two datasets side-by-side."""
        prompt = (
            f"Compare {labels[0]} and {labels[1]}.\n\n"
            f"{labels[0]}:\n```json\n{self._serialize_data(data_a)}\n```\n\n"
            f"{labels[1]}:\n```json\n{self._serialize_data(data_b)}\n```\n\n"
        )
        if metrics:
            prompt += f"Focus on these metrics: {', '.join(metrics)}"

        result = await self._ai.structured_output(
            messages=[{"role": "user", "content": prompt}],
            output_schema={
                "winner": "string — which dataset performs better overall",
                "comparison": "object — metric-by-metric comparison",
                "differences": "array of strings — key differences",
                "recommendations": "array of strings",
            },
            system_prompt=ANALYSIS_PROMPTS[AnalysisType.COMPARISON],
        )

        return {
            "analysis_type": "comparison",
            "result": result,
            "summary": result.get("winner", "Analysis complete."),
        }

    async def generate_insights(
        self,
        data: Any,
        focus: str | None = None,
    ) -> dict[str, Any]:
        """Generate high-level insights from data.

        Simplified method for quick insights without specifying analysis type.
        """
        prompt = "Generate insights from this data"
        if focus:
            prompt += f", focusing on: {focus}"
        prompt += f":\n\n```json\n{self._serialize_data(data)}\n```"

        result = await self._ai.structured_output(
            messages=[{"role": "user", "content": prompt}],
            output_schema={
                "insights": "array of strings — key findings",
                "score": "number — data quality/relevance score from 0-100",
                "next_steps": "array of strings — suggested follow-up analyses",
            },
            system_prompt=(
                "You are a data insights engine for Tesle Platform. "
                "Extract the most valuable insights from the data."
            ),
        )

        return {
            "analysis_type": "insights",
            "result": result,
            "summary": "\n".join(result.get("insights", [])),
        }

    @staticmethod
    def _serialize_data(data: Any) -> str:
        """Serialize data to JSON string for prompt injection."""
        if isinstance(data, str):
            try:
                json.loads(data)
                return data
            except json.JSONDecodeError:
                return json.dumps({"value": data})
        return json.dumps(data, default=str, indent=2)
