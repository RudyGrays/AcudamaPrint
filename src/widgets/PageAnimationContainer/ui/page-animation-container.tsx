"use client";
import { ReactNode, useEffect, useState } from "react";

export const PageAnimationContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div
      className={
        "w-full h-full " +
        ` transition-all duration-700 ${
          isVisible
            ? " opacity-100 translate-y-0 "
            : " opacity-0 -translate-y-10 "
        }`
      }
    >
      {children}
    </div>
  );
};
