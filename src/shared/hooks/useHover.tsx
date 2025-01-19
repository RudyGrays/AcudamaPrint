"use client";

import { RefObject, useEffect, useState } from "react";

export const useHover = (elementRef: RefObject<HTMLElement | null>) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnter = () => {
    setIsHovered(true);
  };
  const mouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef?.current?.addEventListener("mouseenter", mouseEnter);
    elementRef?.current?.addEventListener("mouseleave", mouseLeave);

    return () => {
      elementRef?.current?.removeEventListener("mouseenter", mouseEnter);
      elementRef?.current?.removeEventListener("mouseleave", mouseLeave);
    };
  }, [elementRef]);
  return isHovered;
};
