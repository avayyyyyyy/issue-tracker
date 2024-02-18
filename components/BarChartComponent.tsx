import React from "react";

type BarChartProps = {
  open: number;
  pending: number;
  completed: number;
};

const BarChartComponent: React.FC<BarChartProps> = ({
  open,
  pending,
  completed,
}) => {
  const maxCount = Math.max(open, pending, completed);

  return (
    <div className="flex items-end space-x-4">
      <div className="flex flex-col items-center">
        <div
          className="bg-blue-500 h-full"
          style={{ height: `${(open / maxCount) * 100}%` }}
        ></div>
        <p className="mt-2">Open</p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="bg-yellow-500 h-full"
          style={{ height: `${(pending / maxCount) * 100}%` }}
        ></div>
        <p className="mt-2">Pending</p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="bg-green-500 h-full"
          style={{ height: `${(completed / maxCount) * 100}%` }}
        ></div>
        <p className="mt-2">Completed</p>
      </div>
    </div>
  );
};

export default BarChartComponent;
