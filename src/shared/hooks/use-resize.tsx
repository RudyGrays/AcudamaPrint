"use client";

import { useEffect } from "react";

export const useResize = (
  element: React.RefObject<any>,
  callback: (...args: any) => void
) => {
  useEffect(() => {
    const currentElement = element.current;

    if (currentElement && currentElement instanceof HTMLElement) {
      const resizeObserver = new ResizeObserver(callback);
      resizeObserver.observe(currentElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [element.current, callback]);
};
