import {
  type SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppImgContext } from '../context/app-img-provider';
import { getFilePathName, trimExtension } from '../utils/file-utils';
import {
  getResizedDataURL,
  isDefinedResizeType,
  loadImageFromFile,
} from '../utils/img-utils';
import { flushSync } from 'react-dom';

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
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { loadedImgs, imgDataEvent, imgLoadedEvent, isAllImgsLoaded } =
    useContext(AppImgContext);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    // Lag en lokal kopi for cleanup
    const currentImgElement = imgElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Håndter synlighet
          if (!data) {
            const loadedImg = loadedImgs.get(imgKey);
            if (loadedImg?.srcDataURL) {
              flushSync(() => {
                setData(() => loadedImg.srcDataURL);
              });
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

          // Slutt å observere hvis ikke full observe
          observer.unobserve(currentImgElement);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.01,
      },
    );

    observer.observe(currentImgElement);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(currentImgElement);
      }
    };
  }, [file, loadedImgs, imgKey, imgDataEvent, imgRef.current]);

  useEffect(() => {
    return () => {
      // Rydd opp bildedata ved unmount
      if (data && data.startsWith('blob:')) {
        URL.revokeObjectURL(data);
      }

      if (imgLoadedEvent) {
        imgLoadedEvent(imgKey, false);
      }
    };
  }, [data, imgKey, imgLoadedEvent]);

  const imgOnLoadHandle = (e: SyntheticEvent<HTMLImageElement>) => {
    if (imgRef.current && data && imgLoadedEvent && !isAllImgsLoaded) {
      imgLoadedEvent(imgKey, true, e);
    }
  };

  return (
    <img
      ref={imgRef}
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
