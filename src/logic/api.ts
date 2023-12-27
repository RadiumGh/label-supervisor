import axios from 'axios'
import { mockState } from './mock.ts'
import { asyncDelay } from './utils.ts'

const mockRequests = true

export const fetchDataRequest = async (productId: string) => {
  if (mockRequests) {
    await asyncDelay(500)
    return mockState
  }

  return axios.get(`/product/${productId}`)
}
