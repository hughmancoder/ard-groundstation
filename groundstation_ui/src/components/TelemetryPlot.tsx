import { TelemetryData } from "@/types";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type ChartData = Record<string, number>;

interface TelemetryPlotProps {
  data: TelemetryData[];
  title: string;
  dataKey: keyof TelemetryData;
  color?: string;
}

export const TelemetryPlot: React.FC<TelemetryPlotProps> = ({
  data,
  title,
  dataKey,
  color = "yellow",
}) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-center text-gray-300 text-sm sm:text-base">{title}</h2>
      <div className="w-full h-40 sm:h-48 md:h-56">
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tick={{ fill: "white", fontSize: 10 }}
              domain={['auto', 'auto']}
            />
            <YAxis
              tick={{ fill: "white", fontSize: 10 }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "black", borderColor: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};