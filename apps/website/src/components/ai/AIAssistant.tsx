'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Brain, Loader2, ChevronRight } from 'lucide-react';
import { useAI } from './AIContext';
import { useWorkspace } from '@/components/workspace/WorkspaceContext';
import { getAICapabilities } from '@/data/ai';

export function AIAssistant() {
  const {
    isOpen, closePanel, activeCapability, activeProductConfig,
    setActiveProduct, setActiveCapability,
    messages, sendMessage, clearMessages, isGenerating,
  } = useAI();
  const { activeApp } = useWorkspace();
  const [input, setInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(activeApp || 'erp');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeApp && activeApp !== selectedProduct) {
      setSelectedProduct(activeApp);
      setActiveProduct(activeApp);
    }
  }, [activeApp]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const capabilities = getAICapabilities(selectedProduct);

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePanel}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-glass shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Tesle AI Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-glass shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 border border-glass flex items-center justify-center">
                  <Brain className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text">Tesle AI</h2>
                  <p className="text-[10px] text-muted">Powered by Tesle Intelligence</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearMessages}
                  className="p-2 rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors text-xs"
                >
                  New Chat
                </button>
                <button
                  onClick={closePanel}
                  className="p-2 rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors"
                  aria-label="Close AI assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Context */}
            <div className="px-5 py-3 border-b border-glass bg-glass shrink-0">
              <div className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Active App</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-accent/10 border border-glass flex items-center justify-center">
                  {activeProductConfig ? (
                    <Brain className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                  )}
                </div>
                <span className="text-sm font-medium text-text">
                  {activeProductConfig?.productName || 'General Assistant'}
                </span>
              </div>
            </div>

            {/* Capabilities (suggestions) */}
            {capabilities.length > 0 && messages.length === 0 && (
              <div className="px-5 py-3 border-b border-glass shrink-0">
                <div className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-3">What can I help you with?</div>
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    return (
                      <button
                        key={cap.id}
                        onClick={() => setActiveCapability(cap.id)}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl card hover:card-hover hover:border-accent/20 transition-all text-left group"
                      >
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cap.color}/20 border border-glass flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-text group-hover:text-accent transition-colors">{cap.name}</div>
                          <div className="text-[10px] text-muted mt-0.5 line-clamp-2">{cap.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && !capabilities.length && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Brain className="w-12 h-12 text-accent/30 mb-4" />
                  <p className="text-sm text-muted max-w-xs">
                    Select a product app to start using Tesle AI, or type your question below.
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-accent/20 text-white border border-accent/10'
                          : 'bg-glass text-muted border border-glass'
                      }`}
                    >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[10px] font-semibold text-accent">Tesle AI</span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content.split('\n').map((line, i) => {
                        if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold text-text mt-3 mb-1.5">{line.replace('## ', '')}</h3>;
                        if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-text mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
                        if (line.startsWith('- ')) return <li key={i} className="text-muted ml-4 list-disc text-sm">{line.replace('- ', '')}</li>;
                        if (line.startsWith('|') && line.endsWith('|')) return <p key={i} className="text-xs text-muted font-mono">{line}</p>;
                        if (line.match(/^\d\.\s/)) return <li key={i} className="text-muted ml-4 list-decimal text-sm">{line.replace(/^\d\.\s/, '')}</li>;
                        if (line.startsWith('---')) return <hr key={i} className="my-2 border-glass" />;
                        if (line.trim() === '') return <br key={i} />;
                        return <p key={i} className="text-muted text-sm">{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-glass border border-glass">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                      <span className="text-sm text-muted">Generating response...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-glass p-4 shrink-0">
              <div className="flex items-center gap-2 bg-glass border border-glass rounded-xl px-4 py-2.5 focus-within:border-accent/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeCapability ? `Describe what to ${activeCapability.name.toLowerCase()}...` : 'Ask Tesle AI anything...'}
                  className="flex-1 bg-transparent text-sm text-text placeholder:text-muted focus:outline-none"
                  disabled={isGenerating}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className="p-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-muted mt-2 text-center">
                Tesle AI may generate inaccurate responses. Verify important information.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
