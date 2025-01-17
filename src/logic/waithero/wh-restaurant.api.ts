import { mockedRestaurants } from './wh.mock'
import { SearchWHRestaurantsResponse } from './wh.types'
import { MOCK_RESPONSES, waitForMockedDelay, WHAxiosClient } from '../api'

export const WH_RESTAURANT_BUCKET_SIZE = 20

export async function searchWHRestaurantsRequest({
  skip = 0,
  name,
}: {
  skip?: number
  name?: string
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    return mockedRestaurants
  }

  const res = await WHAxiosClient.post(
    '/restaurant/all/lite',
    {
      name,
      pagination: {
        elementsPerPage: WH_RESTAURANT_BUCKET_SIZE,
        page: Math.floor(skip / WH_RESTAURANT_BUCKET_SIZE) + 1,
      },
    },
    { baseURL: 'https://server.waithero.com/v1-be/api' },
  )

  return (res?.data as SearchWHRestaurantsResponse)?.list ?? []
}
