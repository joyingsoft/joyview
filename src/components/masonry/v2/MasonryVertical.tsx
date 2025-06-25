import { useContext, useEffect, useRef, useState } from 'react';
import { AppImgContext } from '../../../context/AppImgContext';
import {
  mediaSizeNames,
  useMediaSize,
  type MediaSizeName,
} from '../../../hooks/use-media-size';
import { DEFAULT_COLUMNS } from '../masonry-utils';
import { ImgColumnContext } from '../../../context/ImgColumnContext';
import { MasonryVerticalColumn } from './MasonryVerticalColumn';
import { Slideshow } from '../../slideshow/Slideshow';
import { useSlideShow } from '../../slideshow/use-slide-show';
import { ImgSpaceContext } from '../../../context/ImgSpaceContext';
import '../masonry-vertical.scss';

export const MasonryVertical = () => {
  // const [isPending, startTransition] = useTransition();
  const mediaSizeName = useMediaSize();
  const { imageSpace } = useContext(ImgSpaceContext);
  const { imageFiles } = useContext(AppImgContext);
  const { columns } = useContext(ImgColumnContext);
  const [columnItems, setColumnItems] = useState<Array<Array<File>>>([]);
  const { slideshowIndex, setSlideshowIndex, handleFileChange } =
    useSlideShow(imageFiles);
  const mediaSizeCols = new Map<MediaSizeName | string, number>(
    mediaSizeNames.map((name, index) => [name, index + 1]),
  );
  const columnSize =
    columns || mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS;

  const notLoadedFilesRef = useRef<File[]>([]);

  useEffect(() => {
    notLoadedFilesRef.current = [...imageFiles];
    setColumnItems(new Array(columnSize).fill([]));
  }, [columnSize, imageFiles]);

  const handleLoadMore = (colIndex: number) => {
    const file = notLoadedFilesRef.current.shift();
    if (!file) {
      return;
    }

    console.log(
      'handleLoadMore',
      colIndex,
      file.name,
      notLoadedFilesRef.current.length,
    );
    // startTransition(() => {
    setColumnItems((prevItems) => {
      const newItems = [...prevItems];
      const currentFiles = newItems[colIndex] || [];
      newItems[colIndex] = [...currentFiles, file];
      return newItems;
    });
    // });
  };

  return (
    <>
      <div className="masonry-v" style={{ padding: `${imageSpace}px` }}>
        {columnItems.map((files, index) => (
          <MasonryVerticalColumn
            columns={columnSize}
            imageSpace={imageSpace}
            key={index}
            files={files}
            haveMore={notLoadedFilesRef.current.length > 0} //&& !isPending}
            onLoadMore={() => handleLoadMore(index)}
            onImgClick={(key: string) => {
              const fileIndex = imageFiles.findIndex(
                (file) => file.name === key,
              );
              if (fileIndex !== -1) {
                setSlideshowIndex(fileIndex);
              }
            }}
          />
        ))}
      </div>
      <Slideshow
        onFileChange={handleFileChange}
        onClose={() => setSlideshowIndex(undefined)}
        file={
          slideshowIndex !== undefined ? imageFiles[slideshowIndex] : undefined
        }
      />
    </>
  );
};
