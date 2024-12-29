import {
  WHProduct,
  WHProductStatusType,
  SearchWHProductsResponse,
} from './wh.types.ts'
import {
  mockedProducts,
  generatedProducts,
  mockedMasterProducts,
} from './wh.mock.ts'
import { axiosClient, MOCK_RESPONSES, waitForMockedDelay } from '../api'

export const WH_PRODUCT_BUCKET_SIZE = 20

export async function searchWHProductsRequest({
  filter,
  skip = 0,
  startId = 0,
}: {
  filter: WHProductStatusType
  skip?: number
  startId?: number
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    const products = generatedProducts.slice(
      skip,
      skip + WH_PRODUCT_BUCKET_SIZE,
    )
    return { products, remaining: 250 } as SearchWHProductsResponse
  }

  const res = await axiosClient.get('/product/v2', {
    params: {
      filter,
      take: WH_PRODUCT_BUCKET_SIZE,
      skip: startId ? Math.max(0, skip - startId) : skip,
      startId,
    },
  })

  return res.data as SearchWHProductsResponse
}

export async function updateWHProductMasterProductRequest({
  id,
  masterProductId,
}: {
  id: number
  masterProductId: number
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()

    const product = mockedProducts.find(product => product.id === id)
    const masterProduct = mockedMasterProducts.find(
      product => product.id === masterProductId,
    )

    return { ...product, masterProduct } as WHProduct
  }

  const res = await axiosClient.put(`/product/${id}/master`, {
    masterProductId,
  })

  return res.data as WHProduct
}
