import { styled } from '@mui/joy'
import { Waypoint } from 'react-waypoint'
import { MasterProductCard } from './master-product-card'
import { Loading } from '../../../components/loading'
import { LoadingNextPage } from '../../../components/loading-next-page'
import { useSearchMasterProducts } from '../../../logic'

const Container = styled('div')`
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  gap: 8px;
`

interface Props {
  searchQuery?: string
}
export function MasterProductList({ searchQuery }: Props) {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useSearchMasterProducts({ search: searchQuery })

  if (isLoading) return <Loading />
  return (
    <Container>
      {data?.pages.map(page =>
        page.map(masterProduct => (
          <MasterProductCard
            key={masterProduct.id}
            masterProduct={masterProduct}
          />
        )),
      )}

      {hasNextPage && (
        <Waypoint onEnter={() => fetchNextPage()}>
          <LoadingNextPage />
        </Waypoint>
      )}
    </Container>
  )
}
