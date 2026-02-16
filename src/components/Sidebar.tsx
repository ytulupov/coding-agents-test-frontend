'use client';

import { Plus, Trash2, X } from 'lucide-react';
import type { Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen,
  isMobile,
  onToggle,
}: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full sm:relative sm:z-0',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'transition-transform duration-300 ease-in-out',
          'w-64 flex flex-col',
          isMobile
            ? isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'translate-x-0',
          'transform'
        )}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}

        {/* New Chat Button */}
        <div className="p-4 pt-6 sm:pt-4">
          <button
            onClick={() => {
              onNewConversation();
              if (isMobile) onToggle();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100"
          >
            <Plus size={18} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1">
            {conversations.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No conversations yet
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    'group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors',
                    activeConversationId === conversation.id
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  )}
                  onClick={() => {
                    onSelectConversation(conversation.id);
                    if (isMobile) onToggle();
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {conversation.title}
                    </h3>
                    {conversation.preview && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {conversation.preview}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className={cn(
                      'opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all',
                      'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
                    )}
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            ChatGPT-like Interface
          </p>
        </div>
      </aside>
    </>
  );
}