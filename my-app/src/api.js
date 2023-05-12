import axios from 'axios';

const fetchTestPointCollections = async () => {
  try {
    const response = await axios.get('/api/TestPointCollections'); // Replace '/api/data' with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchTestPointCollections;