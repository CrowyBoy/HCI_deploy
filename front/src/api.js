import axios from "axios"
import { ACC_TOKEN } from "./const"
const apiURL = '/choreo-apis/hci/back/v1'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL
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