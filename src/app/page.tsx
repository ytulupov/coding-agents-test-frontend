'use client';

import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useConversations } from '../hooks/useConversations';
import { useTheme } from '../hooks/useTheme';
import { ChatArea } from '../components/ChatArea';
import { InputArea } from '../components/InputArea';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { simulateAiResponse } from '../lib/mockResponses';
import { v4 as uuidv4 } from 'uuid';

export default function Home(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  const {
    conversations,
    activeConversationId,
    activeConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    addMessage,
  } = useConversations();

  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, [conversations.length, createConversation]);

  const handleSendMessage = useCallback(async (content: string): Promise<void> => {
    if (!activeConversationId) {
      createConversation();
      return;
    }

    // Add user message
    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content,
      timestamp: Date.now(),
    };
    addMessage(activeConversationId, userMessage);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response
    const response = await simulateAiResponse(content);

    // Add assistant message
    const assistantMessage = {
      id: uuidv4(),
      role: 'assistant' as const,
      content: response,
      timestamp: Date.now(),
    };
    addMessage(activeConversationId, assistantMessage);

    setIsTyping(false);
  }, [activeConversationId, createConversation, addMessage]);

  const handleNewChat = useCallback((): void => {
    createConversation();
  }, [createConversation]);

  const handleSelectConversation = useCallback((id: string): void => {
    selectConversation(id);
  }, [selectConversation]);

  const handleDeleteConversation = useCallback((id: string): void => {
    deleteConversation(id);
  }, [deleteConversation]);

  const handleToggleSidebar = useCallback((): void => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback((): void => {
    setIsSidebarOpen(false);
  }, []);

  const messages = activeConversation?.messages ?? [];

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeConversationId}
        onNewChat={handleNewChat}
        onSelect={handleSelectConversation}
        onDelete={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          theme={theme}
          onThemeToggle={toggleTheme}
          onMenuToggle={handleToggleSidebar}
        />

        {/* Chat area */}
        <ChatArea messages={messages} isTyping={isTyping} theme={theme} />

        {/* Input area */}
        <InputArea onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
