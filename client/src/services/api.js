import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://shortlyurl-production.up.railway.ap', // backend base URL
  baseURL: 'https://shortly-url-2tmp.onrender.com', // backend base URL
  // baseURL: 'http://localhost:3000', // backend base URL
  withCredentials: true, // important: allows cookies (for sessions or auth)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
