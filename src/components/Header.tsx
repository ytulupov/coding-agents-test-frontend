'use client';

import { Menu, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onToggleSidebar: () => void;
}

export function Header({ theme, toggleTheme, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-14 sm:h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4 sm:px-6 transition-colors sticky top-0 z-30">
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-400" />
      </button>

      {/* App Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">AI</span>
        </div>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          ChatUI
        </h1>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={cn(
          'p-2 rounded-md transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'text-gray-600 dark:text-gray-400'
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </button>
    </header>
  );
}