import { PLOT_METADATA, TelemetryData } from "@/types";
import { TelemetryPlot } from "./TelemetryPlot";

interface Props {
  data: TelemetryData[];
}

const Details = ({ data }: Props) => {
  return (
    <div className="px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
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
      
      {/* TODO: add seperate view */}
      {/* <h2 className="text-xl font-bold text-white mb-4">Latest Data</h2>
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden shadow-md rounded-lg">
            <Table className="min-w-full bg-none">
              <TableHeader className="">
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
              <TableBody className="">
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-white">{item.time}</TableCell>
                    <TableCell className="text-white">{item.bmpTemp}</TableCell>
                    <TableCell className="text-white">{item.imuTemp}</TableCell>
                    <TableCell className="text-white">
                      {item.pressure}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.altitude}
                    </TableCell>
                    <TableCell className="text-white">{item.accX}</TableCell>
                    <TableCell className="text-white">{item.accY}</TableCell>
                    <TableCell className="text-white">{item.accZ}</TableCell>
                    <TableCell className="text-white">{item.angVelX}</TableCell>
                    <TableCell className="text-white">{item.angVelY}</TableCell>
                    <TableCell className="text-white">{item.angVelZ}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div> */}
    </div>
  );
};

export default Details;
