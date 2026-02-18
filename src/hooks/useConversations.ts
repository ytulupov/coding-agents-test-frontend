'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Conversation, Message, MessageRole } from '@/lib/types';

const CONVERSATIONS_KEY = 'chat-conversations';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize conversations from localStorage on mount only
  useEffect(() => {
    if (isInitialized) return;

    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Conversation[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConversations(parsed);
        if (parsed.length > 0) {
           
          setActiveConversationId(parsed[0].id);
        }
      } catch {
        // Invalid JSON, start empty
      }
    }
    setIsInitialized(true);
  }, [isInitialized]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  const getActiveConversation = (): Conversation | null => {
    return conversations.find(conv => conv.id === activeConversationId) || null;
  };

  const createConversation = (initialTitle?: string): Conversation => {
    const now = Date.now();
    const newConversation: Conversation = {
      id: uuidv4(),
      title: initialTitle || 'New Chat',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation;
  };

  const addMessage = (conversationId: string, role: MessageRole, content: string) => {
    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id !== conversationId) {
        return conv;
      }

      const updatedMessages = [...conv.messages, message];
      let updatedTitle = conv.title;

      if (conv.messages.length === 0 && role === 'user') {
        updatedTitle = content.slice(0, 30) + (content.length > 30 ? '...' : '');
      }

      return {
        ...conv,
        messages: updatedMessages,
        title: updatedTitle,
        updatedAt: Date.now(),
      };
    }));
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== conversationId);
      if (activeConversationId === conversationId) {
        setActiveConversationId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const selectConversation = (conversationId: string | null) => {
    if (conversationId === null) {
      createConversation();
    } else {
      setActiveConversationId(conversationId);
    }
  };

  return {
    conversations,
    activeConversationId,
    getActiveConversation,
    createConversation,
    addMessage,
    deleteConversation,
    selectConversation,
  };
}