'use client';

import { Sun, Moon, Menu } from 'lucide-react';
import type { Theme } from '../lib/types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
}

export function Header({ theme, onThemeToggle, onMenuToggle }: HeaderProps): React.ReactElement {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          type="button"
          className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hidden md:block">
          ChatGPT Clone
        </h1>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 md:hidden">
          Chat
        </h1>

        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          type="button"
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-zinc-700" />
          ) : (
            <Sun className="w-5 h-5 text-zinc-300" />
          )}
        </button>
      </div>
    </header>
  );
}