import { useEffect, useState } from "react";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import { defaultTelemetryData, Status, TelemetryData } from "./types";
import { Metric } from "./components/Metric";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./components/ui/button";
import { fetchEndpoint } from "./fetch";
import { socket } from "./socket";

function App() {
  type View = "telemetry" | "settings";
  const [view, setView] = useState<View>("telemetry");
  const [ports, setPorts] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [portStatus, setSelectedPortStatus] = useState<Status>("disconnected");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

  const latestTelemetryData : TelemetryData = telemetryData[telemetryData.length - 1] || defaultTelemetryData;
  const rotationAngle = latestTelemetryData?.angVelZ || 0;
  const time = latestTelemetryData?.time || 0;
  const altitude = latestTelemetryData?.altitude || 0;

  useEffect(() => {
    const MAX_DATA_POINTS = 1000; 
  
    const handleTelemetryData = (data: any) => {
      if (data.error) {
        console.error("Telemetry Error:", data.error);
      } else {
        setTelemetryData((prevData) => {
          const newData = [...prevData, data];
          if (newData.length > MAX_DATA_POINTS) {
            // Remove the oldest data points
            newData.splice(0, newData.length - MAX_DATA_POINTS);
          }
          return newData;
        });
      }
    };
  
    // WebSocket event listener
    socket.on("telemetry_data", handleTelemetryData);
  
    return () => {
      // Cleanup listener on unmount
      socket.off("telemetry_data", handleTelemetryData);
    };
  }, []);

  const fetchPorts = async () => {
    try {
      const data = await fetchEndpoint("/ports");
      setPorts(data.ports || []);
      if (portStatus === "disconnected") setSelectedPortStatus("awaiting");
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

  const openPort = async () => {
    if (!selectedPort) {
      console.error("No port selected!");
      return false;
    }

    try {
      // Set the serial port
      const setPortResponse = await fetchEndpoint("/set_port", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ port: selectedPort }),
      });

      if (!setPortResponse.success) {
        console.error("Failed to set port:", setPortResponse.error);
        return false;
      }

      // Open the serial port
      const openPortResponse = await fetchEndpoint("/open_port", {
        method: "POST",
      });

      if (openPortResponse.success) {
        console.log("Port opened successfully");
        setSelectedPortStatus("connected");
        setIsConnected(true);

        // Connect the WebSocket if not already connected
        if (!socket.connected) {
          socket.connect();
        }

        // Start telemetry automatically
        console.log("Requesting telemetry data...");
        socket.emit("request_telemetry");

        return true;
      } else {
        console.error("Failed to open port:", openPortResponse.error);
        return false;
      }
    } catch (error) {
      console.error("Error opening port:", error);
      return false;
    }
  };

  const closePort = async () => {
    try {
      const data = await fetchEndpoint("/stop_port", {
        method: "POST",
      });

      if (data.success) {
        console.log(data.message);
        setSelectedPortStatus("disconnected");
        setIsConnected(false);

        // Disconnect the WebSocket
        if (socket.connected) {
          socket.disconnect();
        }

        return true;
      } else {
        console.error("Failed to disconnect:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Error disconnecting port:", error);
      return false;
    }
  };

  const handlePortConnectToggle = async () => {
    setIsLoading(true);
    try {
      if (isConnected) {
        const success = await closePort();
        if (success) {
          
          setTelemetryData([]);
        }
      } else {
        const success = await openPort();
        if (!success) {
          setSelectedPortStatus("disconnected");
        }
      }
    } catch (error) {
      console.error("Error toggling port connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full h-screen px-12 pt-10 font-sans bg-cover border-blue-900 bg-blue-900"
        style={{
          backgroundImage: view === "telemetry" ? `url('/img/background.png')` : "none",
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 to-transparent" />

        <div>
          <div className="flex items-start mt-4">
            <LeftPane data={latestTelemetryData} status={portStatus}/>
            <div className="flex w-full flex-col px-16 pt-6 relative">
              {view === "telemetry" && (
                <>
                  <div className="grid grid-cols-3 pt-8">
                    <div className="flex justify-center">
                      <Metric
                        large
                        metrics={{ title: "Time", value: time, unit: "s" }}
                      />
                    </div>
                    <div></div>
                    <div className="flex justify-center">
                      <Metric
                        large
                        metrics={{ title: "Altitude", value: altitude.toFixed(2), unit: "m" }}
                      />
                    </div>
                  </div>

                  <div className="absolute flex flex-col justify-center -translate-x-1/2 left-1/2 top-4">
                    <img
                      className="w-[145px] h-auto"
                      src="/img/rocket.png"
                      alt=""
                      style={{
                        transform: `rotate(${rotationAngle}deg)`,
                      }}
                    />
                  </div>
                </>
              )}
              {view === "settings" && (
                <div className="pt-8 px-16">
                  {/* <div className="mb-2">
                    <strong>Status:</strong> {portStatus}
                  </div>
                  <div className="mb-4">
                    <strong>Selected Port:</strong> {selectedPort}
                  </div> */}
                  <Select
                    value={selectedPort ?? ""}
                    onOpenChange={() => fetchPorts()}
                    onValueChange={(value) => setSelectedPort(value)}
                  >
                    <SelectTrigger className="w-full text-black">
                      <SelectValue placeholder="Select a serial port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Serial Ports</SelectLabel>
                        {ports.map((port, index) => (
                          <SelectItem key={index} value={port}>
                            {port}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-4 mt-4">
                    <Button
                      onClick={fetchPorts}
                      className="bg-gray-700 hover:bg-gray-800"
                    >
                      Refresh Ports
                    </Button>
                    <Button
                      onClick={handlePortConnectToggle}
                      disabled={isLoading || !selectedPort}
                      className={`text-white ${
                        selectedPort
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                  <div className="mt-4">
                    <strong>Telemetry Data</strong>
                    <pre className="bg-gray-900 p-2 rounded max-h-80 overflow-y-auto">
                      {JSON.stringify(telemetryData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            <RightPane data={latestTelemetryData} />
          </div>
          <div className="fixed bottom-20 left-10 flex justify-between pt-4">
            <div className="flex items-center w-80 text-gray-800">
              <button
                onClick={() => setView("telemetry")}
                className={`relative px-8 text-sm font-bold uppercase rounded ${
                  view === "telemetry"
                    ? "bg-white text-gray z-10 py-6"
                    : "bg-gray-900 bg-opacity-[0.1] text-white border py-4"
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setView("settings")}
                className={`relative -translate-x-1 px-8 border rounded text-sm font-bold uppercase ${
                  view === "settings"
                    ? "bg-white text-gray z-10 py-6"
                    : "bg-gray-900 bg-opacity-[0.1] text-white py-4"
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
