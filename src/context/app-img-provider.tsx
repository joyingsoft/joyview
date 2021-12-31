import { directoryOpen, WellKnownDirectory } from 'browser-fs-access';
import { BaseSyntheticEvent, createContext, FC, useState } from 'react';
import { isMediaTypeImage } from '../utils/file-utils';
import { getImgAspectRatio } from '../utils/img-utils';

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
  imgDataEvent?: (key: string, imgDataURL: string) => void;

  imgLoadedEvent?: (
    key: string,
    loaded: boolean,
    event?: BaseSyntheticEvent<any, any, HTMLImageElement>,
  ) => void;
};

type AppLoadedImgProps = {
  srcDataURL?: string;
  aspectRatio?: number;
  loaded: boolean;
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
  loadedImgs: Map<string, AppLoadedImgProps>;
};

const appImgContextDefault: AppImgContextProps & AppImgContextStates = {
  imageFiles: [],
  isLoading: false,
  loadedImgs: new Map(),
};

export const AppImgContext = createContext(appImgContextDefault);

export const AppImgContextProvider: FC<AppImgContextProps> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(
    appImgContextDefault.isLoading,
  );
  const [loadedImgs, setLoadedImgs] = useState<Map<string, AppLoadedImgProps>>(
    appImgContextDefault.loadedImgs,
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
      // todo log error.
      console.log('err ', error);
    }
    setIsLoading(false);
  };

  const loadedImgHandle = (
    key: string,
    data?: string,
    loaded?: boolean,
    event?: BaseSyntheticEvent<any, any, HTMLImageElement>,
  ) => {
    let img = loadedImgs.get(key);

    if (img) {
      if (loaded !== undefined) {
        img.loaded = loaded;
      }

      if (data !== undefined) {
        img.srcDataURL = data;
      }

      // no need to reset ratio again, if defined already
      if (!img.aspectRatio && event?.target) {
        img.aspectRatio = getImgAspectRatio(event.target);
      }
    } else {
      img = {
        srcDataURL: data,
        loaded: loaded === undefined ? false : loaded,
        aspectRatio: event?.target
          ? getImgAspectRatio(event.target)
          : undefined,
      };
    }

    setLoadedImgs(loadedImgs.set(key, img));
  };

  return (
    <AppImgContext.Provider
      value={{
        imageFiles,
        isLoading,
        loadedImgs,
        getFilesEvent: getFilesHandle,
        imgDataEvent: (k, v) => loadedImgHandle(k, v),
        imgLoadedEvent: (k, v, e) => loadedImgHandle(k, undefined, v, e),
      }}
    >
      {children}
    </AppImgContext.Provider>
  );
};
