import axios from 'axios'

export const MOCK_RESPONSES = true
const SERVER_BASE_URL = 'http://localhost:3000'

export const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
})
