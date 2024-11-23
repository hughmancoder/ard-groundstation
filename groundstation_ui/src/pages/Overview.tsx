import React from "react";
import LeftMetrics from "../components/LeftMetrics";
import CenterPanel from "../components/CenterPanel";
import RightMetrics from "../components/RightMetrics";
import { defaultTelemetryData } from "../types";
import { useTelemetry } from "../context/TelemetryProvider";

const Overview: React.FC = () => {
  const { latestTelemetry } = useTelemetry();
  return (
    <div className="flex flex-col justify-between space-x-8">
      <div className="uppercase text-center text-2xl py-5">Rocket Overview</div>
      <div className="relative flex justify-between items-center mx-auto px-20">
        <LeftMetrics data={latestTelemetry ?? defaultTelemetryData} />
        <CenterPanel data={latestTelemetry ?? defaultTelemetryData} />
        <RightMetrics data={latestTelemetry ?? defaultTelemetryData} />
      </div>
    </div>
  );
};

export default Overview;
