import React, { PropsWithChildren, useState } from 'react';
import { Theme } from '../types/Theme';
import { ThemeContextValue } from '../types/ThemeContextValue';

/**
 * NOTE: Don't use this context directly, instead use hooks/useThemeContext.
 */

const THEME_STORAGE_KEY = 'theme';

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: {} as Theme,
  setTheme: () => {},
});

const defaultTheme: Theme = {
  fonts: [
    {
      id: crypto.randomUUID(),
      name: 'base',
      weight: 400,
      family: 'sans-serif',
      size: 16,
      lineHeight: 1.5,
    },
  ],
  colors: [
    { id: crypto.randomUUID(), name: 'white', hex: '#ffffff' },
    { id: crypto.randomUUID(), name: 'neutral-50', hex: '#fafafa' },
    { id: crypto.randomUUID(), name: 'neutral-100', hex: '#f5f5f5' },
    { id: crypto.randomUUID(), name: 'neutral-200', hex: '#e5e5e5' },
    { id: crypto.randomUUID(), name: 'neutral-300', hex: '#d4d4d4' },
    { id: crypto.randomUUID(), name: 'neutral-400', hex: '#a3a3a3' },
    { id: crypto.randomUUID(), name: 'neutral-500', hex: '#737373' },
    { id: crypto.randomUUID(), name: 'neutral-600', hex: '#525252' },
    { id: crypto.randomUUID(), name: 'neutral-700', hex: '#404040' },
    { id: crypto.randomUUID(), name: 'neutral-800', hex: '#262626' },
    { id: crypto.randomUUID(), name: 'neutral-900', hex: '#171717' },
  ],
  layout: {
    bodyBg: 'grey100',
    mailBg: 'white',
    mailWidth: 644,
  },
};

const getInitialTheme = () => {
  const fromStorage = localStorage.getItem(THEME_STORAGE_KEY);
  if (fromStorage) return JSON.parse(fromStorage);
  return defaultTheme;
};

export const ThemeContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [theme, setTheme] = useState(getInitialTheme());

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }} {...props} />;
};
