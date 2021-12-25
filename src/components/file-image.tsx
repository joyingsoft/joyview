import React, { FC, useEffect, useState } from 'react';
import {
  getResizedDataURL,
  isDefinedResizeType,
  loadImageFromFile,
} from '../utils/img-resize';

export const FileImage: FC<{ file: File; classNames?: string }> = ({
  file,
  classNames,
}) => {
  const [data, setData] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isDefinedResizeType(file.type)) {
      loadImageFromFile(file).then((img) => {
        if (img.height > 1000 || img.width > 1000) {
          setData(getResizedDataURL(img));
        } else {
          setData(img.src);
        }
      });
    } else {
      setData(URL.createObjectURL(file));
    }
    return () => {
      setData('');
    };
  }, [file]);

  if (data && file) {
    return <img className={classNames} src={data} alt={file.name} />;
  }

  return null;
};
