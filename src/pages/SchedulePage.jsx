import React, { useState, useEffect } from 'react';
import { fetchSchedule } from '../utils/api';
import DateSelector from '../components/DateSelector';
import BusList from '../components/BusList';
import ExportButton from '../components/ExportButton';
import { format, parseISO } from 'date-fns'; // Add this import

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 28));
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        // Format date without timezone interference
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const data = await fetchSchedule(formattedDate);
        setSchedule(data);
      } catch (err) {
        setError('Failed to load schedule. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadSchedule();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-3xl font-bold">Bus Schedule Management</h1>
            <p className="opacity-90">Daily rotation system for 80 buses</p>
          </div>
          
          <div className="p-6">
            <DateSelector 
              selectedDate={selectedDate} 
              handleDateChange={handleDateChange} 
            />
            
            {schedule && (
              <div className="flex justify-end mt-4">
                <ExportButton 
                  date={selectedDate}
                  runningBuses={schedule.runningBuses}
                  offChartBuses={schedule.offChartBuses.map((bus, index) => ({
                    busNumber: bus,
                    position: index + 1
                  }))}
                />
              </div>
            )}
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {schedule && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-4">
                <h2 className="text-xl font-semibold text-white">
                  Running Buses ({schedule.runningBuses.length})
                </h2>
              </div>
              <div className="p-6">
                <BusList 
                  buses={schedule.runningBuses} 
                  isRunning={true} 
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-4">
                <h2 className="text-xl font-semibold text-white">
                  Off-Chart Buses ({schedule.offChartBuses.length})
                </h2>
              </div>
              <div className="p-6">
                <BusList 
                  buses={schedule.offChartBuses.map((bus, index) => ({
                    busNumber: bus,
                    position: index + 1
                  }))} 
                  isRunning={false} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;