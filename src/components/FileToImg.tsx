import { useContext, useEffect, useState, useCallback } from 'react';
import { AppImgContext } from '../context/AppImgContext';
import { getFilePathName, trimExtension } from '../utils/file-utils';
import {
  getResizedDataURL,
  isDefinedResizeType,
  loadImageFromFile,
} from '../utils/img-utils';

const getImgDataURL = async (
  file: File,
  resize = false,
  maxWidth = 1000,
  maxHeight = 1000,
) => {
  if (resize && isDefinedResizeType(file.type)) {
    const img = await loadImageFromFile(file);
    if (img.width > maxWidth || img.height > maxHeight) {
      return getResizedDataURL(img, maxWidth, maxHeight);
    }
    return img.src;
  }
  await (() => new Promise((r) => setTimeout(r, Math.random() * 1000 + 200)))();
  return URL.createObjectURL(file);
};

interface Props {
  file: File;
  priority?: boolean;
}

export const FileToImg = ({ file, priority = false }: Props) => {
  const imgKey = getFilePathName(file);
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { loadedImgs, imgDataEvent, imgLoadedEvent } =
    useContext(AppImgContext);

  useEffect(() => {
    const loadedImg = loadedImgs.get(imgKey);

    if (loadedImg?.srcDataURL) {
      setImageSrc(loadedImg.srcDataURL);
      if (loadedImg.isLoaded) {
        setIsLoaded(true);
      }
    } else {
      getImgDataURL(file)
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

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    imgLoadedEvent?.(imgKey, true);
  }, [imgKey, imgLoadedEvent]);

  const handleError = useCallback(() => {
    setHasError(true);
    console.warn(`Failed to load image: ${file.name}`);
  }, [file.name]);

  if (hasError) {
    return (
      <div
        style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#ffebee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c62828',
          fontSize: '12px',
          textAlign: 'center',
          padding: '8px',
        }}
      >
        ❌ Failed to load
        <br />
        {trimExtension(file.name)}
      </div>
    );
  }

  if (!imageSrc) {
    return (
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        ⏳ Loading...
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={trimExtension(file.name)}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        opacity: isLoaded ? 1 : 0.8,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};
