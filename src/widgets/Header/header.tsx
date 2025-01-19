"use client";

import { useFocusMode } from "@/features/FocusMode/model/hooks/useFocusMode";
import { useVisible } from "@/shared/hooks/use-visible";
import { useEffect, useState } from "react";

export const Header = () => {
  const { isFocus } = useFocusMode();

  const isVisible = useVisible(400, isFocus);

  return (
    <header
      className={`h-[80px] select-none flex items-center p-3 transition-all duration-700 ${
        isFocus ? "translate-y-[-100%]" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : ""}`}
    >
      Acudama Print
    </header>
  );
};
