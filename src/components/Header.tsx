"use client";

import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  onMenuToggle: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Menu button on mobile */}
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-zinc-700 dark:text-zinc-300" />
          </button>
        )}

        {/* Title */}
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          ChatGPT Clone
        </h1>

        {/* Right side - Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon size={20} className="text-zinc-700 dark:text-zinc-300" />
          ) : (
            <Sun size={20} className="text-zinc-700 dark:text-zinc-300" />
          )}
        </button>
      </div>
    </header>
  );
}