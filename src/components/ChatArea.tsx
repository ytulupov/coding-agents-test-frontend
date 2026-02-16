"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/lib/types";

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatArea({ messages, isTyping }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950"
    >
      {isEmpty ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-xl text-zinc-500 dark:text-zinc-400">
            How can I help you today?
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <MessageBubble key={message.id || index} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}