import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.6:5000', // Using your IP and port
  withCredentials: true,
});

export default api;
