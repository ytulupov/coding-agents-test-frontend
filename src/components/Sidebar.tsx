'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { Conversation } from '../lib/types';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onCreateConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onCreateConversation,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
}: SidebarProps) {
  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-40 h-screen w-72 border-r border-zinc-200 bg-white transition-transform dark:border-zinc-800 dark:bg-zinc-900 md:relative md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:border-none'
      )}
    >
      <div className="flex h-full flex-col p-4 md:p-4">
        <button
          onClick={onCreateConversation}
          className="mb-4 flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-3 text-left transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Plus className="h-5 w-5" />
          <span>New Chat</span>
        </button>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
              <p>No conversations yet</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                const preview = lastMessage
                  ? lastMessage.content.slice(0, 40) + (lastMessage.content.length > 40 ? '...' : '')
                  : 'No messages';

                return (
                  <li
                    key={conversation.id}
                    className={clsx(
                      'group relative rounded-lg',
                      activeConversationId === conversation.id
                        ? 'bg-zinc-100 dark:bg-zinc-800'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    )}
                  >
                    <button
                      onClick={() => onSelectConversation(conversation.id)}
                      className="w-full px-3 py-2 text-left transition-colors focus:outline-none"
                    >
                      <div className="mb-1 truncate text-sm font-medium">
                        {conversation.title}
                      </div>
                      <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {preview}
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                      className={clsx(
                        'absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5',
                        'opacity-0 transition-opacity group-hover:opacity-100',
                        'text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-red-900/20'
                      )}
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            <p>AI Chat Interface</p>
          </div>
        </div>
      </div>
    </aside>
  );
}