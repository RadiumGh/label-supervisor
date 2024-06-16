import { styled } from '@mui/joy'
import { Waypoint } from 'react-waypoint'
import { ProductCard } from './product-card'
import { Loading } from '../../../components/loading'
import { NoResult } from '../../../components/no-result'
import { LoadingNextPage } from '../../../components/loading-next-page'
import { Product } from '../../../logic'

const ListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden auto;
`

interface Props {
  isLoading: boolean
  products: Product[]
  canLoadMore: boolean
  loadMore: () => void
}

export function ProductList({
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
            <ProductCard key={product.id} product={product} />
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
