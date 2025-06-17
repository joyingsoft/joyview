import {
  createContext,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import type { AppThemeType, AppViewType } from './types';

type AppContextProps = {
  viewEvent?: (view: AppViewType) => void;
  themeEvent?: (theme: AppThemeType) => void;
  sidebarOpenEvent?: (isOpen: boolean) => void;
};

type AppContextStates = {
  theme: AppThemeType;
  view: AppViewType;
  isSidebarOpen: boolean;
};

const appContextDefault: AppContextStates & AppContextProps = {
  theme: 'light',
  view: 'welcome',
  isSidebarOpen: false,
};

export const AppContext = createContext<AppContextStates & AppContextProps>(
  appContextDefault,
);

export const AppContextProvider: FC<
  AppContextProps & {
    children?: ReactNode;
  }
> = ({ children }) => {
  const [theme, setTheme] = useState<AppThemeType>(appContextDefault.theme);
  const [view, setView] = useState<AppViewType>(appContextDefault.view);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    appContextDefault.isSidebarOpen,
  );

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
        viewEvent: (newView) => setView(newView),
        themeEvent: (newTheme) => setTheme(newTheme),
        sidebarOpenEvent: (isOpen) => setIsSidebarOpen(isOpen),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
