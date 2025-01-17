import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import {
  WHProductStatusType,
  SearchWHProductsResponse,
  UpdateWHProductMasterProductDTO,
} from './wh.types'
import {
  searchWHProductsRequest,
  updateWHProductMasterProductRequest,
  WH_PRODUCT_BUCKET_SIZE,
} from './wh-product.api'

export function useSearchWHProducts(
  filter: WHProductStatusType = WHProductStatusType.PENDING,
  idRestaurant?: number,
) {
  return useInfiniteQuery<SearchWHProductsResponse>({
    queryKey: ['wh-products', filter, idRestaurant],
    queryFn: async ({ pageParam }) => {
      const skip = ((pageParam as number) ?? 0) * WH_PRODUCT_BUCKET_SIZE
      return searchWHProductsRequest({ filter, skip, idRestaurant })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.products.length < WH_PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}

export function useUpdateWHProductMasterProduct() {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      masterProductId,
    }: UpdateWHProductMasterProductDTO) =>
      updateWHProductMasterProductRequest({ id: productId, masterProductId }),

    // NOTE: Handled in wh-product-card component. until server-side bug gets resolved

    // onSuccess: product => {
    //   showToast('Product Updated', 'success')
    //
    //   queryClient.setQueriesData(
    //     { queryKey: ['wh-products'] },
    //     (oldData: { pages: Array<SearchWHProductsResponse> } | undefined) => {
    //       if (!oldData) return undefined
    //
    //       return {
    //         ...oldData,
    //         pages: oldData.pages.map(page => ({
    //           ...page,
    //           products: page.products?.map(p =>
    //             p.id === product.id ? product : p,
    //           ),
    //         })),
    //       }
    //     },
    //   )
    // },
  })
}
