import axios from "axios"
import { Cookies } from 'react-cookie';

const api = axios.create({
    baseURL: "http://192.168.0.111:4009/v1"
})

api.interceptors.request.use(config => {

    const token = (new Cookies()).get("token")
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
})


export { api }