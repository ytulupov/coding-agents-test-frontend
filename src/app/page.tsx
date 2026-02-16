'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useConversations } from '@/hooks/useConversations';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { InputArea } from '@/components/InputArea';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const {
    conversations,
    activeConversationId,
    isLoading,
    createNewConversation,
    deleteConversation,
    setActiveConversation,
    sendMessage,
    getActiveConversation,
  } = useConversations();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeConversation = getActiveConversation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversation}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Chat Area */}
        <ChatArea
          messages={activeConversation?.messages ?? []}
          isLoading={isLoading}
        />

        {/* Input Area */}
        <InputArea
          onSend={sendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}