import React from 'react';

interface MetricItemProps {
  title: string;
  value: number | string;
  unit: string;
  progress?: number; // value between 0 and 100
}

const MetricItem: React.FC<MetricItemProps> = ({ title, value, unit, progress }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-md text-gray-300">{title}</span>
      {typeof progress === 'number' && (
        <div className="relative w-full h-1.5 bg-gray-600/20 rounded-full">
          <div
            className="absolute left-0 top-0 h-1.5 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="text-lg text-white">
        {value} {unit}
      </div>
    </div>
  );
};

export default MetricItem;