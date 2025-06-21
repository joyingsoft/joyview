import { useCallback, useContext, useEffect, useState } from 'react';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { AppContext } from '../context/AppContext';
import { AppImgContext } from '../context/AppImgContext';
import { WelcomePage } from './sub/welcome-page';
import { ImgSpaceContext } from '../context/ImgSpaceContext';
import { ImgColumnContext } from '../context/ImgColumnContext';
import { Slideshow } from '../components/slideshow/Slideshow';
import { FileImage } from '../components/file-image';
import { getFilePathName } from '../utils/file-utils';
import { MasonryVertical } from '../components/masonry/masonry-vertical';

const MainViewDispatcher = () => {
  const [slideshowIndex, setSlideshowIndex] = useState<number>();
  const { view, setView } = useContext(AppContext);
  const { imageFiles } = useContext(AppImgContext);
  const { imageSpace } = useContext(ImgSpaceContext);
  const { columns } = useContext(ImgColumnContext);

  const handleItemClick = (index: number) => {
    setSlideshowIndex(index);
  };

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

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0 && view === 'welcome' && setView) {
      setView('masonryVertical');
    }
  }, [imageFiles, view, setView]);

  switch (view) {
    case 'masonryVertical':
      return (
        <MasonryVertical
          columns={columns}
          cssProps={{ padding: `${imageSpace}px` }}
          // onItemClick={handleItemClick}
        >
          <Slideshow
            onFileChange={handleFileChange}
            onClose={() => setSlideshowIndex(undefined)}
            file={
              slideshowIndex !== undefined
                ? imageFiles[slideshowIndex]
                : undefined
            }
          />
          {imageFiles.map((img, index) => (
            <div
              onClick={() => setSlideshowIndex(index)}
              style={{ padding: `${imageSpace}px` }}
              key={getFilePathName(img)}
            >
              <FileImage file={img} />
            </div>
          ))}
        </MasonryVertical>
      );
    case 'welcome':
      return <WelcomePage />;
    default:
      return <WelcomePage />;
  }
};

export const Main = () => {
  return (
    <Container>
      <Sidebar />
      <Contents>
        <MainViewDispatcher />
      </Contents>
    </Container>
  );
};
