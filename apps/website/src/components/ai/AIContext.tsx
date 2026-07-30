'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  type AICapability, type AIMessage, type ProductAIConfig,
  createUserMessage, createAssistantMessage, generateMockResponse,
  getProductAIConfig, getCapabilityById,
} from '@/data/ai';

interface AIContextType {
  isOpen: boolean;
  openPanel: (capabilityId?: string) => void;
  closePanel: () => void;
  togglePanel: () => void;
  activeCapability: AICapability | null;
  activeProductConfig: ProductAIConfig | null;
  setActiveProduct: (productSlug: string) => void;
  setActiveCapability: (capabilityId: string) => void;
  messages: AIMessage[];
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  isGenerating: boolean;
}

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState<string>('erp');
  const [activeCapabilityId, setActiveCapabilityId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeProductConfig = getProductAIConfig(activeProductSlug) ?? null;
  const activeCapability = activeCapabilityId ? getCapabilityById(activeCapabilityId) ?? null : null;

  const openPanel = useCallback((capabilityId?: string) => {
    setIsOpen(true);
    if (capabilityId) {
      setActiveCapabilityId(capabilityId);
      const cap = getCapabilityById(capabilityId);
      if (cap) {
        const welcomeMsg = createAssistantMessage(
          `Hi! I'm Tesle AI. I can help you **${cap.name.toLowerCase()}**. ${cap.description}.\n\nWhat would you like me to generate?`,
          capabilityId,
        );
        setMessages([welcomeMsg]);
      }
    }
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const setActiveProduct = useCallback((productSlug: string) => {
    setActiveProductSlug(productSlug);
    setActiveCapabilityId(null);
    setMessages([]);
  }, []);

  const setActiveCapability = useCallback((capabilityId: string) => {
    setActiveCapabilityId(capabilityId);
    const cap = getCapabilityById(capabilityId);
    if (cap) {
      const welcomeMsg = createAssistantMessage(
        `Hi! I'm Tesle AI. I can help you **${cap.name.toLowerCase()}**. ${cap.description}.\n\nWhat would you like me to generate?`,
        capabilityId,
      );
      setMessages([welcomeMsg]);
    }
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim() || isGenerating) return;

    const userMsg = createUserMessage(content, activeCapabilityId ?? undefined);
    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    const timeoutId = setTimeout(() => {
      const responseContent = activeCapabilityId
        ? generateMockResponse(activeCapabilityId, content)
        : generateMockResponse('erp-report', content);
      const assistantMsg = createAssistantMessage(responseContent, activeCapabilityId ?? undefined);
      setMessages((prev) => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [activeCapabilityId, isGenerating]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setActiveCapabilityId(null);
  }, []);

  return (
    <AIContext.Provider
      value={{
        isOpen, openPanel, closePanel, togglePanel,
        activeCapability, activeProductConfig,
        setActiveProduct, setActiveCapability,
        messages, sendMessage, clearMessages, isGenerating,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAI must be used within AIProvider');
  return ctx;
}
