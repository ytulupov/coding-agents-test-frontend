'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MemoizedChatArea } from '@/components/ChatArea';
import InputArea from '@/components/InputArea';
import { useConversations } from '@/hooks/useConversations';
import { getMockResponse } from '@/lib/mockResponses';

export default function Home() {
  const {
    conversations,
    activeConversationId,
    getActiveConversation,
    createConversation,
    addMessage,
    deleteConversation,
    selectConversation,
  } = useConversations();

  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebarToggle = () => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) {
      const newConversation = createConversation(content);
      addMessage(newConversation.id, 'user', content);
      await fetchAiResponse(newConversation.id);
    } else {
      addMessage(activeConversationId, 'user', content);
      await fetchAiResponse(activeConversationId);
    }
  };

  const fetchAiResponse = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const response = await getMockResponse();
      addMessage(conversationId, 'assistant', response);
    } catch {
      addMessage(conversationId, 'assistant', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    createConversation();
  };

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
  };

  const activeConversation = getActiveConversation();
  const messages = activeConversation?.messages || [];

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          showSidebarToggle={showSidebarToggle()}
        />
        <MemoizedChatArea messages={messages} isLoading={isLoading} />
        <InputArea onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}