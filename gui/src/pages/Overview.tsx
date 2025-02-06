import React from "react";
import LeftMetrics from "../archive/LeftMetrics";
import CenterPanel from "../archive/CenterPanel";
import RightMetrics from "../archive/RightMetrics";
import { defaultTelemetryData } from "../types";
import { useTelemetry } from "../context/TelemetryProvider";

const Overview: React.FC = () => {
  const { latestTelemetry } = useTelemetry();
  return (
    <div className="">
     
    </div>
  );
};

export default Overview;
32