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
  color = "yellow"
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-gray-300">{title}</h2>

      <ResponsiveContainer width={400} height={150}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            tick={{ fill: "white" }}
            domain={['auto', 'auto']}
          />
          <YAxis
            tick={{ fill: "white" }}
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
  );
};

