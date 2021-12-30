import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { AppImgContext } from '../context/app-img-provider';
import { useIsElementVisible } from '../hooks/use-is-element-visible';
import {
  getResizedDataURL,
  isDefinedResizeType,
  loadImageFromFile,
} from '../utils/img-utils';

const getImgDataURL = async (file: File, maxWidth = 1000, maxHeight = 1000) => {
  if (isDefinedResizeType(file.type)) {
    const img = await loadImageFromFile(file);
    if (img.width > maxWidth || img.height > maxHeight) {
      return getResizedDataURL(img, maxWidth, maxHeight);
    } else {
      return img.src;
    }
  }

  return URL.createObjectURL(file);
};

export const FileImage: FC<{ file: File; classNames?: string }> = ({
  file,
  classNames,
}) => {
  const [data, setData] = useState<string | undefined>(undefined);
  const [refEl, setRefEl] = useState<Element | undefined>(undefined);
  const { isVisible } = useIsElementVisible(refEl);
  const { addLoadedImg } = useContext(AppImgContext);

  let ref = useCallback((el) => {
    setRefEl(el);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    getImgDataURL(file)
      .then((src) => {
        setData(src);
      })
      .catch(() => {
        // todo log error
      });

    return () => {
      setData('');
    };
  }, [file, isVisible]);

  const imgOnLoadHandle = () => {
    if (isVisible && addLoadedImg) {
      addLoadedImg();
    }
  };

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
      onLoad={imgOnLoadHandle}
    />
  );
};
