import axios from 'axios';



const fetchTestPointCollections = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/TestPointCollections');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchTestPointCollections;