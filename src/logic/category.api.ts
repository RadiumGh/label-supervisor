import { Category } from './types'
import { mockedCategories } from './mock'
import { axiosClient, MOCK_RESPONSES, waitForMockedDelay } from './api'

export async function getCategoriesRequest() {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    return mockedCategories
  }

  const res = await axiosClient.get('/category')
  return res.data as Category[]
}

export async function createCategoryRequest({ name }: { name: string }) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    const createdCategory = { id: Date.now(), name } as Category

    mockedCategories.push(createdCategory)
    return createdCategory
  }

  const res = await axiosClient.post('/category', { name })
  return res.data as Category
}

export async function deleteCategoryRequest({ id }: { id: number }) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()

    const indexToDelete = mockedCategories.findIndex(
      category => category.id === id,
    )
    if (indexToDelete !== -1) mockedCategories.splice(indexToDelete, 1)

    return 200
  }

  const res = await axiosClient.delete(`/category/${id}`)
  return res.status
}

export async function updateCategoryNameRequest({
  id,
  name,
}: {
  id: number
  name: string
}) {
  if (MOCK_RESPONSES) {
    await waitForMockedDelay()
    return { id, name } as Category
  }

  const res = await axiosClient.put(`/category/${id}`, { name })
  return res.data as Category
}
