"use client";

import { Time } from "@/features/TestMode/ui/test-mode";
import { PassedTestReport } from "@/features/TestReport/model/types/test-report-types";
import { useTimer } from "@/shared/hooks/useTimer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useTimerActions = (
  timer: Time | number | string,
  isPaused: boolean,
  chars: string[],
  setChars: Dispatch<SetStateAction<string[]>>,
  canPauseHandler: (seconds: number) => void,
  testPassedHandler: (testReport: PassedTestReport) => void,
  testInfo: PassedTestReport
) => {
  const { clearTimer, pauseTimer, seconds, startTimer } = useTimer(
    0,
    timer as number
  );
  const [timerIsStarted, setTimerIsStarted] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (timerIsStarted && chars.length === 0) {
      setTimerIsStarted(false);
      clearTimer();
    }
    if (timer === "No limit" || chars.length === 0 || timerIsStarted) return;

    startTimer();
    setTimerIsStarted(true);
  }, [timer, chars]);

  useEffect(() => {
    setChars([]);
  }, [timer]);

  useEffect(() => {
    canPauseHandler(seconds);

    if (+timer - seconds === 0) return testPassedHandler(testInfo);
  }, [seconds]);

  useEffect(() => {
    if (!timerIsStarted) return;
    if (isPaused) {
      pauseTimer();
    }
    if (!isPaused) {
      startTimer();
    }
  }, [isPaused, timerIsStarted]);

  return {
    seconds,
  };
};
