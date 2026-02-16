'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { Message, Theme } from '../lib/types';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
  theme: Theme;
}

export function ChatArea({ messages, isTyping, theme }: ChatAreaProps): React.ReactElement {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto py-4 px-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            How can I help you today?
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <MessageBubble message={message} theme={theme} />
            </div>
          ))}
          {isTyping && (
            <div className="mb-4">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}