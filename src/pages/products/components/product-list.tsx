import { useState } from 'react'
import { Input, styled } from '@mui/joy'
import { Waypoint } from 'react-waypoint'
import { ProductCard } from './product-card'
import { Loading } from '../../../components/loading'
import { LoadingNextPage } from '../../../components/loading-next-page'
import { ProductStatusType, useSearchProducts } from '../../../logic'
import { DescriptionTypography } from '../../../components/description-typography.tsx'
import { NoResult } from '../../../components/no-result.tsx'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;

  overflow: hidden auto;
`

interface Props {
  filter: ProductStatusType
}

export function ProductList({ filter }: Props) {
  const [startId, setStartId] = useState<string>('')

  const {
    data: productPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useSearchProducts(filter, Number(startId))

  return (
    <Container>
      <DescriptionTypography sx={{ mb: 0.5 }}>Start Id</DescriptionTypography>
      <Input
        placeholder="Enter a number (Default: 0)"
        value={startId}
        sx={{ mb: 1 }}
        onChange={e => {
          const value = e.target.value
          setStartId(value ? value.replace(/[^0-9]/i, '') : '')
        }}
      />

      {isLoading ? (
        <Loading />
      ) : !productPages?.pages[0].length ? (
        <NoResult />
      ) : (
        <ListContainer>
          {productPages?.pages.map(page =>
            page.map(product => (
              <ProductCard key={product.id} product={product} />
            )),
          )}

          {hasNextPage && (
            <Waypoint onEnter={() => fetchNextPage()}>
              <LoadingNextPage text="Loading More Products" />
            </Waypoint>
          )}
        </ListContainer>
      )}
    </Container>
  )
}
