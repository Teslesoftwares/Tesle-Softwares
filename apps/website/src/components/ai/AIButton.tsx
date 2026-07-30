'use client';

import { Sparkles } from 'lucide-react';
import { useAI } from './AIContext';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import { getAICapabilities } from '@/data/ai';

export function AIButton() {
  const { openPanel, activeCapability } = useAI();
  const { activeApp } = useWorkspace();

  const capabilities = activeApp ? getAICapabilities(activeApp) : [];
  const suggestionCount = capabilities.length;

  return (
    <button
      onClick={() => openPanel()}
      className="relative p-2.5 rounded-xl text-muted hover:text-accent hover:bg-accent/10 transition-all group"
      aria-label="Open AI Assistant"
    >
      <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
      {suggestionCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-[8px] font-bold text-black flex items-center justify-center">
          {suggestionCount}
        </span>
      )}
    </button>
  );
}
