import { createContext, type Dispatch, type SetStateAction } from 'react';

type ImgSpaceContextType = {
  imageSpace: number;
  setImageSpace: Dispatch<SetStateAction<number>>;
};

/**
 * Context for image space (padding) in pixels.
 * Default value is 8 pixels.
 */
export const ImgSpaceContext = createContext<ImgSpaceContextType>(
  {} as ImgSpaceContextType,
);
