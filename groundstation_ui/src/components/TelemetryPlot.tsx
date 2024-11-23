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

type TelemetryPlotProps = {
  data: ChartData[];
  title: string;
};

export const TelemetryPlot: React.FC<TelemetryPlotProps> = ({
  data,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-gray-300">{title}</h2>

      <ResponsiveContainer width={250} height={120}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            tick={{ fill: "white" }} // Makes tick text white
          />
          <YAxis
            tick={{ fill: "white" }} // Makes tick text white
          />
          <Tooltip
            contentStyle={{ backgroundColor: "black", borderColor: "white" }}
            itemStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="bmpTemp"
            stroke="yellow"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
