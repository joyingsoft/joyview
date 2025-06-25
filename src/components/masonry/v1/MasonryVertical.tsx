import { useContext } from 'react';
import { AppImgContext } from '../../../context/AppImgContext';
import { Slideshow } from '../../slideshow/Slideshow';
import { getFilePathName } from '../../../utils/file-utils';
import { ImgSpaceContext } from '../../../context/ImgSpaceContext';
import { FileImage } from './FileImage';
import { MasonryVerticalColumns } from './MasonryVerticalColumns';
import { useSlideShow } from '../../slideshow/use-slide-show';
import '../masonry-vertical.scss';

export const MasonryVertical = () => {
  const { imageSpace } = useContext(ImgSpaceContext);
  const { imageFiles } = useContext(AppImgContext);
  const { slideshowIndex, setSlideshowIndex, handleFileChange } =
    useSlideShow(imageFiles);

  return (
    <MasonryVerticalColumns>
      {imageFiles.map((file, index) => (
        <div
          onClick={() => setSlideshowIndex(index)}
          style={{ padding: `${imageSpace}px` }}
          key={getFilePathName(file)}
        >
          <FileImage file={file} />
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
