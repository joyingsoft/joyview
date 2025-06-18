import { useContext, useEffect } from 'react';
import { FileImage } from '../components/file-image';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext } from '../context/app-context-provider';
import { AppImgColumnsContext } from '../context/app-img-cols-provider';
import { AppImgContext } from '../context/app-img-provider';
import { AppSpaceContext } from '../context/app-space-provider';
import { getFilePathName } from '../utils/file-utils';
import { WelcomePage } from './sub/welcome-page';

const MainViewDispatcher = () => {
  const { view, viewEvent } = useContext(AppContext);
  const { imageFiles } = useContext(AppImgContext);
  const { imagePaddingPx } = useContext(AppSpaceContext);
  const { columns } = useContext(AppImgColumnsContext);

  useEffect(() => {
    if (
      imageFiles &&
      imageFiles.length > 0 &&
      view === 'welcome' &&
      viewEvent
    ) {
      viewEvent('masonryVertical');
    }
  }, [imageFiles, view, viewEvent]);

  switch (view) {
    case 'masonryVertical':
      return (
        <MasonryVertical
          columns={columns}
          cssProps={{ padding: `${imagePaddingPx}px` }}
        >
          {imageFiles.map((img) => (
            <div
              style={{ padding: `${imagePaddingPx}px` }}
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
