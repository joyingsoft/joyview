import {
  directoryOpen,
  FileWithDirectoryHandle,
  WellKnownDirectory,
} from 'browser-fs-access';
import { FC, useState } from 'react';
import { FileImage } from '../../components/file-image';
import { ReactMasonryVertical } from '../../react-masonry/vertical/react-masonry-vertical';

export const Home: FC = () => {
  const [images, setImages] = useState<FileWithDirectoryHandle[]>([]);
  const handleBtnClick = async () => {
    const options = {
      // Set to `true` to recursively open files in all subdirectories,
      // defaults to `false`.
      recursive: true,
      // Suggested directory in which the file picker opens. A well-known directory or a file handle.
      startIn: 'pictures' as WellKnownDirectory,
      // By specifying an ID, the user agent can remember different directories for different IDs.
      id: 'projects',
      // Callback to determine whether a directory should be entered, return `true` to skip.
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
      <ReactMasonryVertical>
        {images.map((img) => (
          <FileImage key={img.webkitRelativePath + img.name} file={img} />
        ))}
      </ReactMasonryVertical>
    </div>
  );
};
