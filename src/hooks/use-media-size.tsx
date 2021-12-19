import { useEffect, useState } from 'react';

export enum MediaSizeName {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}

export const mediaSizeBreakpoints = {
  [MediaSizeName.xs]: 0,
  [MediaSizeName.sm]: 480,
  [MediaSizeName.md]: 768,
  [MediaSizeName.lg]: 1024,
  [MediaSizeName.xl]: 1280,
  [MediaSizeName.xxl]: 1440,
} as const;

/**
 *
 * @param breakpoints [MediaSizeName | string, number][]; an ordered list
 *                    contains list element break point name (at index 0)
 *                    and break point (px value at index 1)
 */
export const useMediaSize = (
  breakpoints: [MediaSizeName | string, number][] = Object.entries(
    mediaSizeBreakpoints,
  ),
) => {
  const [mediaSize, setMediaSize] = useState<MediaSizeName | string>(
    breakpoints[0][0],
  );

  const mediaQueries = new Map<MediaSizeName | string, MediaQueryList>();

  const handleMediaQueryChange = (
    name: MediaSizeName | string,
    matches: boolean,
  ) => {
    if (matches) {
      setMediaSize(name);
    }
  };

  useEffect(() => {
    for (let i = 0; i < breakpoints.length; i++) {
      const name = breakpoints[i][0];
      let mq: MediaQueryList =
        i === breakpoints.length - 1
          ? window.matchMedia(`(min-width: ${breakpoints[i][1]}px)`)
          : window.matchMedia(
              `(min-width: ${breakpoints[i][1]}px) and (max-width: ${
                breakpoints[i + 1][1]
              }px)`,
            );

      mediaQueries.set(name, mq);
      handleMediaQueryChange(name, mq.matches);
    }

    mediaQueries.forEach((mq, k) => {
      mq.addEventListener('change', (e) =>
        handleMediaQueryChange(k, e.matches),
      );
    });
    return () => {
      mediaQueries.forEach((mq, k) => {
        mq.removeEventListener('change', (e) =>
          handleMediaQueryChange(k, e.matches),
        );
      });
    };
  }, [breakpoints]);

  return mediaSize;
};
