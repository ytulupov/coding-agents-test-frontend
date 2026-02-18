'use client';

import { useEffect, useRef, memo } from 'react';
import { TypingIndicator } from './TypingIndicator';
import { MemoizedMessageBubble } from './MessageBubble';
import type { Message } from '@/lib/types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

function ChatArea({ messages, isLoading }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">How can I help you today?</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4"
    >
      <div className="max-w-3xl mx-auto space-y-2">
        {messages.map((message) => (
          <MemoizedMessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export const MemoizedChatArea = memo(ChatArea);