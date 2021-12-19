import {
  directoryOpen,
  FileWithDirectoryHandle,
  WellKnownDirectory,
} from 'browser-fs-access';
import { FC, useState } from 'react';
import { FileImage } from '../../components/file-image';
import { MasonryVertical } from '../../components/masonry/masonry-vertical';
import { useMediaSize } from '../../hooks/use-media-size';
import { isMediaTypeImage } from '../../utils/file-utils';

export const Home: FC = () => {
  const [images, setImages] = useState<FileWithDirectoryHandle[]>([]);
  const ms = useMediaSize();

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

    const fileHandles = await directoryOpen(options);
    setImages(fileHandles.filter((f) => isMediaTypeImage(f.type)));
  };

  return (
    <div>
      <h1>Home {ms}</h1>
      <button onClick={handleBtnClick}>directory picker</button>
      <MasonryVertical>
        {images.map((img) => (
          <FileImage key={img.webkitRelativePath + img.name} file={img} />
        ))}
      </MasonryVertical>
    </div>
  );
};
