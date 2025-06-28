import React from 'react';
import BusCard from './BusCard';

const BusList = ({ buses, title, isRunning }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
        <span
          className={`w-3 h-3 rounded-full mr-2 ${
            isRunning ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        {title} ({buses.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {buses.map((bus, index) => (
          <BusCard
            key={isRunning ? bus.position : index}
            bus={bus}
            isRunning={isRunning}
          />
        ))}
      </div>
    </div>
  );
};

export default BusList;