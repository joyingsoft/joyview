import React, { FC, useCallback, useEffect, useState } from 'react';
import { useIsElementVisible } from '../hooks/use-is-element-visible';
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
  const [refEl, setRefEl] = useState<Element | undefined>(undefined);
  const { isVisible } = useIsElementVisible(refEl);

  let ref = useCallback((el) => {
    setRefEl(el);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

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
  }, [file, isVisible]);

  return (
    <img
      className={classNames}
      src={
        data ||
        // eslint-disable-next-line max-len
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
      alt={file?.name}
      ref={ref}
    />
  );
};
