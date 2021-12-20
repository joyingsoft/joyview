import { directoryOpen, WellKnownDirectory } from 'browser-fs-access';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { isMediaTypeImage } from '../utils/file-utils';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
}

type AppContextProps = {
  getFilesEvent?: () => void;
  updateThemeEvent?: (theme: AppThemeEnum) => void;
};

type AppContextStates = {
  imageFiles: File[];
  theme: AppThemeEnum;
};

export const AppContext = createContext<AppContextStates & AppContextProps>({
  imageFiles: [],
  theme: AppThemeEnum.light,
});

export const AppContextProvider: FC<
  AppContextProps & {
    children?: ReactNode;
  }
> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [appTheme, setAppTheme] = useState<AppThemeEnum>(AppThemeEnum.light);

  const getFilesHandle = async () => {
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

    const fileHandles = await directoryOpen(options);
    setImageFiles(fileHandles.filter((f) => isMediaTypeImage(f.type)));
  };

  const updateThemeHandle = (theme: AppThemeEnum) => {
    setAppTheme(theme);
  };

  useEffect(() => {
    updateThemeHandle(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? AppThemeEnum.dark
        : AppThemeEnum.light,
    );
  }, []);

  useEffect(() => {
    document.body.setAttribute('app-theme', appTheme);
  }, [appTheme]);

  return (
    <AppContext.Provider
      value={{
        imageFiles,
        theme: appTheme,
        getFilesEvent: getFilesHandle,
        updateThemeEvent: updateThemeHandle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
