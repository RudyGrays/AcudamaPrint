"use client";
import { useContext } from "react";
import { FocusModeContext } from "../../ui/focus-mode-provider";

export const useFocusMode = () => {
  return useContext(FocusModeContext);
};
