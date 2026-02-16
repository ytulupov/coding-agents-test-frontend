'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { Conversation } from '../lib/types';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelect,
  onDelete,
  isOpen,
  onClose,
}: SidebarProps): React.ReactElement {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* New Chat Button */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
            type="button"
            className="w-full flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm text-center py-8">
              No conversations yet
            </p>
          ) : (
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <div
                    className={`group relative rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                      activeId === conversation.id
                        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                    onClick={() => {
                      onSelect(conversation.id);
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                  >
                    <p className="font-medium text-sm truncate mb-1">{conversation.title}</p>
                    {conversation.lastMessagePreview && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {conversation.lastMessagePreview}
                      </p>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(conversation.id);
                      }}
                      type="button"
                      className="absolute top-2 right-2 p-1 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}