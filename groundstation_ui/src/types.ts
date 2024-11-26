

export const BASE_URL = "http://127.0.0.1:5000" // "http://192.168.1.209:5000"
const MAX_DATA_POINTS = 1000; 

export type Status = "connected" | "disconnected" | "awaiting";

export type Metric = {
  title: string;
  value: number | string;
  unit: string;
};

export type TelemetryData = {
  time: number;
  bmpTemp: number;
  imuTemp: number;
  pressure: number;
  altitude: number;
  accX: number;
  accY: number;
  accZ: number;
  angVelX: number;
  angVelY: number;
  angVelZ: number;
};

export const defaultTelemetryData: TelemetryData = {
  time: 0,
  bmpTemp: 0,
  imuTemp: 0,
  pressure: 0,
  altitude: 0,
  accX: 0,
  accY: 0,
  accZ: 0,
  angVelX: 0,
  angVelY: 0,
  angVelZ: 0,
};

// Column keys and display names
export const DATA_COLUMNS: { key: keyof TelemetryData; label: string }[] = [
  { key: "time", label: "Time" },
  { key: "bmpTemp", label: "BMP Temp" },
  { key: "imuTemp", label: "IMU Temp" },
  { key: "pressure", label: "Pressure" },
  { key: "altitude", label: "Altitude" },
  { key: "accX", label: "Acc X" },
  { key: "accY", label: "Acc Y" },
  { key: "accZ", label: "Acc Z" },
  { key: "angVelX", label: "Ang Vel X" },
  { key: "angVelY", label: "Ang Vel Y" },
  { key: "angVelZ", label: "Ang Vel Z" },
];
