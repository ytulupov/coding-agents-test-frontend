'use client';

import { useThemeContext } from './ThemeProvider';
import { Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isMobile?: boolean;
}

export function Header({ onToggleSidebar, isMobile = false }: HeaderProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {isMobile && onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Chat</h1>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun size={20} className="text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </header>
  );
}