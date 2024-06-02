import { MasterProduct } from './types'
import { axiosClient, MOCK_RESPONSES } from './api'
import { mockedMasterProducts } from './mock'
import { asyncDelay } from './utils'

export const MASTER_PRODUCT_BUCKET_SIZE = 20

export async function searchMasterProductsRequest({
  search,
  similarTo,
  skip = 0,
}: {
  skip?: number
  similarTo?: number
  search?: string
}) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return mockedMasterProducts.slice(skip, skip + MASTER_PRODUCT_BUCKET_SIZE)
  }

  const res = await axiosClient.get('/master', {
    params: { search, similarTo, take: MASTER_PRODUCT_BUCKET_SIZE, skip },
  })

  return res.data as MasterProduct[]
}

export async function createMasterProductRequest({ name }: { name: string }) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return { id: Date.now(), name } as MasterProduct
  }

  const res = await axiosClient.post('/master', { name })
  return res.data as MasterProduct
}

export async function deleteMasterProductRequest({ id }: { id: number }) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return 200
  }

  const res = await axiosClient.delete(`/master/${id}`)
  return res.status
}

export async function updateMasterProductNameRequest({
  id,
  name,
}: {
  id: number
  name: string
}) {
  if (MOCK_RESPONSES) {
    await asyncDelay(1000)
    return { id, name } as MasterProduct
  }

  const res = await axiosClient.put(`/master/${id}`, { name })
  return res.data as MasterProduct
}
