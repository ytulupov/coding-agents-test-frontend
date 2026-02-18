'use client';

import { Sun, Moon, Menu } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

interface HeaderProps {
  onToggleSidebar: () => void;
  showMenuButton: boolean;
}

export const Header = ({ onToggleSidebar, showMenuButton }: HeaderProps) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="h-14 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-zinc-700 dark:text-zinc-300" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Chat Assistant
          </h1>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-zinc-700 dark:text-zinc-300" />
        ) : (
          <Moon size={20} className="text-zinc-700 dark:text-zinc-300" />
        )}
      </button>
    </header>
  );
};