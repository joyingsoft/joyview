import { directoryOpen, WellKnownDirectory } from 'browser-fs-access';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { isMediaTypeImage } from '../utils/file-utils';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
}

export enum AppViewEnum {
  welcome = 'welcome',
  masonryVertical = 'masonryVertical',
}

type AppContextProps = {
  getFilesEvent?: () => void;
  updateThemeEvent?: (theme: AppThemeEnum) => void;
  sidebarOpenEvent?: (isOpen: boolean) => void;
};

type AppContextStates = {
  imageFiles: File[];
  theme: AppThemeEnum;
  view: AppViewEnum;
  isLoading: boolean;
  isSidebarOpen: boolean;
};

const appContextDefault: AppContextStates & AppContextProps = {
  imageFiles: [],
  theme: AppThemeEnum.light,
  view: AppViewEnum.welcome,
  isLoading: false,
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [theme, setTheme] = useState<AppThemeEnum>(appContextDefault.theme);
  const [view, setView] = useState<AppViewEnum>(appContextDefault.view);
  const [isLoading, setIsLoading] = useState<boolean>(
    appContextDefault.isLoading,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    appContextDefault.isSidebarOpen,
  );

  const getFilesHandle = async () => {
    setIsLoading(true);
    const options = {
      // Set to `true` to recursively open files in all subdirectories,
      // defaults to `false`.
      recursive: true,
      // Suggested directory in which the file picker opens.
      startIn: 'pictures' as WellKnownDirectory,
      id: 'projects',
      // determine whether a directory should be entered, return `true` to skip.
      // skipDirectory: (entry) => entry.name[0] === '.',
    };

    try {
      const fileHandles = await directoryOpen(options);
      setImageFiles(fileHandles.filter((f) => isMediaTypeImage(f.type)));
    } catch (error) {
      // e.g. : DOMException: The user aborted a request.
      console.log('err ', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setTheme(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? AppThemeEnum.dark
        : AppThemeEnum.light,
    );
  }, []);

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0 && view === AppViewEnum.welcome) {
      setView(AppViewEnum.masonryVertical);
    }
  }, [imageFiles]);

  useEffect(() => {
    document.body.setAttribute('app-theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        imageFiles,
        isLoading,
        isSidebarOpen,
        theme,
        view,
        getFilesEvent: getFilesHandle,
        updateThemeEvent: (newTheme) => setTheme(newTheme),
        sidebarOpenEvent: (isOpen) => setIsSidebarOpen(isOpen),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
