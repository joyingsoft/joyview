import {
  directoryOpen,
  FileWithDirectoryHandle,
  WellKnownDirectory,
} from 'browser-fs-access';
import { FC, useState } from 'react';
import { FileImage } from '../../components/file-image';
import { MasonryVertical } from '../../masonry/vertical/masonry-vertical';

export const Home: FC = () => {
  const [images, setImages] = useState<FileWithDirectoryHandle[]>([]);
  const handleBtnClick = async () => {
    const options = {
      // Set to `true` to recursively open files in all subdirectories,
      // defaults to `false`.
      recursive: true,
      // Suggested directory in which the file picker opens.
      startIn: 'pictures' as WellKnownDirectory,
      id: 'projects',
      // determine whether a directory should be entered, return `true` to skip.
      // skipDirectory: (entry) => entry.name[0] === '.',
    };

    const blobs = await directoryOpen(options);
    console.log(blobs);
    setImages(blobs);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleBtnClick}>directory picker</button>
      <MasonryVertical>
        {images.map((img) => (
          <FileImage key={img.webkitRelativePath + img.name} file={img} />
        ))}
      </MasonryVertical>
    </div>
  );
};
