'use client';

import { ThemeProvider as ThemeProviderComponent } from '../hooks/useTheme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProviderComponent>{children}</ThemeProviderComponent>;
}