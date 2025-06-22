import { useCallback, useContext, useState } from 'react';
import { AppImgContext } from '../../../context/AppImgContext';
import { Slideshow } from '../../slideshow/Slideshow';
import { getFilePathName } from '../../../utils/file-utils';
import { ImgSpaceContext } from '../../../context/ImgSpaceContext';
import { FileImage } from './FileImage';
import { MasonryVerticalColumns } from './MasonryVerticalColumns';
import '../masonry-vertical.scss';

export const MasonryVertical = () => {
  const [slideshowIndex, setSlideshowIndex] = useState<number>();
  const { imageSpace } = useContext(ImgSpaceContext);
  const { imageFiles } = useContext(AppImgContext);

  const handleFileChange = useCallback(
    (isNext: boolean) => {
      if (slideshowIndex === undefined || imageFiles.length === 0) return;

      const nextIndex = isNext
        ? (slideshowIndex + 1) % imageFiles.length
        : (slideshowIndex - 1 + imageFiles.length) % imageFiles.length;
      setSlideshowIndex(nextIndex);
    },
    [slideshowIndex, imageFiles.length],
  );

  return (
    <MasonryVerticalColumns>
      {imageFiles.map((img, index) => (
        <div
          onClick={() => setSlideshowIndex(index)}
          style={{ padding: `${imageSpace}px` }}
          key={getFilePathName(img)}
        >
          <FileImage file={img} />
        </div>
      ))}
      <Slideshow
        onFileChange={handleFileChange}
        onClose={() => setSlideshowIndex(undefined)}
        file={
          slideshowIndex !== undefined ? imageFiles[slideshowIndex] : undefined
        }
      />
    </MasonryVerticalColumns>
  );
};
