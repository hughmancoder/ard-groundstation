import { Metric } from "../types";

  interface Props  {
    metrics: Metric;
  };
  
  export const Metrics= ({ metrics } : Props) => {
    const { title, value, unit } = metrics;
    return (
      <div className="flex flex-col items-center justify-center pt-3 text-white">
        <span className="text-gray-600">{title}</span>
        <span className="text-2xl">
          {value} {unit}
        </span>
      </div>
    );