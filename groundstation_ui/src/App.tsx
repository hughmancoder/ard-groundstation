import { BrowserRouter as Router } from "react-router-dom";

import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import { defaultTelemetryData } from "./types";
import { Metric } from "./components/Metric";

function App() {
  const rotationAngle = 0;
  // const rotationAngle = data.angVelZ;
  return (
    <Router>
      <div
        className="w-full min-h-screen px-12 pt-10 font-sans bg-cover border-blue-900 bg-blue-900"
        style={{
          backgroundImage: `url('/img/background.png')`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 to-transparent"
        />
        <h1 className="relative text-2xl text-purple-50 font-semibold text-center uppercase">
          Vehicle overview
        </h1>
        <div className="flex items-start mt-4">
          <LeftPane data={defaultTelemetryData} />

          <div className="flex w-full flex-col px-16pt-6 relative">
            <div className="grid grid-cols-3 pt-8">
              <div className="flex justify-center">
                <Metric large metrics={{ title: "Time", value: "T+0", unit: "s" }} />
              </div>
              <div></div> {/* Empty column to create space */}
              <div className="flex justify-center">
                <Metric large metrics={{ title: "Altitude", value: 0, unit: "m" }} />
              </div>
            </div>

            <div
              className="absolute flex flex-col justify-center -translate-x-1/2 left-1/2 top-52"
            >
              <img
                className="w-[135px] h-auto"
                src="/img/rocket.png"
                alt=""
                style={{ transform: `rotate(${rotationAngle}deg) translateY(${-170}px)` }}
              />
            </div>
          </div>

          <RightPane data={defaultTelemetryData} />
        </div>
        <div className="flex justify-between pt-4">
            <div className="flex items-center w-80 text-gray-800">
              <button className="relative z-10 px-8 py-6 text-sm font-bold uppercase bg-white rounded text-gray">
                Telemetry
              </button>
              <button className="relative -translate-x-1 px-8 py-4 border rounded text-white text-sm font-bold border-gray-600/50 bg-opacity-[0.1] uppercase">
                Settings
              </button>
            </div>
          </div>
      </div>
    </Router>
  );
}

export default App;
