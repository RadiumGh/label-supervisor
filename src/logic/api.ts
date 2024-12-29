import axios from 'axios'
import { asyncDelay } from './utils'

const MIN_MOCK_DELAY = 300
const MAX_MOCK_DELAY = 600

export const waitForMockedDelay = async () => {
  const waitTime = Math.floor(
    Math.random() * (MAX_MOCK_DELAY - MIN_MOCK_DELAY) + MIN_MOCK_DELAY,
  )

  await asyncDelay(waitTime)
}

export const MOCK_RESPONSES = true
const SERVER_BASE_URL = 'http://157.90.154.82:10300'

export const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
})
