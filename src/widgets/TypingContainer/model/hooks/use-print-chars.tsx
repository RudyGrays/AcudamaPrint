"use client";

import { useEffect, useMemo, useState } from "react";

export const usePrintChars = (
  isPaused: boolean,
  writeZoneIsHovered: boolean,
  values: string[],
  focused: boolean
) => {
  const [chars, setChars] = useState<string[]>([]);

  const mappedValues = useMemo(() => {
    const valuesWithSpace: string[] = [];
    let isSpace = false;

    for (let i = 0; i < values.length; ) {
      if (!isSpace) {
        if (values[i].length > 1) {
          for (let str of values[i]) {
            valuesWithSpace.push(str);
          }
        } else {
          valuesWithSpace.push(values[i]);
        }

        isSpace = true;
        i++;
      } else {
        isSpace = false;
        valuesWithSpace.push("Space");
      }
    }
    setChars([]);
    return valuesWithSpace;
  }, [values]);

  useEffect(() => {
    const printChar = (e: KeyboardEvent) => {
      if (e.key == "Backspace") {
        return setChars((prev) => {
          return [...prev.slice(0, prev.length - 1)];
        });
      }
      if (
        e.key == "Shift" ||
        e.key == "Alt" ||
        e.key == "Tab" ||
        e.key == "Control" ||
        e.key == "Escape" ||
        e.key == "Meta" ||
        chars.length === mappedValues.length ||
        !focused ||
        isPaused ||
        !writeZoneIsHovered ||
        (mappedValues[chars.length] == "Space" && e.key !== " ")
      ) {
        return;
      }

      if (e.key == " ") return setChars((prev) => [...prev, "Space"]);

      setChars((prev) => {
        if (!prev.length) return [...prev, e.key];
        return [...prev, e.key];
      });
    };

    window.addEventListener("keydown", printChar);
    return () => {
      window.removeEventListener("keydown", printChar);
    };
  }, [chars, focused, isPaused, writeZoneIsHovered, values]);

  return {
    chars,
    setChars,
    mappedValues,
  };
};
