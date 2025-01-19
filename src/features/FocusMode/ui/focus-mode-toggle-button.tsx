"use client";
import { Scan, ScanEye } from "lucide-react";
import { useFocusMode } from "../model/hooks/useFocusMode";

export const FocusModeToggleButton = () => {
  const { focusHandler, isFocus } = useFocusMode();
  return (
    <>
      {isFocus ? (
        <Scan className="cursor-pointer" onClick={focusHandler} />
      ) : (
        <ScanEye className="cursor-pointer" onClick={focusHandler} />
      )}
    </>
  );
};
