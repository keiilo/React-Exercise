// npm install axios
import axios from 'axios';

//const API_TOKEN = '';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //Authorization: Bearer ${API_TOKEN},
  },

});

export default api;