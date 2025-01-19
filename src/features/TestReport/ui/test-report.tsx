import { CharsArea } from "@/features/CharsArea/ui/chars-area";
import { PassedTestReport } from "../model/types/test-report-types";
import { ArrowRight, RotateCcw } from "lucide-react";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageAnimationContainer } from "@/widgets/PageAnimationContainer/ui/page-animation-container";
import { useUserTestsInfo } from "@/features/TestsInfo/model/store/tests-info";

export const TestReport = ({
  testReport: { accuracy, cpm, problemChars, words, wpm, printedChars },
  restartTest,
}: {
  testReport: PassedTestReport;
  restartTest?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const mappedProblemChars = problemChars
    .reduce((acc: string[], value) => {
      if (acc.find((word) => word === value)) return acc;
      acc.push(value);

      return acc;
    }, [])
    .sort();

  const progressBarWrapper = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setProgress(accuracy);
    }, 400);
  }, []);

  return (
    <div
      className={
        "flex flex-col max-w-[600px] gap-2 " +
        ` transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        } `
      }
    >
      <div className="flex gap-2">
        <div className="flex flex-col shrink w-[20%] items-center justify-center gap-2 bg-secondary p-2 rounded">
          <span className="text-[0.7rem] w-full flex justify-start">WPM</span>
          <span>{wpm}</span>
        </div>
        <div className="flex flex-col grow items-center justify-center gap-2 bg-secondary p-2 rounded">
          <span className="text-[0.7rem] w-full flex justify-start">
            Tested Words
          </span>
          <CharsArea
            values={words}
            printedChars={printedChars}
            currentValueIdx={printedChars.length}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col shrink w-[20%] items-center justify-center gap-2 bg-secondary p-2 rounded">
          <span className="text-[0.7rem] w-full flex justify-start">CPM</span>
          <span>{cpm}</span>
        </div>
        <div className="grow bg-secondary p-2 rounded">
          <span className="text-[0.7rem] w-full flex justify-start">
            Problem Chars
          </span>
          {!!mappedProblemChars.length ? (
            <CharsArea values={mappedProblemChars} />
          ) : (
            "No problems"
          )}
        </div>
      </div>
      <div>
        <div
          ref={progressBarWrapper}
          className="flex flex-col items-center justify-center gap-2 bg-secondary p-5 rounded"
        >
          <span className="text-[0.7rem] w-full flex justify-start">
            ACCURACY
          </span>
          <span>{Math.trunc(100 * accuracy)}%</span>
          <ProgressBar percent={progress} />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <button
          onClick={restartTest}
          className="grow flex items-center justify-center py-2 rounded bg-blue-600"
        >
          <RotateCcw className="transition-all hover:rotate-[-45deg]" />
        </button>
        <button className="grow flex items-center justify-center py-2 rounded bg-blue-600">
          <ArrowRight className="transition-all hover:rotate-[-45deg]" />
        </button>
      </div>
    </div>
  );
};
