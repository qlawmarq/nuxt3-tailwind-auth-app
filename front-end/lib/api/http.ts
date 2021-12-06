import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env?.API_ENDPOINT || 'http://localhost:8000',
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;