import axios from "axios"


export const api = axios.create({
    baseURL: "http://192.168.0.111:4009/v1"
})