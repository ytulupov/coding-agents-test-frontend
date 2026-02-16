"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Message, Conversation } from "@/lib/types";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const generateTitle = useCallback((message: string): string => {
    const trimmed = message.trim();
    if (trimmed.length <= 30) return trimmed;
    return trimmed.substring(0, 30) + "...";
  }, []);

  const createConversation = useCallback((firstMessage: Message): Conversation => {
    const now = Date.now();
    return {
      id: uuidv4(),
      title: firstMessage.role === "user" ? generateTitle(firstMessage.content) : "New Chat",
      messages: [firstMessage],
      createdAt: now,
      updatedAt: now,
    };
  }, [generateTitle]);

  const addMessage = useCallback((role: "user" | "assistant", content: string) => {
    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now(),
    };

    setConversations((prev) => {
      if (!activeConversationId) {
        const newConversation = createConversation(message);
        setActiveConversationId(newConversation.id);
        return [newConversation];
      }

      return prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            updatedAt: Date.now(),
          };
        }
        return conv;
      });
    });

    return message;
  }, [activeConversationId, createConversation]);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((conv) => conv.id !== id);
      if (activeConversationId === id) {
        setActiveConversationId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [activeConversationId]);

  const startNewChat = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  const getCurrentConversationId = useCallback((): string => {
    return activeConversationId ?? "";
  }, [activeConversationId]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    setIsTyping,
    addMessage,
    selectConversation,
    deleteConversation,
    startNewChat,
    getCurrentConversationId,
  };
}