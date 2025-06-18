import { type ReactNode, useEffect, useState } from 'react';
import type { AppThemeType, AppViewType } from './types';
import { AppContext } from './AppContext';

export const AppContextProvider = ({ children }: { children?: ReactNode }) => {
  const [theme, setTheme] = useState<AppThemeType>('light');
  const [view, setView] = useState<AppViewType>('welcome');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setTheme(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    );
  }, []);

  useEffect(() => {
    document.body.setAttribute('app-theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        theme,
        view,
        setTheme,
        setView,
        setIsSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
