import React, { useState } from 'react';
import DatePickerModal from './DatePickerModal';

const DateSelector = ({ selectedDate, handleDateChange }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Schedule Date
      </label>
      <div className="relative">
        <button
          onClick={() => setShowModal(true)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm 
                    text-left text-gray-700 text-sm bg-white
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {selectedDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </button>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>

      {showModal && (
        <DatePickerModal
          selectedDate={selectedDate}
          onDateChange={(date) => {
            handleDateChange(date);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DateSelector;