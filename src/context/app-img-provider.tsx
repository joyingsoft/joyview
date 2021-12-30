import { directoryOpen, WellKnownDirectory } from 'browser-fs-access';
import { createContext, FC, useState } from 'react';
import { isMediaTypeImage } from '../utils/file-utils';

type AppImgContextProps = {
  /**
   * 1. Let user select files.
   * 2. filter images from select files.
   * 3. update imageFiles state.
   */
  getFilesEvent?: () => void;
  /**
   * default add one img each call.
   */
  addLoadedImg?: () => void;
};

type AppImgContextStates = {
  imageFiles: File[];
  /**
   * Is loading files.
   */
  isLoading: boolean;

  /**
   * number of loaded (img.onLoad event) images.
   */
  loaded: number;
};

const appImgContextDefault: AppImgContextProps & AppImgContextStates = {
  imageFiles: [],
  isLoading: false,
  loaded: 0,
};

export const AppImgContext = createContext(appImgContextDefault);

export const AppImgContextProvider: FC<AppImgContextProps> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(
    appImgContextDefault.isLoading,
  );
  const [loaded, setLoaded] = useState<number>(appImgContextDefault.loaded);

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
      // todo log error.
      console.log('err ', error);
    }
    setIsLoading(false);
  };

  return (
    <AppImgContext.Provider
      value={{
        imageFiles,
        isLoading,
        loaded,
        getFilesEvent: getFilesHandle,
        addLoadedImg: () => setLoaded(loaded + 1),
      }}
    >
      {children}
    </AppImgContext.Provider>
  );
};
