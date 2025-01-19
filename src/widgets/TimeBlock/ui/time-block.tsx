import { Time } from "@/features/TestMode/ui/test-mode";
import { ProgressBar } from "@/shared/ui/progress-bar";

export const TimeBlock = ({
  timer,
  barWidth,
  seconds,
}: {
  timer: Time | number | string;
  barWidth: number | undefined;
  seconds: number;
}) => {
  return (
    <div>
      <div>Time: {timer}s</div>
      <div
        style={{
          width: `calc(${barWidth && barWidth / 2}px - 2.6rem)`,
        }}
        className="text-center  "
      >
        {+timer - seconds}s
      </div>
      <ProgressBar
        reversed
        percent={seconds / (Number(timer) + 1)}
        barWidth={
          (barWidth && (timer === "No limit" ? barWidth : barWidth / 2)) ?? 200
        }
      />
    </div>
  );
};
