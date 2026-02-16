"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isOpen,
  onClose,
}: SidebarProps) {
  const formatLastMessage = (message: string): string => {
    const trimmed = message.trim();
    if (trimmed.length <= 50) return trimmed;
    return trimmed.substring(0, 50) + "...";
  };

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
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out md:relative md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-72"
        )}
      >
        {/* New Chat Button */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
              No conversations yet
            </p>
          ) : (
            <ul className="space-y-2">
              {conversations.map((conversation) => {
                const lastMessage =
                  conversation.messages[conversation.messages.length - 1];
                const isActive = conversation.id === activeId;

                return (
                  <li key={conversation.id}>
                    <div
                      className={cn(
                        "group p-3 rounded-lg cursor-pointer transition-colors relative",
                        isActive
                          ? "bg-zinc-100 dark:bg-zinc-800"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                      onClick={() => {
                        onSelectChat(conversation.id);
                        onClose();
                      }}
                    >
                      <h3
                        className={cn(
                          "text-sm font-medium truncate mb-1",
                          isActive
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {conversation.title}
                      </h3>
                      {lastMessage && (
                        <p
                          className={cn(
                            "text-xs truncate",
                            isActive
                              ? "text-zinc-500 dark:text-zinc-400"
                              : "text-zinc-500 dark:text-zinc-500"
                          )}
                        >
                          {formatLastMessage(lastMessage.content)}
                        </p>
                      )}

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(conversation.id);
                        }}
                        className={cn(
                          "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all",
                          "opacity-0 group-hover:opacity-100",
                          "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                          "text-zinc-400 hover:text-red-500 dark:text-zinc-500"
                        )}
                        aria-label="Delete conversation"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
            {conversations.length}{" "}
            {conversations.length === 1 ? "conversation" : "conversations"}
          </p>
        </div>
      </aside>
    </>
  );
}