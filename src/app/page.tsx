'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { InputArea } from '@/components/InputArea';
import { useConversations } from '@/hooks/useConversations';
import { createMockAssistantMessage, getMockResponseDelay } from '@/lib/mockResponses';
import { useThemeContext } from '@/components/ThemeProvider';

export default function Home() {
  useThemeContext();
  const {
    conversations,
    activeConversation,
    activeConversationId,
    createNewConversation,
    selectConversation,
    deleteConversation,
    addMessage
  } = useConversations();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !activeConversationId) {
        createNewConversation();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeConversationId, createNewConversation]);

  useEffect(() => {
    if (!activeConversationId && !isMobile) {
      createNewConversation();
    }
  }, [activeConversationId, isMobile, createNewConversation]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSendMessage = (content: string) => {
    let conversationId = activeConversationId;

    if (!conversationId) {
      conversationId = createNewConversation();
    }

    addMessage(conversationId, 'user', content);
    setIsThinking(true);

    const delay = getMockResponseDelay();

    setTimeout(() => {
      const aiMessage = createMockAssistantMessage();
      addMessage(conversationId, 'assistant', aiMessage.content);
      setIsThinking(false);
    }, delay);

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleCloseSidebarOnMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Header
        onToggleSidebar={handleToggleSidebar}
        showMenuButton={isMobile}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={(id) => {
            selectConversation(id);
            if (isMobile) setIsSidebarOpen(false);
          }}
          onDeleteConversation={deleteConversation}
          onNewChat={() => {
            createNewConversation();
            if (isMobile) setIsSidebarOpen(false);
          }}
          isOpen={isMobile ? isSidebarOpen : true}
          isMobile={isMobile}
        />

        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={handleCloseSidebarOnMobile}
            aria-hidden="true"
          />
        )}

        <main
          className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-zinc-900 transition-colors"
        >
          <ChatArea
            messages={activeConversation?.messages ?? []}
            isThinking={isThinking}
            isEmpty={!activeConversation || activeConversation.messages.length === 0}
          />
          <InputArea onSend={handleSendMessage} disabled={isThinking} />
        </main>
      </div>
    </div>
  );
}