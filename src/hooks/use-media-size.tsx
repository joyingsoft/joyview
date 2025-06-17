import { useEffect, useState } from 'react';

export type MediaSizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const mediaSizeBreakpoints = {
  ['xs']: 0,
  ['sm']: 576,
  ['md']: 768,
  ['lg']: 992,
  ['xl']: 1200,
  ['xxl']: 1400,
} as const;

export const mediaSizeNames: MediaSizeName[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
];

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
      const mq: MediaQueryList =
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
