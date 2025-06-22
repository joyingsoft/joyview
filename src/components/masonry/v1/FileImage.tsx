import { type SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AppImgContext } from '../../../context/AppImgContext';
import { getFilePathName, trimExtension } from '../../../utils/file-utils';
import { flushSync } from 'react-dom';
import { useIsElementVisible } from '../../../hooks/use-is-element-visible';
import { getImgObjectURL } from '../../../utils/img-utils';

export const FileImage = ({
  file,
  classNames,
}: {
  file: File;
  classNames?: string;
}) => {
  const imgKey = getFilePathName(file);
  const [data, setData] = useState<string | undefined>(undefined);
  const { isVisible, elementRef } = useIsElementVisible<HTMLImageElement>();

  const { loadedImgs, imgDataEvent, imgLoadedEvent, isAllImgsLoaded } =
    useContext(AppImgContext);

  useEffect(() => {
    if (isVisible && !data) {
      const loadedImg = loadedImgs.get(imgKey);
      if (loadedImg?.srcDataURL) {
        setData(() => loadedImg.srcDataURL);
      } else {
        getImgObjectURL(file)
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
      ref={elementRef}
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
