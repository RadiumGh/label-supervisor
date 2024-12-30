import { mockedMasterProducts } from './wh.mock'
import { SearchWHMasterProductsUntransformedResponse } from './wh.types'
import { MOCK_RESPONSES, waitForMockedDelay, WHAxiosClient } from '../api'
import { transformWHSearchMasterProductsResponse } from './data-transformers'

export const WH_MASTER_PRODUCT_BUCKET_SIZE = 20

export async function searchWHMasterProductsRequest({
  search,
  skip = 0,
}: {
  skip?: number
  search?: string
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    const slice = mockedMasterProducts.slice(
      skip,
      skip + WH_MASTER_PRODUCT_BUCKET_SIZE,
    )

    return !search
      ? slice
      : slice.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase()),
        )
  }

  const res = await WHAxiosClient.post(
    '/product/all/lite',
    {
      name: search || null,
      pagination: {
        elementsPerPage: WH_MASTER_PRODUCT_BUCKET_SIZE,
        page: Math.floor(skip / WH_MASTER_PRODUCT_BUCKET_SIZE) + 1,
      },
    },
    { baseURL: 'https://server.waithero.com/v1-be/api' },
  )

  return transformWHSearchMasterProductsResponse(
    res.data as SearchWHMasterProductsUntransformedResponse,
  )
}
