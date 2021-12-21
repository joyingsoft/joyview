import { FC, useContext } from 'react';
import { FileImage } from '../components/file-image';
import { MasonryVertical } from '../components/masonry/masonry-vertical';
import { AppContext } from '../context/app-context-provider';
import { WelcomePage } from './sub/welcome-page';

export const Main: FC = () => {
  const { imageFiles } = useContext(AppContext);

  if (imageFiles && imageFiles.length > 0) {
    return (
      <MasonryVertical>
        {imageFiles.map((img) => (
          <FileImage key={img.webkitRelativePath + img.name} file={img} />
        ))}
      </MasonryVertical>
    );
  }

  return <WelcomePage />;
};
