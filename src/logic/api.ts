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

export const MOCK_RESPONSES = false
const SERVER_BASE_URL = 'http://157.90.154.82:10300'

const WAITHERO_SERVER_BASE_URL =
  'https://server.waithero.com/v1-dev-web-app/api'

export const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
})

export const WHAxiosClient = axios.create({
  baseURL: WAITHERO_SERVER_BASE_URL,
  headers: {
    // Language: 'en',
    'Request-Token':
      'pR2ytQmGa4T9sFjNHtnMux8yPQbfHD46zvmDvsKzcnJXBYnxwPy7kLeMYpBK6fNyDdf2A22pC4wDeNbdJkf5jNKd3YkKLNAT7UHyjXZhzBSw9jfgkYyedugZmHj339v66zGGjMQg7qwbzuk9Un7xZpwdT7XAyZCbWRsuDn2SyEFb4xTYfPEjbHFTZ9azkTdkP57AgzQkXVK9WXWBzGq348WVfGmzDqxj9mGzEtCEgrWxqZ9P7CfUwP2XUVS5pC7bfj3L4LYr7SJnY8xmYXgWgCM8UfHAdrqG6MHQmCWLnYSnKWfBCY2ubxnNDPhqEMjhzQ9LB9vUnY87BKEKUdznAmGCJKuqp7rPLEuTkx9qSFbgv4tysc39yntZdzpvWeATBNXft55Q96qZtJFfvkcQQsTHDt4VXqVDjrUwesVpLHWxMLra4PGMgmY55m7dbkuufDTQvEQPNscCRQ9tCJcACMw225BHxkt3e3SeMDdm9k7YMZeuQBYYspmcHda7zQPc',
  },
})
