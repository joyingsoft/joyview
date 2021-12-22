import { FC, useContext } from 'react';
import { FileImage } from '../components/file-image';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext, AppViewEnum } from '../context/app-context-provider';
import { WelcomePage } from './sub/welcome-page';

const MainViewDispatcher: FC = () => {
  const { imageFiles, view } = useContext(AppContext);
  switch (view) {
    case AppViewEnum.masonryVertical:
      return (
        <MasonryVertical>
          {imageFiles.map((img) => (
            <FileImage key={img.webkitRelativePath + img.name} file={img} />
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
