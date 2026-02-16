'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Conversation, Message } from '../lib/types';

interface UseConversationsReturn {
  conversations: Conversation[];
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
}

const STORAGE_KEY = 'chat-conversations';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateTitle(firstMessage: string): string {
  const maxLength = 30;
  const trimmed = firstMessage.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength) + '...';
}

function truncatePreview(content: string, maxLength: number = 50): string {
  const trimmed = content.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength) + '...';
}

// Initialize conversations from localStorage
function getInitialConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Initialize active conversation id
function getInitialActiveId(conversations: Conversation[]): string | null {
  return conversations.length > 0 ? conversations[0].id : null;
}

export function useConversations(): UseConversationsReturn {
  const initial = getInitialConversations();
  const [conversations, setConversations] = useState<Conversation[]>(initial);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    getInitialActiveId(initial)
  );

  // Save to localStorage whenever conversations change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      // Ignore storage errors
    }
  }, [conversations]);

  const createConversation = useCallback((): void => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      lastMessagePreview: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  }, []);

  const selectConversation = useCallback((id: string): void => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string): void => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(() => {
        const remaining = conversations.filter((c) => c.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  }, [activeConversationId, conversations]);

  const addMessage = useCallback((conversationId: string, message: Message): void => {
    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id !== conversationId) return conv;

        const isFirstUserMessage = conv.messages.length === 0 && message.role === 'user';
        const newTitle = isFirstUserMessage ? generateTitle(message.content) : conv.title;
        const newPreview = truncatePreview(message.content);

        return {
          ...conv,
          title: newTitle,
          messages: [...conv.messages, message],
          lastMessagePreview: newPreview,
          updatedAt: Date.now(),
        };
      });
    });
  }, []);

  const activeConversation = activeConversationId
    ? conversations.find((c) => c.id === activeConversationId) ?? null
    : null;

  return {
    conversations,
    activeConversationId,
    activeConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    addMessage,
  };
}