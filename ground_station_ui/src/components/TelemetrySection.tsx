import { TelemetryData } from "../types";
import { TelemetryTable } from "./TelemetryTable";

interface Props {
  data: TelemetryData[];
}

const TelemetrySection = ({ data }: Props) => {
  return (
    <div>
      <div className="text-left txt-lg">Telemetry table</div>
      <TelemetryTable data={data} />
    </div>
  );
};

export default TelemetrySection;
