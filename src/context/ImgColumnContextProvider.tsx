import { useEffect, useState, type ReactNode } from 'react';
import {
  type MediaSizeName,
  mediaSizeNames,
  useMediaSize,
} from '../hooks/use-media-size';
import { ImgColumnContext } from './ImgColumnContext';

export const ImgColumnContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mediaSizeName = useMediaSize();

  const [columns, setColumns] = useState<number | undefined>();

  useEffect(() => {
    const mediaSizeCols = new Map<MediaSizeName | string, number>(
      mediaSizeNames.map((name, index) => [name, index + 1]),
    );
    setColumns(mediaSizeCols.get(mediaSizeName));
  }, [mediaSizeName]);

  return (
    <ImgColumnContext.Provider
      value={{
        columns,
        setColumns,
      }}
    >
      {children}
    </ImgColumnContext.Provider>
  );
};
