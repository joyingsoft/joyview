import { FC, useContext } from 'react';
import { FileImage } from '../../components/file-image';
import { MasonryVertical } from '../../components/masonry/masonry-vertical';
import { AppContext } from '../../context/app-context-provider';

export const Home: FC = () => {
  const { imageFiles, getFilesEvent: getFiles } = useContext(AppContext);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={getFiles}>directory picker</button>
      <MasonryVertical>
        {imageFiles.map((img) => (
          <FileImage key={img.webkitRelativePath + img.name} file={img} />
        ))}
      </MasonryVertical>
    </div>
  );
};
