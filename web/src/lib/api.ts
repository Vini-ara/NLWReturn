import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nlwreturn-production-e251.up.railway.app',
})

