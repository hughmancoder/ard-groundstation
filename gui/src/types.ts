

export const MAX_DATA_POINTS = 100; // Number of points to hold temporarily in memory (queue)

// export type STATUS = "connected" | "disconnected" | "awaiting";
export enum STATUS {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  AWAITING = "awaiting"
}

export enum PAGE {
  TELEMETRY = "telemetry",
  SETTINGS = "settings",
  GRAPHS = "graphs"
}

export type Metric = {
  title: string;
  value: number | string;
  unit: string;
};

export type Telemetry = {
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

export const DEFAULT_TELEMETRY_DATA: Telemetry = {
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

export const DATA_COLUMNS: { key: keyof Telemetry; label: string }[] = [
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

export const PLOT_METADATA: { key: keyof Telemetry; label: string, color: string }[] = [
  { key: "bmpTemp", label: "BMP Temp", color: "#ff6730" },    
  { key: "imuTemp", label: "IMU Temp", color: "#ff9b30" },    
  { key: "pressure", label: "Pressure", color: "#ffba30" },    
  { key: "altitude", label: "Altitude", color: "#FFD630" }     
];
