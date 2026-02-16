'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved ?? (prefersDark ? 'dark' : 'light');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Schedule the state update for the next event loop tick
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className={`transition-colors duration-300 ${mounted ? '' : 'opacity-0'}`}>
      {children}
    </div>
  );
}