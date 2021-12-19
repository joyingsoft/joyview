import { directoryOpen, WellKnownDirectory } from 'browser-fs-access';
import { createContext, FC, ReactNode, useState } from 'react';
import { isMediaTypeImage } from '../utils/file-utils';

type AppContextProps = {
  getFilesEvent?: () => void;
};

type AppContextStates = {
  imageFiles: File[];
};

export const AppContext = createContext<AppContextStates & AppContextProps>({
  imageFiles: [],
});

export const AppContextProvider: FC<
  AppContextProps & {
    children?: ReactNode;
  }
> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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

  return (
    <AppContext.Provider value={{ imageFiles, getFilesEvent: getFilesHandle }}>
      {children}
    </AppContext.Provider>
  );
};
