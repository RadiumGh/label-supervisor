import { styled } from '@mui/joy'
import { Waypoint } from 'react-waypoint'
import { WHProductCard } from './wh-product-card'
import { Loading } from '../../../components/loading'
import { NoResult } from '../../../components/no-result'
import { LoadingNextPage } from '../../../components/loading-next-page'
import { WHProduct } from '../../../logic/waithero'

const ListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden auto;
`

interface Props {
  isLoading: boolean
  products: WHProduct[]
  canLoadMore: boolean
  loadMore: () => void
}

export function WHProductList({
  products,
  isLoading,
  canLoadMore,
  loadMore,
}: Props) {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !products.length ? (
        <NoResult />
      ) : (
        <ListContainer>
          {products.map(product => (
            <WHProductCard key={product.id} product={product} />
          ))}

          {canLoadMore && (
            <Waypoint onEnter={loadMore}>
              <LoadingNextPage text="Loading More Products" />
            </Waypoint>
          )}
        </ListContainer>
      )}
    </>
  )
}
