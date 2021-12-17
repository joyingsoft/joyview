import { FC } from 'react';

export const FileImage: FC<{ file: File; classNames?: string }> = ({
  file,
  classNames,
}) => {
  return (
    <img
      className={classNames}
      src={URL.createObjectURL(file)}
      alt={file.name}
    />
  );
};
