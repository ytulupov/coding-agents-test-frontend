"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function InputArea({ onSendMessage, disabled }: InputAreaProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_rows = 6;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      let newHeight = textareaRef.current.scrollHeight;
      const maxHeight = MAX_rows * 24;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
      }
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSendMessage(message.trim());
        setMessage("");
      }
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className={cn(
              "flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900",
              "text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500",
              "resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors"
            )}
            style={{
              height: "auto",
              maxHeight: `${MAX_rows * 24}px`,
              overflowY: message.split("\n").length > MAX_rows ? "auto" : "hidden",
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
              "transition-all duration-200",
              message.trim() && !disabled
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}