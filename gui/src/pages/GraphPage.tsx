import { TelemetryPlot } from '@/components/TelemetryPlot';
import { PLOT_METADATA, Telemetry } from "@/types";


interface Props {
    data: Telemetry[];
  }

const GraphPage = ({data}: Props) => {
  return (
    <div>

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
    </div>

    </div>
  )
}

export default GraphPage