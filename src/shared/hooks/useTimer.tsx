"use client";

import { useCallback, useEffect, useState } from "react";

export const useTimer = (
  startTimeSeconds: number,

  endTimeSeconds?: number
) => {
  const [seconds, setSeconds] = useState(startTimeSeconds);

  const [start, setStart] = useState(false);
  let timer: NodeJS.Timeout;

  const startTimer = useCallback(() => {
    setStart(true);
  }, []);
  const pauseTimer = useCallback(() => {
    setStart(false);
  }, []);
  const clearTimer = useCallback(() => {
    setSeconds(startTimeSeconds);
    setStart(false);
  }, [startTimeSeconds]);

  useEffect(() => {
    if (!start) return;

    if (typeof seconds !== "number") return;
    timer = setTimeout(() => {
      setSeconds((prev) => {
        if (typeof prev === "number") {
          return prev + 1;
        }
        return 0;
      });
    }, 1000);

    if (endTimeSeconds && seconds >= endTimeSeconds) return clearTimeout(timer);
    return () => {
      clearTimeout(timer);
    };
  }, [startTimeSeconds, endTimeSeconds, start, seconds]);

  return { seconds, startTimer, pauseTimer, clearTimer };
};
