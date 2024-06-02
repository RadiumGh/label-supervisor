import { Product, ProductStatusType } from './types'
import { axiosClient, MOCK_RESPONSES } from './api'
import { mockedProducts } from './mock'
import { asyncDelay } from './utils'

export const PRODUCT_BUCKET_SIZE = 20

export async function searchProductsRequest({
  filter,
  skip = 0,
  startId = 0,
}: {
  filter: ProductStatusType
  skip?: number
  startId?: number
}) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return mockedProducts.slice(skip, skip + PRODUCT_BUCKET_SIZE)
  }

  const res = await axiosClient.get('/product', {
    params: { filter, take: PRODUCT_BUCKET_SIZE, skip, startId },
  })

  return res.data as Product[]
}

export async function updateProductMasterProductRequest({
  id,
  masterProductId,
}: {
  id: number
  masterProductId: number
}) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return 200
  }

  const res = await axiosClient.put(`/product/${id}/master`, {
    masterProductId,
  })
  return res.status
}
