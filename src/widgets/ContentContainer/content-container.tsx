"use client";
import { useFocusMode } from "@/features/FocusMode/model/hooks/useFocusMode";
import { ReactNode, useEffect, useState } from "react";

export const ContentContainer = ({ children }: { children: ReactNode }) => {
  const { isFocus } = useFocusMode();

  return (
    <main
      style={{ marginLeft: `${isFocus ? 0 : 120}px` }}
      className={` grow px-2 transition-all  overflow-auto h-full`}
    >
      {children}
    </main>
  );
};
