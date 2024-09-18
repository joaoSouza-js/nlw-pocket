import axios from "axios"

const BASE_URL = "http://localhost:3333/api/"

export const api = axios.create({
    baseURL: BASE_URL
})