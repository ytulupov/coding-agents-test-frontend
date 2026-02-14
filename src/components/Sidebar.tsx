'use client';

import type { Conversation } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { cn, truncateText, formatTime } from '@/lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  isOpen = true,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:relative z-50 h-full w-64 flex flex-col',
          'bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* New Chat button */}
        <div className="p-4">
          <button
            type="button"
            onClick={onNewConversation}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
              No conversations yet
            </div>
          ) : (
            <ul className="space-y-1">
              {conversations.map((conversation) => {
                const isActive = conversation.id === activeConversationId;
                const lastMessage = conversation.messages.at(-1);
                const preview = lastMessage ? truncateText(lastMessage.content, 50) : 'No messages';

                return (
                  <li key={conversation.id}>
                    <button
                      type="button"
                      onClick={() => onSelectConversation(conversation.id)}
                      className={cn(
                        'w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-colors group',
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={cn(
                              'text-sm font-medium truncate',
                              isActive
                                ? 'text-blue-700 dark:text-blue-300'
                                : 'text-gray-900 dark:text-gray-100'
                            )}
                          >
                            {conversation.title}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {preview}
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                          {formatTime(conversation.updatedAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-all"
                        aria-label="Delete conversation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}