import { useEffect, useState } from 'react';

/**
 * @param element: the element to observe.
 * @param fullObserve: observe Element visibility changes.
 *  - false: stop observe when element is visible.
 *  - true: keep updating isVisible.
 * @param options
 *
 * ref:
 * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export const useIsElementVisible = (
  element?: Element | null,
  fullObserve = false,
  options: IntersectionObserverInit = {
    /**
     * The element that is used as the viewport for checking visibility
     *  of the target. Must be the ancestor of the target.
     * Defaults to the browser viewport if not specified or if null.
     */
    root: null,
    /**
     * Margin around the root.
     * Can have values similar to the CSS margin property,
     * e.g. "10px 20px 30px 40px" (top, right, bottom, left).
     * The values can be percentages.
     * This set of values serves to grow or shrink
     * each side of the root element's bounding box
     * before computing intersections. Defaults to all zeros.
     */
    rootMargin: '0px',
    /**
     * Either a single number or an array of numbers
     * which indicate at what percentage of the target's
     * visibility the observer's callback should be executed.
     * If you only want to detect when visibility passes the 50% mark,
     * you can use a value of 0.5.
     * If you want the callback to run every time
     * visibility passes another 25%,
     * you would specify the array [0, 0.25, 0.5, 0.75, 1].
     * The default is 0 (meaning as soon as even one pixel is visible,
     * the callback will be run).
     * A value of 1.0 means that the threshold isn't considered passed
     * until every pixel is visible.
     */
    threshold: 0,
  },
) => {
  const [isVisible, setIsVisible] = useState<boolean>();

  let intersection: IntersectionObserver;

  const stopObserve = () => {
    if (intersection) {
      if (element) {
        // Tells the IntersectionObserver to stop observing target element.
        intersection.unobserve(element);
      }

      // Stops the IntersectionObserver object from observing any target.
      intersection.disconnect();
    }
  };

  const intersectionCallback = ([entry]: IntersectionObserverEntry[]) => {
    if (entry) {
      const visible = entry.isIntersecting;
      setIsVisible(visible);
      if (visible && !fullObserve) {
        stopObserve();
      }
    }
  };

  useEffect(() => {
    if (!element) return;
    intersection = new IntersectionObserver(intersectionCallback, options);

    // start observing
    intersection.observe(element);

    return () => {
      stopObserve();
    };
  }, [element, options]);

  return { isVisible };
};
