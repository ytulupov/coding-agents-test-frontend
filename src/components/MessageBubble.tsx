'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MemoizedCodeBlock, extractCodeBlocks } from './CodeBlock';
import type { Message } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-blue-600 text-white">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          <p className="text-xs opacity-70 mt-1 text-right">{timestamp}</p>
        </div>
      </div>
    );
  }

  const parts = extractCodeBlocks(message.content);

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-[#2d2d2d] text-gray-900 dark:text-gray-100">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {parts.map((part, index) => {
            if (part.type === 'code') {
              return <MemoizedCodeBlock key={index} code={part.content} language={part.language || ''} />;
            }
            return <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>{part.content}</ReactMarkdown>;
          })}
        </div>
        <p className="text-xs opacity-70 mt-2">{timestamp}</p>
      </div>
    </div>
  );
}

export const MemoizedMessageBubble = memo(MessageBubble);