'use client';

import { useState } from 'react';
import { useConversations } from '@/hooks/useConversations';
import { generateMockResponse, getDelayTime } from '@/lib/mockResponses';
import { ChatArea } from '@/components/ChatArea';
import { InputArea } from '@/components/InputArea';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export default function Home() {
  const [ isTyping, setIsTyping ] = useState(false);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const {
    conversations,
    activeConversationId,
    createConversation,
    deleteConversation,
    selectConversation,
    addMessage,
    getActiveConversation,
  } = useConversations();

  const activeConversation = getActiveConversation();

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');

    // Show typing indicator
    setIsTyping(true);

    // Simulate delay
    const delay = getDelayTime();

    // Wait for delay and then add assistant response
    setTimeout(() => {
      const response = generateMockResponse(content);
      addMessage(response, 'assistant');
      setIsTyping(false);
    }, delay);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-50">
      <Header
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        isMobile={isMobile}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={selectConversation}
          onNewConversation={createConversation}
          onDeleteConversation={deleteConversation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatArea messages={activeConversation?.messages || []} isTyping={isTyping} />
          <InputArea onSendMessage={handleSendMessage} disabled={isTyping} />
        </main>
      </div>
    </div>
  );
}