"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubbleComponent = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3",
        isUser && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
          isUser
            ? "bg-blue-500 text-white"
            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
        )}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "flex-1 px-4 py-3 max-w-[calc(100%-2rem)]",
          isUser
            ? "bg-blue-500 text-white rounded-2xl rounded-tr-sm"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:mb-2 prose-headings:mt-3 prose-p:mb-2 prose-ul:mb-2 prose-ol:mb-2 prose-li:mb-1 prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { className, children, ...otherProps } = props as {
                    className?: string;
                    children: React.ReactNode;
                    [key: string]: unknown;
                  };

                  const isInline = !className || !className.startsWith("language-");

                  if (isInline) {
                    return (
                      <code className={className} {...otherProps}>
                        {children}
                      </code>
                    );
                  }

                  // Extract language from className (e.g., "language-typescript")
                  const language = className?.replace(/language-/, "") || "text";

                  return (
                    <CodeBlock
                      language={language}
                      className={String(children) === className ? "" : className}
                    >
                      {String(children).replace(/\n$/, "")}
                    </CodeBlock>
                  );
                },
                a({ ...props }) {
                  return (
                    <a
                      {...props}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    />
                  );
                },
                strong({ children, ...props }) {
                  return <strong {...props}>{children}</strong>;
                },
                em({ children, ...props }) {
                  return <em {...props}>{children}</em>;
                },
                h1({ children, ...props }) {
                  return <h1 {...props}>{children}</h1>;
                },
                h2({ children, ...props }) {
                  return <h2 {...props}>{children}</h2>;
                },
                h3({ children, ...props }) {
                  return <h3 {...props}>{children}</h3>;
                },
                p({ children, ...props }) {
                  return <p {...props}>{children}</p>;
                },
                ul({ children, ...props }) {
                  return <ul {...props}>{children}</ul>;
                },
                ol({ children, ...props }) {
                  return <ol {...props}>{children}</ol>;
                },
                li({ children, ...props }) {
                  return <li {...props}>{children}</li>;
                },
                blockquote({ children, ...props }) {
                  return (
                    <blockquote {...props} className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}
        <time
          className={cn(
            "text-xs mt-1 block",
            isUser ? "text-blue-100" : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {timeString}
        </time>
      </div>
    </div>
  );
};

export const MessageBubble = memo(MessageBubbleComponent);