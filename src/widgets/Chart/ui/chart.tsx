"use client";

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
} from "chart.js";
import { useResize } from "@/shared/hooks/use-resize";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

interface ChartComponentProps {
  labels: string[];
  data: number[];
  yTitle?: string;
  testedData: string;
}

export const Chart: FC<ChartComponentProps> = ({
  labels,
  data,
  yTitle,
  testedData,
}) => {
  const chartContainerRef = useRef<any>(null);
  const chartRef = useRef<any>(null);

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: testedData,
          data,
          borderColor: "rgba(74, 110, 208, 0.804)",
          backgroundColor: "rgb(255, 252, 252)",
          tension: 0.4,
        },
      ],
    };
  }, [labels, data]);

  const chartOptions: any = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "category",
          title: {
            display: false,
            text: "Date",
          },
          ticks: {
            display: false,
            autoSkip: true,
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0,
          },
          grid: {
            display: true,
            color: "rgba(134, 134, 134, 0.3)",
            lineWidth: 1,
          },
          angle: 0,
        },
        y: {
          title: {
            display: true,
            text: yTitle,
          },
          grid: {
            display: true,
            color: "rgba(134, 134, 134, 0.3)",
            lineWidth: 1,
          },
        },
      },
    };
  }, [yTitle]);

  return (
    <div ref={chartContainerRef} className="max-w-[100%] max-h-[100%]">
      <Line
        redraw
        ref={chartRef}
        className="max-w-[100%] max-h-[100%]"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};
