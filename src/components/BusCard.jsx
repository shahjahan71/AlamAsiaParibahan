import React from 'react';

const convertTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(':');
  const period = +hours >= 12 ? 'PM' : 'AM';
  const hours12 = +hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

const BusCard = ({ bus, isRunning }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
        isRunning
          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
          : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold text-gray-800">
            {bus.busNumber}
          </span>
          {isRunning && (
            <span className="block text-sm text-gray-600 mt-1">
              {convertTo12Hour(bus.departureTime)}
            </span>
          )}
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isRunning
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {isRunning ? `Position ${bus.position}` : `#${bus.position}`}
        </span>
      </div>
    </div>
  );
};

export default BusCard;