import { type SyntheticEvent, createContext } from 'react';
import type { AppLoadedImgProps } from '../types/app-loaded-img-props';

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

export const appImgContextDefault: AppImgContextProps & AppImgContextStates = {
  imageFiles: [],
  isLoading: false,
  loadedImgs: new Map(),
  isAllImgsLoaded: false,
  hasAllRatios: false,
};

export const AppImgContext = createContext(appImgContextDefault);
