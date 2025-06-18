import {
  directoryOpen,
  type FileWithDirectoryAndFileHandle,
} from 'browser-fs-access';
import {
  type SyntheticEvent,
  createContext,
  type FC,
  useState,
  type ReactNode,
} from 'react';
import type { AppLoadedImgProps } from '../types/app-loaded-img-props';
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
    isLoaded: boolean,
    event?: SyntheticEvent<HTMLImageElement, Event>,
  ) => void;

  /**
   * !!! remove all catched data in app-img-provider.
   */
  purgeEvent?: () => void;
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
  isAllImgsLoaded: boolean;
  hasAllRatios: boolean;
};

const appImgContextDefault: AppImgContextProps & AppImgContextStates = {
  imageFiles: [],
  isLoading: false,
  loadedImgs: new Map(),
  isAllImgsLoaded: false,
  hasAllRatios: false,
};

export const AppImgContext = createContext(appImgContextDefault);

export const AppImgContextProvider: FC<
  AppImgContextProps & {
    children: ReactNode;
  }
> = ({ children }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(
    appImgContextDefault.isLoading,
  );
  const [isAllImgsLoaded, setIsAllImgsLoaded] = useState<boolean>(
    appImgContextDefault.isAllImgsLoaded,
  );
  const [hasAllRatios, setHasAllRatios] = useState<boolean>(
    appImgContextDefault.hasAllRatios,
  );
  const [loadedImgs, setLoadedImgs] = useState<Map<string, AppLoadedImgProps>>(
    appImgContextDefault.loadedImgs,
  );

  const isFileHandle = (
    handle: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle,
  ): handle is FileWithDirectoryAndFileHandle => {
    return 'type' in handle;
  };

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
      setImageFiles(
        fileHandles
          .filter(isFileHandle)
          .filter((f: FileWithDirectoryAndFileHandle) =>
            isMediaTypeImage(f.type),
          ),
      );
    } catch (error) {
      // e.g. : DOMException: The user aborted a request.
      // todo log error.
      console.log('err ', error);
    }
    setIsLoading(false);
  };

  const checkIsAllImgsLoaded = () => {
    for (const v of loadedImgs.values()) {
      if (!v.isLoaded) {
        return false;
      }
    }

    return loadedImgs.size === imageFiles.length ? true : false;
  };

  const checkHasAllRatios = () => {
    for (const v of loadedImgs.values()) {
      if (!v.aspectRatio) {
        return false;
      }
    }

    return loadedImgs.size === imageFiles.length ? true : false;
  };

  const loadedImgHandle = (
    key: string,
    data?: string,
    isLoaded?: boolean,
    event?: SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    let img = loadedImgs.get(key);
    if (img) {
      if (isLoaded !== undefined) {
        img.isLoaded = isLoaded;
      }

      if (data !== undefined) {
        img.srcDataURL = data;
      }

      // no need to reset ratio again, if defined already
      if (!img.aspectRatio && event?.currentTarget) {
        img.aspectRatio = getImgAspectRatio(event.currentTarget);
      }
    } else {
      img = {
        srcDataURL: data,
        isLoaded: isLoaded === undefined ? false : isLoaded,
        aspectRatio: event?.currentTarget
          ? getImgAspectRatio(event.currentTarget)
          : undefined,
      };
    }

    setLoadedImgs((prev) => prev.set(key, img));

    if (img.isLoaded && checkIsAllImgsLoaded() && !isAllImgsLoaded) {
      setIsAllImgsLoaded(true);
    } else if (!img.isLoaded && isAllImgsLoaded) {
      setIsAllImgsLoaded(false);
    }

    if (img.aspectRatio && checkHasAllRatios() && !hasAllRatios) {
      setHasAllRatios(true);
    } else if (!img.aspectRatio && hasAllRatios) {
      setHasAllRatios(false);
    }
  };

  const purge = () => {
    setImageFiles(appImgContextDefault.imageFiles);
    setHasAllRatios(appImgContextDefault.hasAllRatios);
    setIsAllImgsLoaded(appImgContextDefault.isAllImgsLoaded);
    setIsLoading(appImgContextDefault.isLoading);
    setLoadedImgs(appImgContextDefault.loadedImgs);
  };

  return (
    <AppImgContext.Provider
      value={{
        imageFiles,
        isLoading,
        loadedImgs,
        isAllImgsLoaded,
        hasAllRatios,
        purgeEvent: purge,
        getFilesEvent: getFilesHandle,
        imgDataEvent: (k, v) => loadedImgHandle(k, v),
        imgLoadedEvent: (k, v, e) => loadedImgHandle(k, undefined, v, e),
      }}
    >
      {children}
    </AppImgContext.Provider>
  );
};
