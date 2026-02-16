'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import type { Message, Theme } from '../lib/types';

interface MessageBubbleProps {
  message: Message;
  theme: Theme;
}

export const MessageBubble = React.memo(function MessageBubble({
  message,
  theme,
}: MessageBubbleProps): React.ReactElement {
  const isUser = message.role === 'user';

  const components: Components = {
    code(props: unknown): React.ReactNode {
      const { inline, className, children } = props as {
        inline?: boolean;
        className?: string;
        children: React.ReactNode;
      };
      const match = /language-(\w+)/.exec(className ?? '');
      const language = match ? match[1] : undefined;

      return !inline && language ? (
        <CodeBlock
          code={String(children).replace(/\n$/, '')}
          language={language}
          theme={theme}
        />
      ) : (
        <code className="bg-zinc-300 dark:bg-zinc-600 px-1.5 py-0.5 rounded text-sm">
          {children as React.ReactNode}
        </code>
      );
    },
    p(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <p className="my-2 last:mb-0">{children}</p>;
    },
    ul(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>;
    },
    ol(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>;
    },
    h1(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>;
    },
    h2(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>;
    },
    h3(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <h3 className="text-base font-bold mt-3 mb-2">{children}</h3>;
    },
    strong(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <strong className="font-semibold">{children}</strong>;
    },
    blockquote(props: unknown): React.ReactNode {
      const { children } = props as { children?: React.ReactNode };
      return <blockquote className="border-l-4 border-zinc-400 pl-3 italic my-2">{children}</blockquote>;
    },
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
});