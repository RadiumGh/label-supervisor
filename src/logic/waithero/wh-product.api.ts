import {
  SearchWHProductsResponse,
  SearchWHProductsUntransformedResponse,
  WHProduct,
  WHProductStatusType,
  WHUnTransformedProduct,
} from './wh.types'
import {
  generatedProducts,
  mockedMasterProducts,
  mockedProducts,
} from './wh.mock'
import { MOCK_RESPONSES, waitForMockedDelay, WHAxiosClient } from '../api'
import {
  transformWHProduct,
  transformWHSearchProductsResponse,
} from './data-transformers'

export const WH_PRODUCT_BUCKET_SIZE = 20

export async function searchWHProductsRequest({
  filter,
  skip = 0,
  idRestaurant,
}: {
  filter: WHProductStatusType
  skip?: number
  startId?: number
  idRestaurant?: number
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    const products = generatedProducts.slice(
      skip,
      skip + WH_PRODUCT_BUCKET_SIZE,
    )
    return { products, remaining: 250 } as SearchWHProductsResponse
  }

  const res = await WHAxiosClient.post('/product-restaurant/search', {
    idRestaurant,
    hasMasterProduct: filter === WHProductStatusType.COMPLETED,
    pagination: {
      elementsPerPage: WH_PRODUCT_BUCKET_SIZE,
      page: Math.floor(skip / WH_PRODUCT_BUCKET_SIZE) + 1,
    },
  })

  return transformWHSearchProductsResponse(
    res.data as SearchWHProductsUntransformedResponse,
  )
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

  const res = await WHAxiosClient.put(
    `/product-restaurant/master`,
    {
      id,
      idProduct: masterProductId,
    },
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWlsLm1tZGdoYW5iYXJpQGdtYWlsLmNvbSIsImV4cCI6MTc2NzExNDg3MiwiaWF0IjoxNzM1NTc4ODcyfQ.iyEWnWKleB2KsEJOk8Lu-f30n7289LffuMX7wRxRfJ7cZds4j7EmZ8LVJl3_WyfkySAmxaDVi0NsRbjT4mcKsQ',
      },
    },
  )

  return transformWHProduct(res.data as WHUnTransformedProduct)
}
