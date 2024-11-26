import React, { useEffect } from "react";
import { useTelemetry } from "../context/TelemetryProvider";

const Settings: React.FC = () => {
  const {
    ports,
    selectedPort,
    setSelectedPort,
    connectPort,
    disconnectPort,
    fetchPorts, 
    isConnected
  } = useTelemetry();

  useEffect(() => {
    fetchPorts();
  }, []);

  const handleConnectionToggle = () => {
    if (isConnected) {
      disconnectPort();
    } else {
      connectPort();
    }
  };


  return (
    <div className="px-6">
      <div className="uppercase text-center text-2xl py-5">Settings</div>
      <div className="space-y-4 mt-4">
        <label htmlFor="portSelect" className="block text-lg font-medium">
          Serial Port Selection
        </label>
        <select 
          id="portSelect"
          value={selectedPort ?? ""}
          onChange={(e) => setSelectedPort(e.target.value)}
          className="text-black block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            {ports.length === 0 ? "Loading ports..." : "Select a port"}
          </option>
          {ports.map((port, index) => (
            <option key={index} value={port}>
              {port}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={fetchPorts}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Refresh Ports
        </button>
        <button
          onClick={handleConnectionToggle}
          disabled={!selectedPort}
          className={`px-4 py-2 rounded-md text-white ${
            selectedPort
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
              {/* <button
          onClick={connectPort}
          disabled={!selectedPort}
          className={`px-4 py-2 rounded-md text-white ${
            selectedPort
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Connect
        </button>
        <button
          onClick={disconnectPort}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Disconnect
        </button> */}
      </div>
    </div>
  );
};

export default Settings;
