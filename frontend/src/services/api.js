import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;