import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchSchedule = async (dateString) => {
  try {
    // No need to convert to ISO string since we're already passing formatted string
    const response = await axios.get(
      `${API_BASE_URL}/schedule/schedule?date=${dateString}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};