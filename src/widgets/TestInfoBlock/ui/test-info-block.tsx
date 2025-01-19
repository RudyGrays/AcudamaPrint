import { Time } from "@/features/TestMode/ui/test-mode";
import { ProgressBar } from "@/shared/ui/progress-bar";

export const TestInfoBlock = ({
  accuracy,
  barWidth,
  timer,
  progress,
  valuesLength,
  currentChar,
}: {
  accuracy: number;
  barWidth: number | undefined;
  currentChar: string;
  progress: number;
  timer: Time | number | string;
  valuesLength: number;
}) => {
  return (
    <div>
      <div>Accuracy: {Math.trunc(100 * accuracy)}%</div>
      <div
        style={{
          width: `calc(${
            barWidth && (timer === "No limit" ? barWidth : barWidth / 2)
          }px - 2.6rem)`,
        }}
        className="text-center  "
      >
        {currentChar}
      </div>
      <ProgressBar
        percent={Math.round((progress / (valuesLength + 7)) * 100) / 100}
        barWidth={
          (barWidth && (timer === "No limit" ? barWidth : barWidth / 2)) ?? 200
        }
      />
    </div>
  );
};
