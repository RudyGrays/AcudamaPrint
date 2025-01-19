import { RefObject, useCallback, useEffect, useRef } from "react";

export const useThrottle = (delay: number, fn: () => void) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      fn();
    }, delay);
  }, [delay, fn]);

  return throttledCallback;
};
