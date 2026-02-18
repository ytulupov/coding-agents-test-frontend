'use client';

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Conversation, Message, MessageRole } from '@/lib/types';

const generateTitle = (messages: Message[]): string => {
  const userMessage = messages.find((m) => m.role === 'user');
  if (!userMessage) return 'New Chat';
  const content = userMessage.content.trim();
  return content.length > 30 ? content.slice(0, 30) + '...' : content;
};

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  const addMessage = useCallback((conversationId: string, role: MessageRole, content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now()
    };

    setConversations((prev) => prev.map((conv) => {
      if (conv.id !== conversationId) return conv;
      const updatedMessages = [...conv.messages, newMessage];
      return {
        ...conv,
        messages: updatedMessages,
        title: updatedMessages.length === 1 && role === 'user' ? generateTitle(updatedMessages) : conv.title,
        updatedAt: Date.now()
      };
    }));

    return newMessage.id;
  }, []);

  const getConversationPreview = useCallback((conversation: Conversation): string => {
    if (conversation.messages.length === 0) return 'No messages yet';
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const preview = lastMessage.content.trim();
    return preview.length > 40 ? preview.slice(0, 40) + '...' : preview;
  }, []);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    createNewConversation,
    selectConversation,
    deleteConversation,
    addMessage,
    getConversationPreview
  };
};