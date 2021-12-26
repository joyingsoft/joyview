import { FC, useContext } from 'react';
import { FileImage } from '../components/file-image';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext, AppViewEnum } from '../context/app-context-provider';
import { AppSpaceContext } from '../context/app-space-provider';
import { WelcomePage } from './sub/welcome-page';

const MainViewDispatcher: FC = () => {
  const { imageFiles, view } = useContext(AppContext);
  const { imagePaddingPx } = useContext(AppSpaceContext);

  switch (view) {
    case AppViewEnum.masonryVertical:
      return (
        <MasonryVertical cssProps={{ padding: `${imagePaddingPx}px` }}>
          {imageFiles.map((img) => (
            <div
              style={{ padding: `${imagePaddingPx}px` }}
              key={img.webkitRelativePath + img.name}
            >
              <FileImage file={img} />
            </div>
          ))}
        </MasonryVertical>
      );
    case AppViewEnum.welcome:
      return <WelcomePage />;
    default:
      return <WelcomePage />;
  }
};

export const Main: FC = () => {
  return (
    <Container>
      <Sidebar />
      <Contents>
        <MainViewDispatcher />
      </Contents>
    </Container>
  );
};
