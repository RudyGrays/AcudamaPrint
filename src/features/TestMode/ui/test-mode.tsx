"use client";

import { Pause, PlayIcon, RotateCcw } from "lucide-react";
import { Play } from "next/font/google";
import { FC } from "react";

export type SentenceType = "sentences" | "words";
export type WordCount = 15 | 30 | 50 | 100;
export type Time = 15 | 30 | 60 | "No limit";
interface TestModeProps {
  setTestTypeHandler: (wordType: SentenceType) => void;
  setTestWordCountHandler: (wordCount: WordCount) => void;
  setTimeHandler: (time: Time) => void;
  resetTest: () => void;
  selectedWordCount: WordCount;
  selectedSentenceType: SentenceType;
  selectedTime: Time;
  pauseHandler: () => void;
  isPaused: boolean;
  canPause: boolean;
}

export const TestMode: FC<TestModeProps> = ({
  setTestTypeHandler,
  setTestWordCountHandler,
  setTimeHandler,
  resetTest,
  pauseHandler,
  selectedWordCount,
  selectedSentenceType,
  selectedTime,
  isPaused,
  canPause,
}) => {
  const wordCounts: WordCount[] = [15, 30, 50, 100];
  const times: Time[] = ["No limit", 15, 30, 60];

  const sentenceTypes: SentenceType[] = ["words", "sentences"];
  return (
    <div className="flex w-full  gap-5 flex-wrap justify-center items-center ">
      <div className="w-full flex gap-4 justify-between flex-wrap ">
        <div className=" flex gap-1 flex-col">
          <div className="text-[0.9rem] text-center">Words count</div>
          <div className="flex flex-wrap gap-1">
            {wordCounts.map((wordCount) => {
              return (
                <button
                  className={
                    " w-[30px] text-[0.7rem]  border p-1 rounded" +
                    ` ${
                      selectedWordCount === wordCount
                        ? " bg-foreground text-secondary "
                        : " bg-secondary text-foreground"
                    } `
                  }
                  key={wordCount}
                  onClick={() => setTestWordCountHandler(wordCount)}
                >
                  {wordCount}
                </button>
              );
            })}
          </div>
        </div>
        <div className=" flex gap-1 flex-col">
          <div className="text-[0.9rem] text-center">Test type</div>
          <div className="flex flex-wrap gap-1">
            {sentenceTypes.map((sentenceType) => {
              return (
                <button
                  className={
                    "text-[0.7rem] border  p-1 rounded" +
                    ` ${
                      selectedSentenceType === sentenceType
                        ? " bg-foreground text-secondary "
                        : " bg-secondary text-foreground"
                    } `
                  }
                  key={sentenceType}
                  onClick={() => setTestTypeHandler(sentenceType)}
                >
                  {sentenceType}
                </button>
              );
            })}
          </div>
        </div>
        <div className=" flex gap-1 flex-col">
          <div className="text-[0.9rem] text-center">Timer</div>
          <div className="flex flex-wrap gap-1">
            {times.map((time) => {
              return (
                <button
                  className={
                    "text-[0.7rem] border  p-1 rounded" +
                    ` ${
                      selectedTime === time
                        ? " bg-foreground text-secondary "
                        : " bg-secondary text-foreground"
                    } `
                  }
                  key={time}
                  onClick={() => setTimeHandler(time)}
                >
                  {time}
                </button>
              );
            })}
            {canPause && (
              <button
                onClick={pauseHandler}
                className="bg-secondary  border text-foreground  rounded"
              >
                {isPaused ? (
                  <PlayIcon className="h-[0.9rem]" />
                ) : (
                  <Pause className="h-[0.9rem]" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className=" flex gap-1 flex-col-reverse">
          <button
            onClick={resetTest}
            className="bg-secondary h-1/2 text-[0.9rem] border text-foreground p-1 rounded"
          >
            <RotateCcw className="h-full transition-all hover:rotate-[-45deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};
