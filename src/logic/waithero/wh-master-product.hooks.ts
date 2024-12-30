import { useInfiniteQuery } from '@tanstack/react-query'
import { WHMasterProduct } from './wh.types'
import {
  searchWHMasterProductsRequest,
  WH_MASTER_PRODUCT_BUCKET_SIZE,
} from './wh-master-product.api'

export function useSearchWHMasterProducts({ search }: { search?: string }) {
  return useInfiniteQuery<WHMasterProduct[]>({
    queryKey: ['wh-master-products', { search }],
    queryFn: async ({ pageParam }) => {
      const skip = ((pageParam as number) ?? 0) * WH_MASTER_PRODUCT_BUCKET_SIZE
      return searchWHMasterProductsRequest({
        search,
        skip,
      })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < WH_MASTER_PRODUCT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}
