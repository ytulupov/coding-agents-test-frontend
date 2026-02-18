'use client';

import type { Conversation } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-gray-100 dark:bg-[#202123] border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:transform-none flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              onNewConversation();
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2b32] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3a3b42] transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center py-4">No conversations yet</p>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group relative rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  activeConversationId === conversation.id
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  onSelectConversation(conversation.id);
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {conversation.title}
                  </span>
                  {conversation.messages.length > 0 && (
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-opacity"
                  aria-label="Delete conversation"
                >
                  <Trash2 size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}