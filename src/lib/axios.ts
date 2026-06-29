import axios from "axios";

export const baseURL = 'http://localhost:2100'

export const api = axios.create({
    baseURL
})
