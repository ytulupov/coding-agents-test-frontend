'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-3 sm:px-4 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto py-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                How can I help you today?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Start a conversation by typing a message below
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
      </div>
    </div>
  );
}