"use client";
import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { FC, memo, useEffect, useRef } from "react";

interface CharsAreaProps {
  values: string[];
  currentValueIdx?: number;
  printedChars?: string[];
}

export const CharsArea: FC<CharsAreaProps> = memo(
  ({ values, currentValueIdx, printedChars }) => {
    const element = useRef<HTMLDivElement>(null);
    const first = useRef<HTMLDivElement>(null);
    const isLess600 = useCustomSize(600);

    useEffect(() => {
      first.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, [values]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    if (currentValueIdx && currentValueIdx % (isLess600 ? 30 : 70) === 0) {
      element.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (currentValueIdx && currentValueIdx < (isLess600 ? 30 : 70)) {
      first.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    return (
      <div className="w-full  h-min max-h-[100px]  flex flex-wrap gap-[2px] text-center overflow-auto hide-scrollbar">
        <div ref={first} />
        {values.map((value, idx) => {
          const isError =
            printedChars &&
            printedChars[idx] !== value &&
            idx <= printedChars.length - 1;

          const isComplete = currentValueIdx
            ? idx < currentValueIdx && !isError
            : false;

          return (
            <span
              key={idx}
              ref={
                currentValueIdx &&
                currentValueIdx > (isLess600 ? 36 : 80) &&
                currentValueIdx - (isLess600 ? 36 : 80) === idx
                  ? element
                  : undefined
              }
            >
              <span
                className={
                  "h-min  " +
                  `${!!isError && " text-red-400 "}` +
                  `${isComplete ? " text-foreground " : " text-gray-400 "}` +
                  ` ${
                    idx === currentValueIdx ? " animate-underline-blink " : " "
                  } `
                }
              >
                {value === "Space" ? (
                  <span className="opacity-0">a</span>
                ) : (
                  value
                )}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
);
