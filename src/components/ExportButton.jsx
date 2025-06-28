import React from 'react';
import { generatePDF } from '../utils/generatePDF';

const ExportButton = ({ date, runningBuses, offChartBuses }) => {
  const handleExport = () => {
    // Ensure offChartBuses are properly formatted
    const formattedOffChart = offChartBuses.map((bus, index) => ({
      busNumber: typeof bus === 'string' ? bus : bus.busNumber,
      position: index + 1
    }));
    
    generatePDF(date, runningBuses, formattedOffChart);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export PDF
    </button>
  );
};

export default ExportButton;