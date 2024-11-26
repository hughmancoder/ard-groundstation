import React, { createContext, useContext, useState, useEffect } from "react";
import { TelemetryData, BASE_URL } from "../types";
import { io, Socket } from "socket.io-client";

// Define the type of the context
interface TelemetryContextType {
  telemetryData: TelemetryData[];
  latestTelemetry: TelemetryData | null;
  ports: string[];
  selectedPort: string;
  setSelectedPort: React.Dispatch<React.SetStateAction<string>>;
  setPorts: React.Dispatch<React.SetStateAction<string[]>>;
  connectPort: () => Promise<void>;
  disconnectPort: () => Promise<void>;
  fetchPorts: () => Promise<void>;
  isConnected: boolean;
}

// Create the context
const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

// Provider component
export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [ports, setPorts] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Initialize socket
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(BASE_URL, {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    // Clean up socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle telemetry data
  useEffect(() => {
    if (!socket) return;

    const handleTelemetry = (data: TelemetryData) => {
      setTelemetryData((prevData) => {
        const maxLength = 100;
        return prevData.length >= maxLength
          ? [...prevData.slice(1), data]
          : [...prevData, data];
      });
    };

    socket.on("telemetry_data", handleTelemetry);
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("telemetry_data", handleTelemetry);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  const fetchPorts = async () => {
    try {
      console.log("Fetching ports...");
      const response = await fetch(`${BASE_URL}/ports`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ports: ${response.statusText}`);
      }
      const data = await response.json();
      setPorts(data.ports || []);
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

 

  const connectPort = async () => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
  
    try {
      console.log("Connecting to port:", selectedPort);
  
      // Make the POST request to set the serial port
      const response = await fetch(`${BASE_URL}/set_port`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ port: selectedPort }),
      });
  
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to connect to port");
      } else {
        
        socket.connect();
        
        if (!socket || !socket.connected) {
          console.error("Socket is not connected");
          return;
        }

        console.log("Successfully connected to port:", selectedPort);
        socket.emit("request_telemetry");
      }
  
      
    } catch (error) {
      console.error("Error connecting to port:",  error);
    }
  };
  
  

  const disconnectPort = async () => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }

    try {
      await fetch(`${BASE_URL}/stop_port`, { method: "POST" });
      setTelemetryData([]);
      setSelectedPort("");
      socket.disconnect();
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
        setPorts,
        selectedPort,
        setSelectedPort,
        connectPort,
        disconnectPort,
        fetchPorts,
        isConnected,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

// Custom hook to use the Telemetry context
export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return context;
};
