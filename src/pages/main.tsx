import { FC, useContext } from 'react';
import { FileImage } from '../components/file-image';
import { Container } from '../components/layout/container';
import { Contents } from '../components/layout/contents';
import { Sidebar } from '../components/layout/sidebar';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext } from '../context/app-context-provider';
import { WelcomePage } from './sub/welcome-page';

export const Main: FC = () => {
  const { imageFiles } = useContext(AppContext);

  return (
    <Container>
      <Sidebar>sidebar</Sidebar>

      <Contents>
        {imageFiles && imageFiles.length > 0 ? (
          <MasonryVertical>
            {imageFiles.map((img) => (
              <FileImage key={img.webkitRelativePath + img.name} file={img} />
            ))}
          </MasonryVertical>
        ) : (
          <WelcomePage />
        )}
      </Contents>
    </Container>
  );
};
