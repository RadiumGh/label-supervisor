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
  PRODUCT_BUCKET_SIZE,
  searchProductsRequest,
  updateProductMasterProductRequest,
} from './product.api'

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

    onSuccess: () => {
      console.log('>>>> useUpdateProductMasterProduct > onSuccess')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
