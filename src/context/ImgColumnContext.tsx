import { createContext, type Dispatch } from 'react';

type AppImgColumnContextProps = {
  columns?: number;
  setColumns: Dispatch<React.SetStateAction<number | undefined>>;
};

export const ImgColumnContext = createContext<AppImgColumnContextProps>(
  {} as AppImgColumnContextProps,
);
