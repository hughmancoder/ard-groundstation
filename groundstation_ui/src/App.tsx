import { useEffect, useState } from "react";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import {
  defaultTelemetryData,
  MAX_DATA_POINTS,
  Status,
  TelemetryData,
  View,
} from "./types";
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
import NavigationMenu from "./components/NavigationMenu";
import Details from "./components/Details";
function App() {
  const [view, setView] = useState<View>("telemetry");
  const [ports, setPorts] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [portStatus, setSelectedPortStatus] = useState<Status>("disconnected");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

  const latestTelemetryData: TelemetryData =
    telemetryData[telemetryData.length - 1] || defaultTelemetryData;
  const rotationAngle = latestTelemetryData?.angVelZ || 0;
  const time = latestTelemetryData?.time || 0;
  const altitude = latestTelemetryData?.altitude || 0;

  useEffect(() => {
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
        console.error("Failed to stop_port:", data.error);
        setSelectedPortStatus("disconnected");
        setIsConnected(false);
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
    <div
      className="w-full h-screen px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10 font-sans bg-cover border-blue-900 bg-blue-900"
      style={{
        backgroundImage:
          view === "telemetry" ? `url('/img/background.png')` : "none",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 to-transparent" />
      <div className="flex flex-col md:flex-row items-start mt-4">
        <div className="w-full lg:w-auto">
          <div className="hidden md:block">
          <LeftPane data={latestTelemetryData} status={portStatus} />
          </div>
            <NavigationMenu view={view} setView={setView} />
          </div>

        <div className="flex w-full flex-col relative">
          {view === "telemetry" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 px-4 sm:px-8 md:px-16">
                <div className="flex justify-center">
                  <Metric
                    large
                    metrics={{ title: "Time", value: time, unit: "s" }}
                  />
                </div>
                <div className="flex justify-center">
                  <Metric
                    large
                    metrics={{
                      title: "Altitude",
                      value: altitude.toFixed(2),
                      unit: "m",
                    }}
                  />
                </div>
              </div>

              {/* Rocket Image */}
              <div className="absolute flex flex-col justify-center left-1/2 transform -translate-x-1/2 top-4 hidden md:block">
                <img
                  className="w-24 md:w-36 h-auto"
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
            <div className="pt-8 px-4 sm:px-8 md:px-16">
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
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                <Button
                  onClick={fetchPorts}
                  className="bg-gray-700 hover:bg-gray-800 w-full sm:w-auto"
                >
                  Refresh Ports
                </Button>
                <Button
                  onClick={handlePortConnectToggle}
                  disabled={isLoading || !selectedPort}
                  className={`text-white w-full sm:w-auto ${
                    selectedPort
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          )}
          {view === "details" && (
            <Details data={telemetryData} />
          )}
        </div>

        <div className="hidden md:block">
          <RightPane data={latestTelemetryData} />
        </div>
      </div>
    </div>
  );
}

export default App;