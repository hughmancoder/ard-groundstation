import React from "react";
import { TelemetryData } from "../types";
import { useTelemetry } from "../context/TelemetryProvider";

const LeftMetrics: React.FC<{ data: TelemetryData }> = ({ data }) => {

  const {
    
    selectedPort,
  } = useTelemetry();
  const isSerialPortConnected = selectedPort != "";

  return (
    <div className="flex flex-col text-left space-y-8">
      {/* Remove */}
      <div>{selectedPort}</div>
      {/* Sensor Data */}
      <div className="space-y-8">
        {[
          { label: "BMP Temperature", value: `${data.bmpTemp.toFixed(2)} °C` },
          { label: "IMU Temperature", value: `${data.imuTemp.toFixed(2)} °C` },
          { label: "Pressure", value: `${data.pressure.toFixed(2)} hPa` },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="text-sm pr-10 text-gray-300">{item.label}</p>
            <p className="text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Status Items */}
      {/* TODO */}
      {[
        { label: "Serial Port", status: selectedPort ?? "disconnected", completed: isSerialPortConnected },
        { label: "Sensor Status", status: "Recording", completed: false },
      ].map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              item.completed ? "bg-green-500" : "bg-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={"M5 13l4 4L19 7"}
              />
            </svg>
          </div>

          {/* Label and Status */}
          <div className="flex flex-col">
            <p className="text-sm font-bold">{item.label}</p>
            <p className="text-xs text-gray-400">{item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftMetrics;
