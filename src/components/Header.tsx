'use client';

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 flex items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
        </button>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          AI Chat
        </h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-zinc-700" />
          ) : (
            <Sun className="h-5 w-5 text-zinc-300" />
          )}
        </button>
      </div>
    </header>
  );
}