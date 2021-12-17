import { useEffect, useState } from 'react';

export const mediaQueryBreakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoints =
  typeof mediaQueryBreakpoints[keyof typeof mediaQueryBreakpoints];

/**
 *
 * @param breakpointInPx use pre defined breakpoint in mediaQueryBreakpoints if possible.
 */
export const useBreakpoint = (breakpointInPx: Breakpoints | number) => {
  const [isLarger, setIsLarger] = useState(window.innerWidth > breakpointInPx);

  const mediaQuery = window.matchMedia(`(min-width: ${breakpointInPx}px)`);

  useEffect(() => {
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsLarger(e.matches);
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
    // Deprecated
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [breakpointInPx, mediaQuery]);

  return isLarger;
};
