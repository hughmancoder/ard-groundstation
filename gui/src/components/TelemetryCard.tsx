import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { defaultData, TelemetryData } from "../types";
import RocketSVG from "../assets/RocketSVG";

interface TelemetryCardProps {
  data: TelemetryData | null;
}

const TelemetryCard: React.FC<TelemetryCardProps> = ({ data }) => {
  data = data ?? defaultData;
  const rotationDegrees = data.angVelZ;

  return (
    <>
      T+{data.time.toFixed(2)}s
      {[
        { label: "BMP Temp", value: `${data.bmpTemp.toFixed(1)}°C` },
        { label: "IMU Temp", value: `${data.imuTemp.toFixed(1)}°C` },
        { label: "Pressure", value: `${data.pressure.toFixed(2)} hPa` },
        { label: "Altitude", value: `${data.altitude.toFixed(1)} m` },
      ].map((item, idx) => (
        <div key={idx} className="flex justify-between text-sm">
          <span className="font-semibold uppercase">{item.label}:</span>
          <span>{item.value}</span>
        </div>
      ))}
      <div className="text-sm font-semibold mt-2 uppercase">
        Acceleration (m/s²):
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {["X", "Y", "Z"].map((axis, idx) => (
          <div key={axis}>
            <span className="block text-xs uppercase">{axis}</span>
            <span>
              {idx === 0
                ? data.accX.toFixed(2)
                : idx === 1
                ? data.accY.toFixed(2)
                : data.accZ.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div
          style={{
            transform: `rotate(${rotationDegrees + 90}deg)`,
            transition: "transform 0.2s linear",
          }}
          className="w-16 h-16"
        >
          <RocketSVG />
        </div>
      </div>
    </>
  );
};

export default TelemetryCard;
