import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  Product,
  ProductStatusType,
  UpdateProductMasterProductDTO,
} from './types'
import {
  searchProductsRequest,
  updateProductMasterProductRequest,
  PRODUCT_BUCKET_SIZE,
} from './product.api'
import { showToast } from '../components/toast'

export function useSearchProducts(
  filter: ProductStatusType = ProductStatusType.PENDING,
  startId: number = 0,
) {
  return useInfiniteQuery<Product[]>({
    queryKey: ['products', filter, startId],
    queryFn: async ({ pageParam }) => {
      const skip = startId + ((pageParam as number) ?? 0) * PRODUCT_BUCKET_SIZE
      return searchProductsRequest({ filter, startId: startId, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
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

      queryClient.setQueriesData(
        { queryKey: ['products'] },
        (oldData: { pages: Array<Product[]> } | undefined) => {
          if (!oldData) return undefined
          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.map(p => (p.id === product.id ? product : p)),
            ),
          }
        },
      )
    },
  })
}
