import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { TelemetryData } from "../types";

const BASE_URL = "http://localhost:5000";
const socket = io(BASE_URL);

// Telemetry Context
const TelemetryContext = createContext({
  telemetryData: [] as TelemetryData[],
  latestTelemetry: null as TelemetryData | null,
  ports: [] as string[],
  selectedPort: "",
  setSelectedPort: (port: string) => {},
  setPorts: (ports: string[]) => {}, // Added setPorts here
  connectPort: async () => {},
  disconnectPort: async () => {},
});

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [ports, setPorts] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string>("");

  useEffect(() => {
    socket.on("telemetry_data", (data: TelemetryData) => {
      setTelemetryData((prevData) => {
        const updatedData = [...prevData, data];
        if (updatedData.length > 100) updatedData.shift();
        return updatedData;
      });
    });

    return () => {
      socket.off("telemetry_data");
    };
  }, []);

  const connectPort = async () => {
    if (!selectedPort) {
      alert("Please select a port");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/set_port`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ port: selectedPort }),
      });
      const result = await response.json();
      if (result.success) {
        socket.emit("request_telemetry");
      } else {
        alert("Error setting port");
      }
    } catch (error) {
      console.error("Error connecting port:", error);
    }
  };

  const disconnectPort = async () => {
    try {
      await fetch(`${BASE_URL}/stop_port`, { method: "POST" });
      setTelemetryData([]);
    } catch (error) {
      console.error("Error disconnecting port:", error);
    }
  };

  return (
    <TelemetryContext.Provider
      value={{
        telemetryData,
        latestTelemetry: telemetryData[telemetryData.length - 1] || null,
        ports,
        setPorts, // Provided setPorts here
        selectedPort,
        setSelectedPort,
        connectPort,
        disconnectPort,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => useContext(TelemetryContext);
