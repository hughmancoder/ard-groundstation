import { TelemetryData } from "../types";

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

// Components
export const TelemetryTable: React.FC<{ data: TelemetryData[] }> = ({
  data,
}) => {
  return (
    <div className="overflow-auto max-h-64 border p-4 bg-white rounded-md">
      <table className="min-w-full text-center text-sm">
        <thead>
          <tr>
            {DATA_COLUMNS.map((column) => (
              <th key={column.key} className="px-4 py-2 border-b">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              {DATA_COLUMNS.map((column) => (
                <td key={column.key} className="px-4 py-2 border-b">
                  {entry[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
