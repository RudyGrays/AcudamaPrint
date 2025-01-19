"use client";

import { ReactNode, RefObject, useCallback } from "react";

export const useCombinedRef = (...refs: RefObject<unknown | null>[]) => {
  const combinedRef = useCallback((element: HTMLElement | ReactNode) => {
    refs.forEach((ref) => {
      if (!ref) return;
      ref.current = element;
    });
  }, refs);
  return combinedRef;
};
