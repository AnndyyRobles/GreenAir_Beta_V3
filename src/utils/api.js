import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUser = async () => {
  try {
    const response = await api.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getUserSubscriptions = async () => {
  try {
    const response = await api.get('/profiles/my_profile/');
    return response.data.subscribed_stations;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
};

export const getStationAlerts = async (stationId) => {
  try {
    const response = await api.get(`/alerts/?station=${stationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching station alerts:', error);
    return [];
  }
};                            

// ... rest of the existing API functions