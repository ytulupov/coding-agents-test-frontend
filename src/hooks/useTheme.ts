'use client';

import { useState, useEffect } from 'react';
import type { Theme } from '../lib/types';

// Initialize theme from localStorage or system preference
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return saved ?? (prefersDark ? 'dark' : 'light');
}

export function useTheme(): {
  theme: Theme;
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sync DOM with theme on mount and theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (): void => {
    const new_theme: Theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', new_theme);

    if (new_theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setTheme(new_theme);
  };

  return { theme, toggleTheme };
}