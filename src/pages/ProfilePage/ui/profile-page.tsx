"use client";

import { CharsArea } from "@/features/CharsArea/ui/chars-area";
import { calculateAVG } from "@/features/TestsInfo/model/helpers/calculateAvg";
import { useUserTestsInfo } from "@/features/TestsInfo/model/store/tests-info";
import { formatDate } from "@/shared/libs/fns/format-date";
import { Chart } from "@/widgets/Chart/ui/chart";
import { PageAnimationContainer } from "@/widgets/PageAnimationContainer/ui/page-animation-container";
import { useEffect, useMemo, useState } from "react";

export const ProfilePage = () => {
  const {
    avgAccuracy,
    avgWPM,
    problemChars,
    accuracyHistory,
    wpmHistory,
    avgCPM,
  } = useUserTestsInfo((state) => state.info);

  const [accuracyValue, setAccuracyValue] = useState<number[]>([]);
  const [accuracyLabels, setAccuracyLabels] = useState<string[]>([]);

  const [wpmValue, setWpmValue] = useState<number[]>([]);
  const [wpmLabels, setWpmLabels] = useState<string[]>([]);

  const accuracy = useMemo(() => {
    return !!avgAccuracy.length
      ? Math.round(calculateAVG(avgAccuracy) * 100)
      : 0;
  }, [avgAccuracy]);

  const bestAccuracy =
    Math.max(...avgAccuracy.map((value) => Math.round(value * 100))) | 0;

  const bestWPM = Math.max(...avgWPM) | 0;

  const wpm = useMemo(() => {
    return !!avgAccuracy.length ? Math.round(calculateAVG(avgWPM)) : 0;
  }, [avgWPM]);

  const cpm = useMemo(() => {
    return !!avgCPM.length ? Math.round(calculateAVG(avgCPM)) : 0;
  }, [avgCPM]);

  useEffect(() => {
    setAccuracyValue(accuracyHistory?.map((item) => item.value));
    setAccuracyLabels(accuracyHistory?.map((item) => formatDate(item.date)));
    setWpmValue(wpmHistory?.map((item) => item.value));
    setWpmLabels(wpmHistory?.map((item) => formatDate(item.date)));
  }, [wpmHistory, accuracyHistory]);

  return (
    <PageAnimationContainer>
      <div className="w-full flex h-full justify-center items-center">
        <div className="max-w-[800px] w-full flex flex-col gap-5">
          <div className="flex gap-2 flex-wrap">
            <div className="flex flex-col  grow items-center justify-center gap-2 bg-secondary p-2 rounded">
              <span className="text-[0.7rem] w-full flex justify-start">
                AWG WPM
              </span>
              <span>{wpm}</span>
            </div>
            <div className="flex flex-col grow  items-center justify-center gap-2 bg-secondary p-2 rounded">
              <span className="text-[0.7rem] w-full flex justify-start">
                AWG CPM
              </span>
              {cpm && <span>{cpm}</span>}
            </div>
            <div className="flex flex-col  grow items-center justify-center gap-2 bg-secondary p-2 rounded">
              <span className="text-[0.7rem] w-full flex justify-start">
                AWG Accuracy
              </span>
              {accuracy && <span>{accuracy}%</span>}
            </div>

            <div className="flex flex-col  grow items-center justify-center gap-2 bg-secondary p-2 rounded">
              <span className="text-[0.7rem] w-full flex justify-start">
                Best Accuracy
              </span>
              {bestAccuracy && <span>{bestAccuracy}%</span>}
            </div>
            <div className="flex flex-col grow  items-center justify-center gap-2 bg-secondary p-2 rounded">
              <span className="text-[0.7rem] w-full flex justify-start">
                Best WPM
              </span>
              {bestWPM && <span>{bestWPM}</span>}
            </div>
          </div>
          <div className="flex flex-col grow items-center justify-center gap-2 bg-secondary p-2 rounded">
            <span className="text-[0.7rem] w-full flex justify-start">
              Problem chars
            </span>
            {!problemChars.length ? "-" : <CharsArea values={problemChars} />}
          </div>
          <div className="flex  flex-col gap-5">
            <div className="w-full  border p-2 flex rounded flex-col gap-3">
              <div className="max-h-[200px] h-full">
                <Chart
                  data={accuracyValue}
                  labels={accuracyLabels}
                  yTitle="Accuracy"
                  testedData="Accuracy"
                />
              </div>
            </div>

            <div className="w-full  border p-2 rounded flex flex-col gap-3">
              <div className="max-h-[200px] h-full">
                <Chart
                  data={wpmValue}
                  labels={wpmLabels}
                  yTitle="WPM"
                  testedData="WPM"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageAnimationContainer>
  );
};
