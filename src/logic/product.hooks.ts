import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  ProductStatusType,
  ProgressResponse,
  SearchProductsResponse,
  UpdateProductMasterProductDTO,
} from './types'
import {
  searchProductsRequest,
  updateProductMasterProductRequest,
  PRODUCT_BUCKET_SIZE,
  getProgressRequest,
} from './product.api'
import { showToast } from '../components/toast'

export function useSearchProducts(
  filter: ProductStatusType = ProductStatusType.PENDING,
  startId: number = 0,
) {
  return useInfiniteQuery<SearchProductsResponse>({
    queryKey: ['products', filter, startId],
    queryFn: async ({ pageParam }) => {
      const skip = startId + ((pageParam as number) ?? 0) * PRODUCT_BUCKET_SIZE

      console.log('queryFn:', { pageParam, skip, startId })
      return searchProductsRequest({ filter, startId: startId, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.products.length < PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}

export function useProgress() {
  return useQuery<ProgressResponse>({
    queryKey: ['progress'],
    queryFn: getProgressRequest,
    refetchOnMount: true,
  })
}

export function useUpdateProductMasterProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      masterProductId,
    }: UpdateProductMasterProductDTO) =>
      updateProductMasterProductRequest({ id: productId, masterProductId }),

    onSuccess: product => {
      showToast('Product Updated', 'success')

      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.setQueriesData(
        { queryKey: ['products'] },
        (oldData: { pages: Array<SearchProductsResponse> } | undefined) => {
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
