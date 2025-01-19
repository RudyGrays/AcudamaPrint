export const ProgressBar = ({
  percent = 0,
  barWidth = 300,
  reversed = false,
}: {
  percent: number;
  barWidth?: number;
  reversed?: boolean;
}) => {
  const progressWidth = barWidth * percent;

  return (
    <div
      style={{ width: `calc(${barWidth}px - 2.6rem)` }}
      className={
        " h-2 rounded flex " +
        ` ${reversed ? " bg-blue-700 flex-row-reverse " : " bg-white "} `
      }
    >
      <div
        style={{ width: `${progressWidth}px`, transition: "1s" }}
        className={
          " rounded  h-full shadow-[0_4px_6px_0px_rgba(7, 17, 206, 0.989)] " +
          `${reversed ? " bg-white " : " bg-blue-700 "}`
        }
      />
    </div>
  );
};
