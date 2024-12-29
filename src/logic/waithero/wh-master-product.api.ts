import { WHMasterProduct } from './wh.types'
import { mockedMasterProducts } from './wh.mock.ts'
import { axiosClient, MOCK_RESPONSES, waitForMockedDelay } from '../api'

export const WH_MASTER_PRODUCT_BUCKET_SIZE = 20

export async function searchWHMasterProductsRequest({
  search,
  similarTo,
  categoryId,
  skip = 0,
}: {
  skip?: number
  similarTo?: number
  categoryId?: number
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

  const res = await axiosClient.get('/master', {
    params: {
      search,
      similarTo,
      categoryId,
      take: WH_MASTER_PRODUCT_BUCKET_SIZE,
      skip,
    },
  })

  return res.data as WHMasterProduct[]
}
