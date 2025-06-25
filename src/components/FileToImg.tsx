import { useContext, useEffect, useState, useCallback } from 'react';
import { AppImgContext } from '../context/AppImgContext';
import { getFilePathName, trimExtension } from '../utils/file-utils';
import { getImgObjectURL } from '../utils/img-utils';

interface Props {
  file: File;
  priority?: boolean;
}

export const FileToImg = ({ file, priority = false }: Props) => {
  const imgKey = getFilePathName(file);
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { loadedImgs, isAllImgsLoaded, imgDataEvent, imgLoadedEvent } =
    useContext(AppImgContext);

  useEffect(() => {
    const loadedImg = loadedImgs.get(imgKey);

    if (loadedImg?.srcDataURL) {
      setImageSrc(loadedImg.srcDataURL);
      if (loadedImg.isLoaded) {
        setIsLoaded(true);
      }
    } else {
      getImgObjectURL(file)
        .then((src) => {
          imgDataEvent?.(imgKey, src);
          setImageSrc(src);
        })
        .catch(console.error);
    }

    return () => {
      if (imageSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [file, imgKey, loadedImgs, imgDataEvent, imageSrc]);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      if (imgLoadedEvent && !isAllImgsLoaded) {
        imgLoadedEvent?.(imgKey, true, e);
      }
    },
    [imgKey, imgLoadedEvent, isAllImgsLoaded],
  );

  const handleError = useCallback(() => {
    setHasError(true);
    console.warn(`Failed to load image: ${file.name}`);
  }, [file.name]);

  if (hasError) {
    return (
      <div className="error">
        ❌ Failed to load
        <br />
        {trimExtension(file.name)}
      </div>
    );
  }

  if (!imageSrc) {
    return <div className="loading">⏳ Loading...</div>;
  }

  return (
    <img
      src={imageSrc}
      alt={trimExtension(file.name)}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        opacity: isLoaded ? 1 : 0,
      }}
    />
  );
};
