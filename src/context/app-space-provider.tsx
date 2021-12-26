import { createContext, FC, useState } from 'react';

type AppSpaceContextProps = {
  changeImagePaddingEvent?: (padding: number) => void;
};

type AppSpaceContextStates = {
  imagePaddingPx: number;
};

const appSpaceContextDefault: AppSpaceContextProps & AppSpaceContextStates = {
  imagePaddingPx: 8,
};

export const AppSpaceContext = createContext(appSpaceContextDefault);

export const AppSpaceContextProvider: FC<AppSpaceContextProps> = ({
  children,
}) => {
  const [imagePaddingPx, setImagePaddingPx] = useState<number>(
    appSpaceContextDefault.imagePaddingPx,
  );
  return (
    <AppSpaceContext.Provider
      value={{
        imagePaddingPx,
        changeImagePaddingEvent: (padding) => setImagePaddingPx(padding),
      }}
    >
      {children}
    </AppSpaceContext.Provider>
  );
};
