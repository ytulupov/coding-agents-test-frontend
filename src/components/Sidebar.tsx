'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Conversation } from '@/lib/types';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  isMobile: boolean;
}

export const Sidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  isOpen,
  isMobile
}: SidebarProps) => {
  const getConversationPreview = (conversation: Conversation): string => {
    if (conversation.messages.length === 0) return 'No messages yet';
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const preview = lastMessage.content.trim();
    return preview.length > 40 ? preview.slice(0, 40) + '...' : preview;
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`
        ${isMobile ? 'absolute inset-0 z-50' : 'w-64 flex-shrink-0'}
        h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
      `}
      aria-label="Conversation history"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Create new chat"
          >
            <Plus size={20} />
            <span>New Chat</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2" aria-label="Conversations">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 dark:text-zinc-500 text-sm">
              No conversations yet
            </div>
          ) : (
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`
                      w-full text-left p-3 rounded-lg relative group transition-all
                      ${
                        activeConversationId === conversation.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent'
                      }
                    `}
                    aria-label={`Conversation: ${conversation.title}`}
                    aria-current={activeConversationId === conversation.id ? 'page' : undefined}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                          {conversation.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 truncate">
                          {getConversationPreview(conversation)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-opacity p-1 focus:opacity-100 focus:outline-none"
                        aria-label={`Delete ${conversation.title}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {isMobile && (
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-500">
            Swipe or click outside to close
          </div>
        )}
      </div>
    </aside>
  );
};