import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
}

export enum AppViewEnum {
  welcome = 'welcome',
  masonryVertical = 'masonryVertical',
}

type AppContextProps = {
  viewEvent?: (view: AppViewEnum) => void;
  themeEvent?: (theme: AppThemeEnum) => void;
  sidebarOpenEvent?: (isOpen: boolean) => void;
};

type AppContextStates = {
  theme: AppThemeEnum;
  view: AppViewEnum;
  isSidebarOpen: boolean;
};

const appContextDefault: AppContextStates & AppContextProps = {
  theme: AppThemeEnum.light,
  view: AppViewEnum.welcome,
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
  const [theme, setTheme] = useState<AppThemeEnum>(appContextDefault.theme);
  const [view, setView] = useState<AppViewEnum>(appContextDefault.view);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    appContextDefault.isSidebarOpen,
  );

  useEffect(() => {
    setTheme(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? AppThemeEnum.dark
        : AppThemeEnum.light,
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
