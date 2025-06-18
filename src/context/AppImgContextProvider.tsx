import {
  directoryOpen,
  type FileWithDirectoryAndFileHandle,
} from 'browser-fs-access';
import { type SyntheticEvent, useState, type ReactNode } from 'react';
import type { AppLoadedImgProps } from '../types/app-loaded-img-props';
import { isMediaTypeImage } from '../utils/file-utils';
import { getImgAspectRatio } from '../utils/img-utils';
import { AppImgContext, appImgContextDefault } from './AppImgContext';

export const AppImgContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
