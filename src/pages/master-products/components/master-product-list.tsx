import { styled } from '@mui/joy'
import { Waypoint } from 'react-waypoint'
import { MasterProductCard } from './master-product-card'
import { Loading } from '../../../components/loading'
import { LoadingNextPage } from '../../../components/loading-next-page'
import { useSearchMasterProducts } from '../../../logic'
import { memo } from 'react'
import { NoResult } from '../../../components/no-result.tsx'

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
export const MasterProductList = memo(function ({ searchQuery }: Props) {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchMasterProducts({ search: searchQuery })

  const isLoading = isFetching && !isFetchingNextPage

  return isLoading ? (
    <Loading />
  ) : !data?.pages[0].length ? (
    <NoResult />
  ) : (
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
})
