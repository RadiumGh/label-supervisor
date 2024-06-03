import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from './types'
import {
  getCategoriesRequest,
  createCategoryRequest,
  deleteCategoryRequest,
  updateCategoryNameRequest,
} from './category.api'
import { showToast } from '../components/toast'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoriesRequest(),
    staleTime: 0,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name }: CreateCategoryDTO) =>
      createCategoryRequest({ name }),

    onSuccess: () => {
      showToast('Category Created', 'success')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategoryRequest({ id }),
    onError(error) {
      // eslint-disable-next-line
      // @ts-ignore
      if (error.response.status === 405)
        showToast(
          "The category has master products associated with it. Can't be deleted!",
          'error',
        )
    },
    onSuccess(_, id) {
      showToast('Category Deleted', 'success')

      queryClient.setQueriesData(
        { queryKey: ['categories'] },
        (oldData: Category[] | undefined) =>
          oldData ? oldData.filter(c => c.id !== id) : undefined,
      )
    },
  })
}

export function useUpdateCategoryName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, name }: UpdateCategoryDTO) =>
      updateCategoryNameRequest({ id, name }),

    onSuccess: updatedCategory => {
      showToast('Category Name Updated', 'success')

      queryClient.setQueriesData(
        { queryKey: ['categories'] },
        (oldData: Category[] | undefined) =>
          !oldData
            ? undefined
            : oldData.map(c =>
                c.id === updatedCategory.id ? updatedCategory : c,
              ),
      )
    },
  })
}
