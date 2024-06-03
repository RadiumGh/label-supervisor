import {
  MasterProduct,
  CreateMasterProductDTO,
  UpdateMasterProductDTO,
} from './types'
import { mockedCategories, mockedMasterProducts } from './mock'
import { axiosClient, MOCK_RESPONSES, waitForMockedDelay } from './api'

export const MASTER_PRODUCT_BUCKET_SIZE = 20

export async function searchMasterProductsRequest({
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
      skip + MASTER_PRODUCT_BUCKET_SIZE,
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
      take: MASTER_PRODUCT_BUCKET_SIZE,
      skip,
    },
  })

  return res.data as MasterProduct[]
}

export async function createMasterProductRequest({
  name,
  categoryId,
}: CreateMasterProductDTO) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()

    const categoryName = mockedCategories.find(({ id }) => id === categoryId)
      ?.name

    const createdMock = {
      id: Date.now(),
      name,
      categoryName,
      categoryId,
    } as MasterProduct

    mockedMasterProducts.push(createdMock)
    return createdMock
  }

  const res = await axiosClient.post('/master', { name, categoryId })
  return res.data as MasterProduct
}

export async function deleteMasterProductRequest({ id }: { id: number }) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()

    const indexToDelete = mockedMasterProducts.findIndex(
      product => product.id === id,
    )
    if (indexToDelete !== -1) mockedMasterProducts.splice(indexToDelete, 1)

    return 200
  }

  const res = await axiosClient.delete(`/master/${id}`)
  return res.status
}

export async function updateMasterProductNameRequest({
  id,
  name,
  categoryId,
}: UpdateMasterProductDTO) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    const found = mockedMasterProducts.find(p => p.id === id)
    const newCategory = mockedCategories.find(c => c.id === categoryId)

    return {
      ...found,
      id,
      name,
      categoryName: newCategory?.name,
      category: { id: categoryId, name: newCategory?.name },
    } as MasterProduct
  }

  const res = await axiosClient.put(`/master/${id}`, { name, categoryId })
  return res.data as MasterProduct
}
