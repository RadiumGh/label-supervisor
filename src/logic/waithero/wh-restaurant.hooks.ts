import { useInfiniteQuery } from '@tanstack/react-query'
import { WHRestaurant } from './wh.types'
import {
  searchWHRestaurantsRequest,
  WH_RESTAURANT_BUCKET_SIZE,
} from './wh-restaurant.api'

export function useSearchWHRestaurants({ name }: { name?: string }) {
  return useInfiniteQuery<WHRestaurant[]>({
    queryKey: ['wh-restaurants', { name }],
    queryFn: async ({ pageParam }) => {
      const skip = ((pageParam as number) ?? 0) * WH_RESTAURANT_BUCKET_SIZE
      return searchWHRestaurantsRequest({ name, skip })
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < WH_RESTAURANT_BUCKET_SIZE) return undefined
      return ((lastPageParam as number) || 0) + 1
    },
  })
}
