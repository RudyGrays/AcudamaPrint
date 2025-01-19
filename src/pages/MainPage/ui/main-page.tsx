"use client";
import { simpleWords } from "@/features/CharsArea/model/constants/words";
import { getRandomSentence } from "@/features/CharsArea/model/helpers/getRandomSentence";
import { getRandomWords } from "@/features/CharsArea/model/helpers/getRandomWords";
import {
  SentenceType,
  TestMode,
  Time,
  WordCount,
} from "@/features/TestMode/ui/test-mode";
import { PassedTestReport } from "@/features/TestReport/model/types/test-report-types";
import { TestReport } from "@/features/TestReport/ui/test-report";
import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { PageAnimationContainer } from "@/widgets/PageAnimationContainer/ui/page-animation-container";
import { TypingContainer } from "@/widgets/TypingContainer/ui/typing-container";
import { SquareMousePointer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CursorZone } from "./cursor-zone";
import {
  CurrentTestResult,
  useUserTestsInfo,
} from "@/features/TestsInfo/model/store/tests-info";

export const MainPage = () => {
  const [testPassed, setTestPassed] = useState(false);
  const isLess600 = useCustomSize(600);
  const [passedTestReport, setPassedTestReport] = useState<
    PassedTestReport | undefined
  >();

  const [sentence, setSentence] = useState<string[]>([""]);
  const [wordCount, setWordCount] = useState<WordCount>(15);
  const [testType, setTestType] = useState<SentenceType>("words");
  const [time, setTime] = useState<Time>("No limit");
  const [isPaused, setIsPaused] = useState(false);
  const [canPause, setCanPause] = useState(() => time !== "No limit");
  const setUserInfoData = useUserTestsInfo((state) => state.setInfo);

  const canPauseHandler = useCallback(
    (seconds: number) => {
      if (time !== "No limit" && seconds !== 0) {
        setCanPause(true);
      } else {
        setCanPause(false);
      }
    },
    [time]
  );

  const resetTestHandler = useCallback(() => {
    setSentence(() => {
      if (testType === "sentences") {
        return getRandomSentence(wordCount);
      }
      return getRandomWords(wordCount, simpleWords);
    });
  }, [wordCount, testType]);

  const setPauseHandler = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const setTimeHandler = useCallback((value: Time) => {
    setTime(value);
  }, []);

  const setTestTypeHandler = useCallback((value: SentenceType) => {
    setTestType(value);
  }, []);

  const setWordCountHandler = useCallback((value: WordCount) => {
    setWordCount(value);
  }, []);

  const testPassedHandler = useCallback((data: PassedTestReport) => {
    setTestPassed(true);
    const mappedProblemChars = data.problemChars

      .reduce((acc: string[], value) => {
        if (acc.find((word) => word === value)) return acc;
        acc.push(value);

        return acc;
      }, [])
      .sort();

    const testResult: CurrentTestResult = {
      accuracy: data.accuracy,
      cpm: data.cpm,
      problemChars: mappedProblemChars,
      wpm: data.wpm,
    };
    setUserInfoData(testResult);
    setPassedTestReport(data);
  }, []);

  const restartTestHandler = useCallback(() => {
    setTestPassed(false);
    setPassedTestReport(undefined);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSentence(getRandomWords(15, simpleWords));
    }
  }, []);

  useEffect(() => {
    setSentence((_) => {
      if (testType === "sentences") return getRandomSentence(wordCount);
      return getRandomWords(wordCount, simpleWords);
    });
  }, [wordCount, testType]);

  const focusWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <PageAnimationContainer>
      <div className="h-full  w-full flex items-center justify-center flex-col relative">
        {!testPassed ? (
          <div
            ref={focusWrapperRef}
            style={{ borderColor: "rgba(219, 219, 219, 0.1)" }}
            className={
              "absolute  flex  items-center justify-center flex-col translate-y-[-50%] z-5 p-3 top-1/2  left-[0%] bottom-[5%] right-[0%] border border-dashed mx-auto h-[80%] max-h-[700px]  max-w-[1000px] rounded-2xl"
            }
          >
            <CursorZone isLess600={isLess600} />
            {!testPassed && (
              <div className="w-[96%] max-w-[600px] relative z-6 flex flex-col  justify-center items-center mb-3 gap-2">
                <div className="w-full flex justify-center   ">
                  <TestMode
                    canPause={canPause}
                    isPaused={isPaused}
                    pauseHandler={setPauseHandler}
                    selectedTime={time}
                    setTimeHandler={setTimeHandler}
                    setTestTypeHandler={setTestTypeHandler}
                    setTestWordCountHandler={setWordCountHandler}
                    selectedSentenceType={testType}
                    selectedWordCount={wordCount}
                    resetTest={resetTestHandler}
                  />
                </div>
              </div>
            )}
            <span className="w-full max-w-[600px] border-b border-dashed my-2" />
            <TypingContainer
              canPauseHandler={canPauseHandler}
              isPaused={isPaused}
              timer={time}
              focusWrapperRef={focusWrapperRef}
              testPassedHandler={testPassedHandler}
              initialValues={sentence}
            />
          </div>
        ) : (
          <TestReport
            testReport={passedTestReport!}
            restartTest={restartTestHandler}
          />
        )}
      </div>
    </PageAnimationContainer>
  );
};
