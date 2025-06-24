import { useCallback, useState } from 'react';

export function useSlideShow(imageFiles: File[]) {
  const [slideshowIndex, setSlideshowIndex] = useState<number>();
  const handleFileChange = useCallback(
    (isNext: boolean) => {
      if (slideshowIndex === undefined || imageFiles.length === 0) return;

      const nextIndex = isNext
        ? (slideshowIndex + 1) % imageFiles.length
        : (slideshowIndex - 1 + imageFiles.length) % imageFiles.length;
      setSlideshowIndex(nextIndex);
    },
    [slideshowIndex, imageFiles.length],
  );

  return {
    slideshowIndex,
    setSlideshowIndex,
    handleFileChange,
  };
}
