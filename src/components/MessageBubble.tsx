'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

interface CodeNodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface MessageBubbleProps {
  message: Message;
}

const CodeBlockComponent = ({ inline, className, children }: CodeNodeProps) => {
  if (inline) {
    return <code className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">{children}</code>;
  }

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'typescript';

  return (
    <CodeBlock code={String(children)} language={language} />
  );
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-blue-600 text-white rounded-tr-md'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-md'
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlockComponent,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 ml-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 ml-4">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-medium mb-2">{children}</h3>,
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}