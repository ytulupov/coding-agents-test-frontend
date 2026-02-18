'use client';

import { useState, useCallback } from 'react';
import { Conversation, Message, MessageRole } from '../lib/types';
import { generateMockResponse } from '../lib/mockResponses';
import { v4 as uuidv4 } from 'uuid';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const createConversation = useCallback((): string => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
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

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      let conversation = conversations.find((c) => c.id === activeConversationId);

      if (!conversation) {
        const newId = createConversation();
        conversation = conversations.find((c) => c.id === newId)!;
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user' as MessageRole,
        content,
        timestamp: Date.now(),
      };

      const updatedConversation: Conversation = {
        ...conversation,
        messages: [...conversation.messages, userMessage],
        title: conversation.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : conversation.title,
        updatedAt: Date.now(),
      };

      setConversations((prev) =>
        prev.map((c) => (c.id === updatedConversation.id ? updatedConversation : c))
      );

      setIsTyping(true);

      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

      const assistantContent = generateMockResponse();
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant' as MessageRole,
        content: assistantContent,
        timestamp: Date.now(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversation.id
            ? {
                ...c,
                messages: [...c.messages, assistantMessage],
                updatedAt: Date.now(),
              }
            : c
        )
      );

      setIsTyping(false);
    },
    [conversations, activeConversationId, createConversation]
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createConversation,
    deleteConversation,
    selectConversation,
    sendMessage,
  };
}