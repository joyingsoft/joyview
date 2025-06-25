import { useContext, useEffect } from 'react';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { AppContext } from '../context/AppContext';
import { AppImgContext } from '../context/AppImgContext';
import { WelcomePage } from './sub/welcome-page';
import { MasonryVertical as MasonryVerticalV1 } from '../components/masonry/v1/MasonryVertical';
import { MasonryVertical as MasonryVerticalV2 } from '../components/masonry/v2/MasonryVertical';
import { useParams } from 'react-router-dom';

const MainViewDispatcher = () => {
  const { view, setView } = useContext(AppContext);
  const { imageFiles } = useContext(AppImgContext);

  const { version } = useParams<{ version?: string }>();

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0 && view === 'welcome' && setView) {
      setView('masonryVertical');
    }
  }, [imageFiles, view, setView]);

  switch (view) {
    case 'masonryVertical':
      switch (version) {
        case 'v2':
          return <MasonryVerticalV2 />;
        default:
          return <MasonryVerticalV1 />;
      }
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
