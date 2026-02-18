'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '@/lib/types';

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
  isEmpty?: boolean;
}

export const ChatArea = ({ messages, isThinking, isEmpty }: ChatAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Chat Assistant
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            How can I help you today?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      <div className="flex flex-col">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isThinking && <TypingIndicator />}
      </div>
    </div>
  );
};