'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import clsx from 'clsx';
import type { Message } from '../lib/types';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatArea({ messages, isTyping }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      ref={scrollRef}
      className={clsx(
        'flex-1 overflow-y-auto px-4 py-4',
        'scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600'
      )}
    >
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-xl text-zinc-500 dark:text-zinc-400">
            How can I help you today?
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}