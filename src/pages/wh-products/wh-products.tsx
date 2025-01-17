import { useMemo, useState } from 'react'
import { styled, Typography } from '@mui/joy'
import { WHProductList, WHProductStatus } from './components'
import { DescriptionTypography } from '../../components/description-typography'
import {
  WHProduct,
  WHProductStatusType,
  useSearchWHProducts,
} from '../../logic/waithero'
import { WHRestaurantsAutoComplete } from './components/wh-restaurants-auto-complete.tsx'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const StatusContainer = styled('div')`
  display: flex;
  flex-direction: column;

  gap: 4px;
  margin-bottom: 16px;
`

const ListHeader = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`

export function WHProducts() {
  const [restaurantId, setRestaurantId] = useState<number>()

  const [filter, setFilter] = useState<WHProductStatusType>(
    WHProductStatusType.PENDING,
  )

  const {
    data: productPages,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchWHProducts(filter, restaurantId)

  const isLoading = isFetching && !isFetchingNextPage

  const { products, remaining } = useMemo(() => {
    if (!productPages?.pages?.length) return { products: [], remaining: 0 }

    const remaining = productPages.pages[0].remaining
    const products = productPages.pages.reduce(
      (acc, page) => acc.concat(page.products),
      [] as WHProduct[],
    )

    return { products, remaining }
  }, [productPages])

  return (
    <Container>
      <StatusContainer>
        <DescriptionTypography>Status</DescriptionTypography>
        <WHProductStatus status={filter} setStatus={setFilter} />
      </StatusContainer>

      <WHRestaurantsAutoComplete
        onValueChange={restaurant => {
          setRestaurantId(restaurant?.id ?? undefined)
        }}
      />

      <ListHeader sx={{ mt: 2 }}>
        <Typography textAlign="start" level="title-md">
          Products
        </Typography>

        {remaining > 0 && (
          <Typography sx={{ borderRadius: '6px', marginInline: 0 }}>
            | {remaining}
          </Typography>
        )}
      </ListHeader>

      <WHProductList
        products={products}
        isLoading={isLoading}
        canLoadMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      />
    </Container>
  )
}
