import axios from 'axios';

// Create an axio instance with a base URL matching our mock static JSON
const apiClient = axios.create({
  baseURL: '/', // Because old data is in public folder
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSiteData = async () => {
  try {
    const response = await apiClient.get('api/data.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching site data:', error);
    throw error;
  }
};

// Play Zone API Client
const pzApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/playzone`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Play Zone Fetchers
export const fetchPzActivities = async () => {
  const { data } = await pzApi.get('/activities');
  return data;
};

export const fetchPzAbout = async () => {
  const { data } = await pzApi.get('/about');
  return data;
};

export const fetchPzServices = async () => {
  const { data } = await pzApi.get('/services');
  return data;
};

export const fetchPzGallery = async () => {
  const { data } = await pzApi.get('/gallery');
  return data;
};
