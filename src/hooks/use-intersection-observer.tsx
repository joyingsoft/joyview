import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit = {},
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [hasBeenVisible, options]);

  return { elementRef, isVisible, hasBeenVisible };
};
