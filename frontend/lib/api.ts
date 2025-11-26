import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api" || 'http://127.0.0.1:8000/api',
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;