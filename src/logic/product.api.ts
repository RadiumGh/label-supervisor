import { Product, ProductStatusType } from './types'
import { axiosClient, MOCK_RESPONSES, waitForMockedDelay } from './api'
import { generatedProducts, mockedMasterProducts, mockedProducts } from './mock'

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
    await waitForMockedDelay()
    return generatedProducts.slice(skip, skip + PRODUCT_BUCKET_SIZE)
  }

  const res = await axiosClient.get('/product', {
    params: {
      filter,
      take: PRODUCT_BUCKET_SIZE,
      skip: startId ? 0 : skip,
      startId,
    },
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
    await waitForMockedDelay()

    const product = mockedProducts.find(product => product.id === id)
    const masterProduct = mockedMasterProducts.find(
      product => product.id === masterProductId,
    )

    return { ...product, masterProduct } as Product
  }

  const res = await axiosClient.put(`/product/${id}/master`, {
    masterProductId,
  })

  return res.data as Product
}
