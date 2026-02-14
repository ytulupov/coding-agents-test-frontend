import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Conversation, Message, MessageRole } from '@/lib/types';

const CONVERSATIONS_STORAGE_KEY = 'ai-chat-conversations';

function createEmptyConversation(): Conversation {
  const id = uuidv4();
  const now = new Date();
  return {
    id,
    title: 'New Chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function useConversations() {
  const [ conversations, setConversations ] = useState<Conversation[]>([]);
  const [ activeConversationId, setActiveConversationId ] = useState<string | null>(null);
  const [ isLoaded, setIsLoaded ] = useState(false);

  // Load conversations from localStorage on mount
  useLayoutEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Conversation[];
        const conversationsWithDates = parsed.map((conv) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setConversations(conversationsWithDates);
        if (conversationsWithDates.length > 0) {
          setActiveConversationId(conversationsWithDates[0].id);
        }
      } else {
        // Create initial empty conversation
        const newConv = createEmptyConversation();
        setConversations([newConv]);
        setActiveConversationId(newConv.id);
      }
    } catch {
      // If there's an error loading, create a fresh empty conversation
      const newConv = createEmptyConversation();
      setConversations([newConv]);
      setActiveConversationId(newConv.id);
    }
    setIsLoaded(true);
  }, []);

  // Save conversations to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations, isLoaded]);

  const createConversation = useCallback(() => {
    const newConv = createEmptyConversation();
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    return newConv;
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((conv) => conv.id !== id);
      if (filtered.length === 0) {
        const newConv = createEmptyConversation();
        setActiveConversationId(newConv.id);
        return [newConv];
      }
      if (activeConversationId === id) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeConversationId]);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const addMessage = useCallback((content: string, role: MessageRole) => {
    const messageId = uuidv4();
    const now = new Date();
    const newMessage: Message = {
      id: messageId,
      role,
      content,
      timestamp: now,
    };

    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id !== activeConversationId) {
          return conv;
        }

        const updatedMessages = [...conv.messages, newMessage];
        // Generate title from first user message if this is the first message
        let title = conv.title;
        if (conv.messages.length === 0 && role === 'user') {
          title = content.slice(0, 30) + (content.length > 30 ? '...' : '');
        }

        return {
          ...conv,
          title,
          messages: updatedMessages,
          updatedAt: now,
        };
      });
    });

    return newMessage;
  }, [activeConversationId]);

  const getActiveConversation = useCallback((): Conversation | null => {
    return conversations.find((conv) => conv.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  return {
    conversations,
    activeConversationId,
    createConversation,
    deleteConversation,
    selectConversation,
    addMessage,
    getActiveConversation,
  };
}