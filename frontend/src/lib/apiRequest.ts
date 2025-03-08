import axios, { AxiosInstance } from "axios";

const apiRequest: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default apiRequest;