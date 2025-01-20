"use client";
import { SquareMousePointer } from "lucide-react";

export const CursorZone = ({ isLess600 }: { isLess600: boolean }) => {
  return (
    <div
      className={`text-[0.6rem] select-none items-center flex gap-2 right-3 ${
        isLess600 ? "bottom-3" : "top-3"
      } absolute`}
    >
      <span>Cursor zone</span>
      <SquareMousePointer className="h-[1rem]" />
    </div>
  );
};
