'use client';

import React from 'react';
import clsx from 'clsx';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-3">
      <span
        className={clsx(
          'h-2 w-2 animate-bounce rounded-full',
          'bg-zinc-400 dark:bg-zinc-600'
        )}
        style={{ animationDelay: '0ms' }}
      />
      <span
        className={clsx(
          'h-2 w-2 animate-bounce rounded-full',
          'bg-zinc-400 dark:bg-zinc-600'
        )}
        style={{ animationDelay: '150ms' }}
      />
      <span
        className={clsx(
          'h-2 w-2 animate-bounce rounded-full',
          'bg-zinc-400 dark:bg-zinc-600'
        )}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}