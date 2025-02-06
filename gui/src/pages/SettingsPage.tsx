import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS } from "@/types";
import { useState } from "react";

function SettingsPage() {
  const [ports, setPorts] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [portStatus, setSelectedPortStatus] = useState<STATUS>("disconnected");
  const [isConnected, setIsConnected] = useState(false);

  const onSelectPort = () => {};

  return (
    <div className="pt-8 px-4 sm:px-8 md:px-16">
      <Select value={selectedPort ?? ""} onValueChange={onSelectPort}>
        <SelectTrigger className="w-full text-black">
          <SelectValue placeholder="Select a serial port" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Serial Ports</SelectLabel>
            {ports.map((port, i) => (
              <SelectItem key={i} value={port}>
                {port}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        <Button
          onClick={() => {}}
          className="bg-gray-700 hover:bg-gray-800 w-full sm:w-auto"
        >
          Refresh Ports
        </Button>
        <Button
          onClick={() => {}}
          disabled={!selectedPort}
          className={`text-white w-full sm:w-auto ${
            selectedPort
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
}

export default SettingsPage;
