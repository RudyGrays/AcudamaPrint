"use client";

import { useMemo } from "react";

export const useTestInfo = (
  mappedValues: string[],
  chars: string[],
  initialWords: string[]
) => {
  const valuesInfo = useMemo(() => {
    return mappedValues
      .map((value, idx) => {
        return {
          value,
          isError: chars && chars[idx] !== value && idx <= chars.length - 1,
        };
      })
      .filter((value, idx) => value.value !== "Space" && idx < chars.length);
  }, [mappedValues, chars]);

  const problemChars = useMemo(() => {
    return valuesInfo
      .filter((value) => value.isError === true)
      .map((value) => value.value);
  }, [valuesInfo]);

  const errorsLength = useMemo(() => {
    return valuesInfo.filter((value) => value.isError === true).length;
  }, [valuesInfo]);

  const accuracy = useMemo(() => {
    return !errorsLength && !valuesInfo.length
      ? 1
      : 1 - errorsLength / valuesInfo.length;
  }, [errorsLength, valuesInfo.length]);

  const words = useMemo(() => {
    const charsWithoutSpace = chars.filter((char) => char !== "Space");
    const valuesWithoutSpace = mappedValues.filter((char) => char !== "Space");

    const words = [];
    let currentLength: number = 0;

    for (let i = 0; i < initialWords.length; i++) {
      currentLength += initialWords[i].length;
      if (charsWithoutSpace.length >= currentLength) {
        words.push(initialWords[i]);
      }
    }
    return words;
  }, [mappedValues, chars, initialWords]);

  const charsWithoutSpace = useMemo(() => {
    return chars.filter((char) => char !== "Space");
  }, [chars]);
  return {
    valuesInfo,
    problemChars,
    accuracy,
    words,
    charsWithoutSpace,
  };
};
