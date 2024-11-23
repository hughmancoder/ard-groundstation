import React from "react";
import { TelemetryData } from "../types";

const RightMetrics: React.FC<{ data: TelemetryData }> = ({ data }) => {
  const calculateProgress = (value: number, max: number) =>
    (Math.min(value, max) / max) * 100;
  return (
    <div className="flex flex-col text-right space-y-4 ">
      {[
        { label: "Acc X", value: data.accX, unit: "m/s²", max: 10 },
        { label: "Acc Y", value: data.accY, unit: "m/s²", max: 10 },
        { label: "Acc Z", value: data.accZ, unit: "m/s²", max: 10 },
        { label: "Angular Vel X", value: data.angVelX, unit: "°/s", max: 360 },
        { label: "Angular Vel Y", value: data.angVelY, unit: "°/s", max: 360 },
        { label: "Angular Vel Z", value: data.angVelZ, unit: "°/s", max: 360 },
      ].map((item, index) => (
        <div key={index} className="flex flex-col space-y-2 text-left">
          <p className="text-sm">{item.label}</p>

          {/* Bar and Metric Value */}
          <div className="flex items-center">
            {/* Progress Bar */}
            <div className="w-[140px] h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${calculateProgress(item.value, item.max)}%`,
                }}
              />
            </div>

            {/* Metric Value */}
            <p className="ml-4 mr-2 text-sm font-bold">
              {item.value.toFixed(2)}
            </p>
            <p>{item.unit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightMetrics;
