'use client';

import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import clsx from 'clsx';

interface InputAreaProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function InputArea({ onSend, disabled }: InputAreaProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 144);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className={clsx(
              'w-full max-h-36 min-h-[48px] rounded-2xl px-4 py-3',
              'resize-none',
              'bg-zinc-100 text-zinc-900 placeholder-zinc-500',
              'dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400',
              'focus:outline-none focus:ring-2 focus:ring-blue-600',
              'disabled:opacity-50'
            )}
            disabled={disabled}
            rows={1}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className={clsx(
            'mb-1 h-12 w-12 flex items-center justify-center rounded-full',
            'transition-colors',
            input.trim() && !disabled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-zinc-300 text-zinc-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-500'
          )}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}