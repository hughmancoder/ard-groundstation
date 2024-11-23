import React from "react";
import rocketImage from "../assets/rocket.png";
import { TelemetryData } from "../types";

const CenterPanel: React.FC<{ data: TelemetryData }> = ({ data }) => {
  const rotationAngle = data.angVelZ;
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-between space-x-20">
        <div className="flex flex-row items-center">
          <p className="text-xl ">T+{data.time}s</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-xl  mr-2">Altitude:</p>
          <p className="text-xl text-gray-300">{data.altitude.toFixed(2)} m</p>
        </div>
      </div>

      {/* Rocket Model */}
      <div className="w-full flex justify-center">
        <div className="relative w-[80px]">
          <img
            src={rocketImage}
            alt="Rocket"
            className="relative z-20"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[180px] pointer-events-none z-10"
            style={{
              width: "800px",
              height: "140px",
              background:
                "radial-gradient(ellipse, rgba(132, 135, 172, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
              filter: "blur(50px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
