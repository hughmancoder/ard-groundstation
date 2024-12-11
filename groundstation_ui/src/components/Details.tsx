

import { PLOT_METADATA, TelemetryData } from "@/types";
import { TelemetryPlot } from "./TelemetryPlot";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props {
    data: TelemetryData[];
}

const Details = ({data}: Props) => {
  return (
    <div>
      <div className="pt-8">
        <div className="grid grid-cols-2 gap-4">
          {PLOT_METADATA.map((item) => (
            <TelemetryPlot
              key={item.key}
              data={data}
              title={item.label}
              dataKey={item.key}
              color={item.color}
            />
          ))}
        </div>
      </div>
      <strong>Latest Data</strong>
      <div className="pt-8 flex justify-center">
        <div className="max-h-[50vh] overflow-y-auto w-full">
          <Table className="min-w-full bg-none rounded-lg">
            <TableHeader className="bg-none text-white">
              <TableRow>
                <TableHead className="text-white">Time</TableHead>
                <TableHead className="text-white">BMP Temp</TableHead>
                <TableHead className="text-white">IMU Temp</TableHead>
                <TableHead className="text-white">Pressure</TableHead>
                <TableHead className="text-white">Altitude</TableHead>
                <TableHead className="text-white">Acc X</TableHead>
                <TableHead className="text-white">Acc Y</TableHead>
                <TableHead className="text-white">Acc Z</TableHead>
                <TableHead className="text-white">AngVel X</TableHead>
                <TableHead className="text-white">AngVel Y</TableHead>
                <TableHead className="text-white">AngVel Z</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.bmpTemp}</TableCell>
                  <TableCell>{item.imuTemp}</TableCell>
                  <TableCell>{item.pressure}</TableCell>
                  <TableCell>{item.altitude}</TableCell>
                  <TableCell>{item.accX}</TableCell>
                  <TableCell>{item.accY}</TableCell>
                  <TableCell>{item.accZ}</TableCell>
                  <TableCell>{item.angVelX}</TableCell>
                  <TableCell>{item.angVelY}</TableCell>
                  <TableCell>{item.angVelZ}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Details;
