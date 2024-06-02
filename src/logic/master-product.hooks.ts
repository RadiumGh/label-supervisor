import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  CreateMasterProductDTO,
  UpdateMasterProductDTO,
  MasterProduct,
} from './types'
import {
  createMasterProductRequest,
  deleteMasterProductRequest,
  searchMasterProductsRequest,
  updateMasterProductNameRequest,
  MASTER_PRODUCT_BUCKET_SIZE,
} from './master-product.api'
import { showToast } from '../components/toast'

export function useSearchMasterProducts({
  similarTo,
  search,
}: {
  similarTo?: number
  search?: string
}) {
  return useInfiniteQuery<MasterProduct[]>({
    queryKey: ['master-products', { search, similarTo }],
    queryFn: async ({ pageParam }) => {
      const skip = ((pageParam as number) ?? 0) * MASTER_PRODUCT_BUCKET_SIZE
      return searchMasterProductsRequest({ search, similarTo, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < MASTER_PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}

export function useCreateMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name }: CreateMasterProductDTO) =>
      createMasterProductRequest({ name }),

    onSuccess: () => {
      showToast('Master Product Created', 'success')

      queryClient.invalidateQueries({ queryKey: ['master-products'] })
    },
  })
}

export function useDeleteMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteMasterProductRequest({ id }),
    onSuccess: (_, id) => {
      showToast('Master Product Deleted', 'success')

      queryClient.setQueriesData(
        { queryKey: ['master-products'] },
        (oldData: { pages: Array<MasterProduct[]> } | undefined) => {
          if (!oldData) return undefined
          return {
            ...oldData,
            pages: oldData.pages.map(page => page.filter(p => p.id !== id)),
          }
        },
      )
    },
  })
}

export function useUpdateMasterProductName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, name }: UpdateMasterProductDTO) =>
      updateMasterProductNameRequest({ id, name }),

    onSuccess: updatedMasterProduct => {
      showToast('Master Product Name Updated', 'success')

      queryClient.setQueriesData(
        { queryKey: ['master-products'] },
        (oldData: { pages: Array<MasterProduct[]> } | undefined) => {
          if (!oldData) return undefined
          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.map(p =>
                p.id === updatedMasterProduct.id ? updatedMasterProduct : p,
              ),
            ),
          }
        },
      )
    },
  })
}
