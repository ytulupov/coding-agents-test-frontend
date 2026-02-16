"use client";

import { useState } from "react";
import { ChatArea } from "@/components/ChatArea";
import { InputArea } from "@/components/InputArea";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useConversations } from "@/hooks/useConversations";
import { getMockResponse } from "@/lib/mockResponses";

export default function Home() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    setIsTyping,
    addMessage,
    selectConversation,
    deleteConversation,
    startNewChat,
  } = useConversations();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (message: string) => {
    addMessage("user", message);
    setIsTyping(true);

    try {
      const response = await getMockResponse(message);
      addMessage("assistant", response);
    } catch (error) {
      console.error("Error getting mock response:", error);
      addMessage(
        "assistant",
        "Sorry, I encountered an error. Please try again."
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    startNewChat();
  };

  const handleSelectChat = (id: string) => {
    selectConversation(id);
  };

  const handleDeleteChat = (id: string) => {
    deleteConversation(id);
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const messages = activeConversation?.messages ?? [];

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-zinc-950">
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} showMenuButton />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          conversations={conversations}
          activeId={activeConversationId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatArea messages={messages} isTyping={isTyping} />
          <InputArea
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
}