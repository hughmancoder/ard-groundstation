import { Metric as TMetric } from "../types";

interface Props {
  metrics: TMetric;
  large?: boolean;
}

export const Metric: React.FC<Props> = ({ metrics, large = false }) => {
  const { title, value, unit } = metrics;
  return (
    <div className="flex flex-col">
      <span className="text-gray-600">{title}</span>
      <span className={large ? "text-3xl" : "text-lg"}>
        {value} {unit}
      </span>
    </div>
    );
};