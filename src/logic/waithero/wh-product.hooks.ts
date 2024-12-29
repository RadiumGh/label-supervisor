import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  WHProductStatusType,
  SearchWHProductsResponse,
  UpdateWHProductMasterProductDTO,
} from './wh.types'
import {
  searchWHProductsRequest,
  updateWHProductMasterProductRequest,
  WH_PRODUCT_BUCKET_SIZE,
} from './wh-product.api.ts'
import { showToast } from '../../components/toast'

export function useSearchWHProducts(
  filter: WHProductStatusType = WHProductStatusType.PENDING,
  startId: number = 0,
) {
  return useInfiniteQuery<SearchWHProductsResponse>({
    queryKey: ['wh-products', filter, startId],
    queryFn: async ({ pageParam }) => {
      const skip =
        startId + ((pageParam as number) ?? 0) * WH_PRODUCT_BUCKET_SIZE
      return searchWHProductsRequest({ filter, startId: startId, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.products.length < WH_PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}

export function useUpdateWHProductMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      masterProductId,
    }: UpdateWHProductMasterProductDTO) =>
      updateWHProductMasterProductRequest({ id: productId, masterProductId }),

    onSuccess: product => {
      showToast('Product Updated', 'success')

      queryClient.invalidateQueries({ queryKey: ['wh-progress'] })
      queryClient.setQueriesData(
        { queryKey: ['wh-products'] },
        (oldData: { pages: Array<SearchWHProductsResponse> } | undefined) => {
          if (!oldData) return undefined

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              products: page.products?.map(p =>
                p.id === product.id ? product : p,
              ),
            })),
          }
        },
      )
    },
  })
}
