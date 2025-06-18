import { useContext, useEffect } from 'react';
import { FileImage } from '../components/file-image';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext } from '../context/AppContext';
import { AppImgContext } from '../context/AppImgContext';
import { getFilePathName } from '../utils/file-utils';
import { WelcomePage } from './sub/welcome-page';
import { ImgSpaceContext } from '../context/ImgSpaceContext';
import { ImgColumnContext } from '../context/ImgColumnContext';

const MainViewDispatcher = () => {
  const { view, setView } = useContext(AppContext);
  const { imageFiles } = useContext(AppImgContext);
  const { imageSpace } = useContext(ImgSpaceContext);
  const { columns } = useContext(ImgColumnContext);

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
        >
          {imageFiles.map((img) => (
            <div
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
