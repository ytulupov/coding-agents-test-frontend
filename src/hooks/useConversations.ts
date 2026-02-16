'use client';

import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useState } from 'react';
import type { Conversation, Message } from '@/lib/types';
import { generateConversationTitle, generateMockResponse, getRandomDelay } from '@/lib/mockResponses';

const CONVERSATIONS_STORAGE_KEY = 'chat-ui-conversations';
const ACTIVE_CONVERSATION_STORAGE_KEY = 'chat-ui-active-conversation';

/**
 * Hook for managing conversations state
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse conversations:', e);
      return [];
    }
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACTIVE_CONVERSATION_STORAGE_KEY);
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0 || localStorage.getItem(CONVERSATIONS_STORAGE_KEY)) {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Save active conversation to localStorage
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem(ACTIVE_CONVERSATION_STORAGE_KEY, activeConversationId);
    } else {
      localStorage.removeItem(ACTIVE_CONVERSATION_STORAGE_KEY);
    }
  }, [activeConversationId]);

  const createNewConversation = useCallback((): string => {
    const id = uuidv4();
    const newConversation: Conversation = {
      id,
      title: 'New Conversation',
      messages: [],
      preview: '',
      createdAt: Date.now(),
    };
    setConversations((prev) => {
      const updated = [newConversation, ...prev];
      return updated;
    });
    setActiveConversationId(id);
    return id;
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConversationId === id) {
        setActiveConversationId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [activeConversationId]);

  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    let conversationId = activeConversationId;

    // Create new conversation if none active
    if (!conversationId) {
      conversationId = createNewConversation();
    }

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id !== conversationId) return conv;

        const isFirstMessage = conv.messages.length === 0;
        const updatedMessages = [...conv.messages, userMessage];
        const title = isFirstMessage
          ? generateConversationTitle(content)
          : conv.title;

        return {
          ...conv,
          title,
          messages: updatedMessages,
          preview: content.substring(0, 50),
        };
      });
    });

    // Simulate AI response delay
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

    // Add assistant message
    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: generateMockResponse(),
      timestamp: Date.now(),
    };

    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id !== conversationId) return conv;

        return {
          ...conv,
          messages: [...conv.messages, assistantMessage],
        };
      });
    });

    setIsLoading(false);
  }, [activeConversationId, createNewConversation]);

  const getActiveConversation = useCallback((): Conversation | undefined => {
    if (!activeConversationId) return undefined;
    return conversations.find((c) => c.id === activeConversationId);
  }, [activeConversationId, conversations]);

  return {
    conversations,
    activeConversationId,
    isLoading,
    createNewConversation,
    deleteConversation,
    setActiveConversation,
    sendMessage,
    getActiveConversation,
  };
}