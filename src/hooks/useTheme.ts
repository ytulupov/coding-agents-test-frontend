'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'chat-theme';

export function useTheme(): [Theme, () => void] {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage and system preference on mount only
  useEffect(() => {
    if (isInitialized) return;

    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       
      setThemeState(prefersDark ? 'dark' : 'light');
    }
    setIsInitialized(true);
  }, [isInitialized]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, newTheme);
    }
  };

  return [theme, toggleTheme];
}