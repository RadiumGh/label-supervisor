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
} from './master-product.api'

// TODO: Fix
const BUCKET_SIZE = 20

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
      const skip = ((pageParam as number) ?? 0) * BUCKET_SIZE
      return searchMasterProductsRequest({ search, similarTo, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}

export function useCreateMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name }: CreateMasterProductDTO) =>
      createMasterProductRequest({ name }),

    onSuccess: createdMasterProduct => {
      console.log(
        '>>>> useCreateMasterProduct > onSuccess:',
        createdMasterProduct,
      )

      queryClient.invalidateQueries({ queryKey: ['master-products'] })
      queryClient.setQueryData(
        ['master-products'],
        (oldMasterProducts: MasterProduct[]) =>
          [createdMasterProduct].concat(oldMasterProducts),
      )
    },
  })
}

export function useDeleteMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteMasterProductRequest({ id }),
    onSuccess: () => {
      console.log('>>>> useDeleteMasterProduct > onSuccess')
      queryClient.invalidateQueries({ queryKey: ['master-products'] })
    },
  })
}

export function useUpdateMasterProductName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, name }: UpdateMasterProductDTO) =>
      updateMasterProductNameRequest({ id, name }),

    onSuccess: () => {
      console.log('>>>> useUpdateMasterProductName > onSuccess')
      queryClient.invalidateQueries({ queryKey: ['master-products'] })
    },
  })
}
