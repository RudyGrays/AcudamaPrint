"use client";

import { CharsArea } from "@/features/CharsArea/ui/chars-area";
import { TestMode, Time } from "@/features/TestMode/ui/test-mode";
import { PassedTestReport } from "@/features/TestReport/model/types/test-report-types";
import { useCombinedRef } from "@/shared/hooks/useCombinedRef";
import { useHover } from "@/shared/hooks/useHover";
import { useThrottle } from "@/shared/hooks/useThrottle";
import { useTimer } from "@/shared/hooks/useTimer";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { TimeBlock } from "@/widgets/TimeBlock/ui/time-block";
import { time } from "console";
import {
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PressStartWrapper } from "./press-start-wrapper";
import { TestInfoBlock } from "@/widgets/TestInfoBlock/ui/test-info-block";
import { usePrintChars } from "../model/hooks/use-print-chars";
import { useTestInfo } from "../model/hooks/use-test-info";
import { useTimerActions } from "../model/hooks/use-timer-actions";
import { useResize } from "@/shared/hooks/use-resize";

interface TypingContainerProps {
  initialValues: string[];
  testPassedHandler: (testReport: PassedTestReport) => void;
  focusWrapperRef: RefObject<HTMLDivElement | null>;
  timer: Time | number | string;
  isPaused: boolean;
  canPauseHandler: (seconds: number) => void;
}

export const TypingContainer: FC<TypingContainerProps> = memo(
  ({
    initialValues,
    testPassedHandler,
    focusWrapperRef,
    timer,
    isPaused,
    canPauseHandler,
  }) => {
    const writeZoneIsHovered = useHover(focusWrapperRef);
    const [focus, setFocus] = useState(true);

    const { chars, setChars, mappedValues } = usePrintChars(
      isPaused,
      writeZoneIsHovered,
      initialValues,
      focus
    );

    const { accuracy, problemChars, words, charsWithoutSpace } = useTestInfo(
      mappedValues,
      chars,
      initialValues
    );

    const [barWidth, setBarWidth] = useState<number | undefined>(undefined);

    const progressBarWrapper = useRef<HTMLDivElement>(null);

    const focusHandler = useCallback(() => {
      if (!writeZoneIsHovered) {
        setFocus(false);
      } else {
      }
    }, [writeZoneIsHovered]);

    const throttledFn = useThrottle(2500, focusHandler);

    useEffect(() => {
      if (focus === false) {
        setChars([]);
      }
    }, [focus]);

    useEffect(() => {
      throttledFn();
    }, [throttledFn]);

    const { seconds: seconds2, startTimer, clearTimer } = useTimer(0);

    useEffect(() => {
      if (chars.length > 0 && seconds2 === 0) return startTimer();
      if (chars.length === 0) return clearTimer();
    }, [chars]);

    const testResult = useMemo(() => {
      const wpm = Math.round(words.length / (seconds2 / 60));
      const cpm = Math.round(charsWithoutSpace.length / (seconds2 / 60));

      return {
        accuracy: accuracy,
        cpm: cpm,
        wpm: wpm,
        problemChars: problemChars,
        words: mappedValues,
        printedChars: chars,
      };
    }, [accuracy, problemChars, mappedValues, charsWithoutSpace, words]);

    useEffect(() => {
      if (chars.length === mappedValues.length) testPassedHandler(testResult);
    }, [chars]);

    const setSidebarWidthHandler = useCallback(() => {
      if (progressBarWrapper.current)
        setBarWidth(progressBarWrapper.current.getBoundingClientRect().width);
    }, [progressBarWrapper.current]);

    useResize(progressBarWrapper, setSidebarWidthHandler);

    const { seconds } = useTimerActions(
      timer,
      isPaused,
      chars,
      setChars,
      canPauseHandler,
      testPassedHandler,
      testResult
    );

    return (
      <div
        className="w-[96%] z-3 h-min max-w-[600px]  p-5 flex flex-col gap-5 relative"
        ref={progressBarWrapper}
      >
        {!focus && <PressStartWrapper setFocus={setFocus} />}
        <div className="flex flex-col h-full gap-10">
          <div className="flex flex-col h-auto  ">
            <div className="flex w-full gap-1 justify-between">
              <TestInfoBlock
                valuesLength={mappedValues.length}
                accuracy={accuracy}
                barWidth={barWidth}
                currentChar={mappedValues[chars.length]}
                progress={chars.length}
                timer={timer}
              />
              {timer !== "No limit" && (
                <TimeBlock
                  barWidth={barWidth}
                  seconds={seconds}
                  timer={timer}
                />
              )}
            </div>
          </div>
          <div className="h-min ">
            <CharsArea
              values={mappedValues}
              currentValueIdx={chars.length}
              printedChars={chars}
            />
          </div>
        </div>
      </div>
    );
  }
);
