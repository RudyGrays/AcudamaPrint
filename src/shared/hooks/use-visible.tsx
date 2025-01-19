"use client";
import { useEffect, useState } from "react";

export const useVisible = (hideTime: number, visible?: boolean) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideTime);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [visible]);

  return isVisible;
};
