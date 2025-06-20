import { type SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AppImgContext } from '../context/AppImgContext';
import { getFilePathName, trimExtension } from '../utils/file-utils';
import {
  getResizedDataURL,
  isDefinedResizeType,
  loadImageFromFile,
} from '../utils/img-utils';
import { flushSync } from 'react-dom';
import { useIsElementVisible } from '../hooks/use-is-element-visible';

const getImgDataURL = async (file: File, maxWidth = 1000, maxHeight = 1000) => {
  if (isDefinedResizeType(file.type)) {
    const img = await loadImageFromFile(file);
    if (img.width > maxWidth || img.height > maxHeight) {
      return getResizedDataURL(img, maxWidth, maxHeight);
    }
    return img.src;
  }
  return URL.createObjectURL(file);
};

export const FileImage = ({
  file,
  classNames,
}: {
  file: File;
  classNames?: string;
}) => {
  const imgKey = getFilePathName(file);
  const [data, setData] = useState<string | undefined>(undefined);
  const { isVisible, setElement } = useIsElementVisible();

  const { loadedImgs, imgDataEvent, imgLoadedEvent, isAllImgsLoaded } =
    useContext(AppImgContext);

  useEffect(() => {
    if (isVisible && !data) {
      const loadedImg = loadedImgs.get(imgKey);
      if (loadedImg?.srcDataURL) {
        setData(() => loadedImg.srcDataURL);
      } else {
        getImgDataURL(file)
          .then((src) => {
            imgDataEvent?.(imgKey, src);
            flushSync(() => {
              setData(() => src);
            });
          })
          .catch(console.error);
      }
    }
  }, [file, loadedImgs, imgKey, imgDataEvent, data, isVisible]);

  useEffect(() => {
    return () => {
      if (data && data.startsWith('blob:')) {
        URL.revokeObjectURL(data);
      }

      if (imgLoadedEvent) {
        imgLoadedEvent(imgKey, false);
      }
    };
  }, [data, imgKey, imgLoadedEvent]);

  const imgOnLoadHandle = (e: SyntheticEvent<HTMLImageElement>) => {
    if (data && imgLoadedEvent && !isAllImgsLoaded) {
      imgLoadedEvent(imgKey, true, e);
    }
  };

  return (
    <img
      ref={setElement}
      className={classNames}
      src={
        data ||
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
      alt={trimExtension(file?.name)}
      onLoad={imgOnLoadHandle}
    />
  );
};
