'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import ChatArea from '../components/ChatArea';
import InputArea from '../components/InputArea';
import Sidebar from '../components/Sidebar';
import { useConversations } from '../hooks/useConversations';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,
    createConversation,
    deleteConversation,
    selectConversation,
    sendMessage,
  } = useConversations();

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onCreateConversation={createConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />

        <ChatArea messages={activeConversation?.messages ?? []} isTyping={isTyping} />

        <InputArea onSend={sendMessage} disabled={isTyping} />
      </div>

      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50"
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
}
