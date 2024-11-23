// // import React, { useState, useEffect } from "react";
// // import io from "socket.io-client";
// // import { Button } from "@/components/ui/button";

// // import TelemetrySection from "./components/TelemetrySection";
// // import { TelemetryData } from "./types";
// // import TelemetryCard from "./components/TelemetryCard";

// // Constants
// const BASE_URL = "http://localhost:5000";
// const socket = io(`${BASE_URL}`);

// // Replace with the extracted hex color from the logo (e.g., #FFC300 as an example)
// const YELLOW_COLOR = "#FFC300";

// const HomePage: React.FC = () => {
//   const [ports, setPorts] = useState<string[]>([]);
//   const [selectedPort, setSelectedPort] = useState<string>("");
//   const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

//   useEffect(() => {
//     // Fetch available serial ports
//     fetch(`${BASE_URL}/ports`)
//       .then((res) => res.json())
//       .then((data) => setPorts(data.ports || []))
//       .catch((error) => console.error("Error fetching ports:", error));
//   }, []);

//   const MAX_TELEMETRY_ENTRIES = 100; // Limit the maximum number of telemetry entries to keep

//   useEffect(() => {
//     // Listen for telemetry data
//     socket.on("telemetry_data", (data: TelemetryData) => {
//       setTelemetryData((prevData) => {
//         const updatedData = [...prevData, data];

//         // Limit the length to prevent infinite growth
//         if (updatedData.length > MAX_TELEMETRY_ENTRIES) {
//           updatedData.shift(); // Remove the oldest entry
//         }

//         return updatedData;
//       });
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off("telemetry_data");
//     };
//   }, []);

//   const handlePortSelection = async () => {
//     if (!selectedPort) {
//       alert("Please select a port");
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/set_port`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ port: selectedPort }),
//       });
//       const result = await response.json();

//       if (result.success) {
//         socket.emit("request_telemetry");
//       } else {
//         alert(`Error: ${result.error || "Unable to set port"}`);
//       }
//     } catch (error) {
//       console.error("Error setting port:", error);
//       alert("An error occurred while setting the port.");
//     }
//   };

//   const handleStopPort = async () => {
//     try {
//       await fetch(`${BASE_URL}/stop_port`, {
//         method: "POST",
//       });
//       setTelemetryData([]);
//       alert("Serial port closed.");
//     } catch (error) {
//       console.error("Error stopping port:", error);
//       alert("An error occurred while stopping the port.");
//     }
//   };

//   return (
//     <>
//       <div className="space-y-4">
//         <div className="text-5xl text-left">Groundstation</div>
//         <div className="w-full">
//           <div className="text-left txt-lg">Serial Port Selection</div>
//           <select
//             id="portSelect"
//             value={selectedPort}
//             onChange={(e) => setSelectedPort(e.target.value)}
//             className="block w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="" disabled>
//               Select a port
//             </option>
//             {ports.map((port) => (
//               <option key={port} value={port}>
//                 {port}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="flex space-x-4 py-4">
//         <Button
//           onClick={handlePortSelection}
//           disabled={!selectedPort}
//           // variant="primary"
//           // style={{ backgroundColor: YELLOW_COLOR, color: "#000" }}
//         >
//           Connect
//         </Button>
//         <Button variant="outline" onClick={handleStopPort}>
//           Disconnect
//         </Button>
//       </div>
//       <TelemetryCard data={telemetryData[telemetryData.length - 1] ?? null} />
//       {/* <TelemetryCard data={null} /> */}
//       <TelemetrySection data={telemetryData} />
//     </>
//   );
// };

// export default HomePage;
