import {
  createContext,
  type FC,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  type MediaSizeName,
  mediaSizeNames,
  useMediaSize,
} from '../hooks/use-media-size';

type AppImgColumnsContextProps = {
  columnsEvent?: (columns: number) => void;
};

type AppImgColumnsContextStates = {
  columns?: number;
};

const appImgColumnsContextDefault: AppImgColumnsContextProps &
  AppImgColumnsContextStates = {
  columns: undefined,
};

export const AppImgColumnsContext = createContext(appImgColumnsContextDefault);

export const AppImgColsContextProvider: FC<
  AppImgColumnsContextProps & { children: ReactNode }
> = ({ children }) => {
  const mediaSizeName = useMediaSize();

  const [columns, setColumns] = useState<number | undefined>(
    appImgColumnsContextDefault.columns,
  );

  const mediaSizeCols = new Map<MediaSizeName | string, number>(
    mediaSizeNames.map((name, index) => [name, index + 1]),
  );

  useEffect(() => {
    setColumns(mediaSizeCols.get(mediaSizeName));
  }, [mediaSizeName]);

  return (
    <AppImgColumnsContext.Provider
      value={{
        columns,
        columnsEvent: (newCols) => setColumns(newCols),
      }}
    >
      {children}
    </AppImgColumnsContext.Provider>
  );
};
