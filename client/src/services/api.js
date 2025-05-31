import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shortlyurl-production.up.railway.app', // backend base URL
  withCredentials: true, // important: allows cookies (for sessions or auth)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
