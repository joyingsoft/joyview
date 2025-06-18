import { createContext, type Dispatch } from 'react';
import type { AppThemeType, AppViewType } from './types';

type AppContextProps = {
  theme: AppThemeType;
  view: AppViewType;
  isSidebarOpen: boolean;
  setTheme: Dispatch<React.SetStateAction<AppThemeType>>;
  setView: Dispatch<React.SetStateAction<AppViewType>>;
  setIsSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextProps>({
  theme: 'light',
  view: 'welcome',
  isSidebarOpen: false,
} as AppContextProps);
