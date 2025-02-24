import axios from "axios"
import { ACC_TOKEN } from "./const"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACC_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }   
)
export default api