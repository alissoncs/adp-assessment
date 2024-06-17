import axios from "axios";

const api = axios.create({
    baseURL: 'https://interview.adpeai.com/api'
});

export default api;