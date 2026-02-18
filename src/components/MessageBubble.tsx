'use client';

import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { Message } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
}

const PreComponent = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const child = Array.isArray(children) ? children[0] : children;
  if (child?.type === 'code' && child?.props?.className) {
    const language = child.props.className.replace('language-', '') || 'text';
    const codeContent = child.props.children;
    return <CodeBlock language={language} code={codeContent} />;
  }
  return <pre {...props}>{children}</pre>;
};

export const MessageBubble = memo(({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-2">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm bg-blue-500 text-white">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start px-4 py-2">
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: PreComponent as unknown as React.ElementType,
            p: ({ children }) => (
              <p className="text-sm leading-relaxed mb-2 last:mb-0">
                {children}
              </p>
            ),
            h1: ({ children }) => (
              <h1 className="text-lg font-bold mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-bold mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-bold mb-2">{children}</h3>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-sm">{children}</li>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-sm font-mono">
                {children}
              </code>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic mb-2">
                {children}
              </blockquote>
            )
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';