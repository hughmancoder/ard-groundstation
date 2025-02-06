
import { TelemetryData } from "../types";


const calculatePercentage = (value: number, max: number) =>
  (Math.min(value, max) / max) * 100;

interface Props {
  data: TelemetryData
}

const RightPane = ({data} : Props) => {
  const metrics = [
    { title: "Acceleration X", value: data.accX, unit: "m/s²", max: 10 },
    { title: "Acceleration Y", value: data.accY, unit: "m/s²", max: 10 },
    { title: "Acceleration Z", value: data.accZ, unit: "m/s²", max: 10 },
    { title: "Angular Velocity X", value: data.angVelX, unit: "°/s", max: 360 },
    { title: "Angular Velocity Y", value: data.angVelY, unit: "°/s", max: 360 },
    { title: "Angular Velocity Z", value: data.angVelZ, unit: "°/s", max: 360 },
  ];
  return (
    <div className="w-full max-w-xs space-y-8">
      {metrics.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between items-end ${index === 3 ? "pt-14" : ""}`}
        >
          <div className="flex flex-col space-y-2">
            <span className="text-md text-gray-300">{item.title}</span>
            <div className="relative w-36 h-1.5">
              <div className="w-36 absolute left-0 top-0 rounded-full h-1.5 bg-gray-600/20"></div>
              <div
                className="absolute left-0 top-0 bg-blue rounded-full h-1.5"
                style={{ width: `${calculatePercentage(item.value, item.max)}%` }}
              ></div>
            </div>
          </div>
          <div className="pl-6 text-lg text-white whitespace-nowrap">
            {item.value.toFixed(2)} {item.unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RightPane;
