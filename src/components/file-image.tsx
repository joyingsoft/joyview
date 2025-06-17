import {
  type FC,
  type SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppImgContext } from '../context/app-img-provider';
import { useIsElementVisible } from '../hooks/use-is-element-visible';
import { getFilePathName, trimExtension } from '../utils/file-utils';
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
  const imgKey = getFilePathName(file);
  const [data, setData] = useState<string | undefined>(undefined);
  // const [refImgEl, setRefImgEl] = useState<HTMLImageElement | undefined>(
  //   undefined,
  // );
  const [isReady, setIsReady] = useState(false);
  const [onLoadNr, setOnLoadNr] = useState(0);
  const refImgEl = useRef<HTMLImageElement>(null);
  const { isVisible } = useIsElementVisible(
    onLoadNr > 0 ? refImgEl?.current : undefined,
  );
  const { loadedImgs, imgDataEvent, imgLoadedEvent, isAllImgsLoaded } =
    useContext(AppImgContext);

  // const imgRef = useCallback((el: HTMLImageElement) => {
  //   setRefImgEl(el);
  // }, []);

  useEffect(() => {
    if (isVisible) setIsReady(true);
  }, [isVisible]);

  useEffect(() => {
    if (isReady && !data) {
      const loadedImg = loadedImgs.get(imgKey);
      if (loadedImg?.srcDataURL) {
        setData(loadedImg.srcDataURL);
      } else {
        getImgDataURL(file)
          .then((src) => {
            if (imgDataEvent) {
              imgDataEvent(imgKey, src);
            }
            setData(src);
          })
          .catch((e) => {
            console.log('err', e);
            // todo log error
          });
      }
    }

    return () => {
      setData(undefined);
    };
  }, [file, isReady]); //data, loadedImgs, imgKey, imgDataEvent]);

  useEffect(() => {
    return () => {
      if (imgLoadedEvent) {
        imgLoadedEvent(imgKey, false);
      }
    };
  }, []);

  const imgOnLoadHandle = (e: SyntheticEvent<HTMLImageElement>) => {
    const loadNr = onLoadNr + 1;
    setOnLoadNr(loadNr);
    if (!!data && imgLoadedEvent && !isAllImgsLoaded) {
      imgLoadedEvent(imgKey, true, e);
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
      alt={trimExtension(file?.name)}
      ref={refImgEl}
      onLoad={imgOnLoadHandle}
    />
  );
};
