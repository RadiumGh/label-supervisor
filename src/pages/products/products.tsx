import { useMemo, useState } from 'react'
import { Input, styled, Typography } from '@mui/joy'
import { ProductList, ProductStatus, Progress } from './components'
import { DescriptionTypography } from '../../components/description-typography'
import { Product, ProductStatusType, useSearchProducts } from '../../logic'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const FiltersContainer = styled('div')`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  & > div {
    display: flex;
    flex-direction: column;

    :first-child {
      width: 60%;
    }

    :last-child {
      width: calc(40% - 8px);
    }
  }
`

const ListHeader = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`

export function Products() {
  const [filter, setFilter] = useState<ProductStatusType>(
    ProductStatusType.PENDING,
  )

  const [startId, setStartId] = useState<string>('')

  const {
    data: productPages,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchProducts(filter, Number(startId))

  const isLoading = isFetching && !isFetchingNextPage

  const { products, remaining } = useMemo(() => {
    if (!productPages?.pages?.length) return { products: [], remaining: 0 }

    const remaining = productPages.pages[0].remaining
    const products = productPages.pages.reduce(
      (acc, page) => acc.concat(page.products),
      [] as Product[],
    )

    return { products, remaining }
  }, [productPages])

  return (
    <Container>
      <Progress />

      <FiltersContainer>
        <div>
          <DescriptionTypography sx={{ mb: 0.5 }}>Status</DescriptionTypography>
          <ProductStatus status={filter} setStatus={setFilter} />
        </div>

        <div>
          <DescriptionTypography sx={{ mb: 0.5 }}>
            Start Id
          </DescriptionTypography>

          <Input
            placeholder="Default: 0"
            value={startId}
            sx={{ py: 1, flexShrink: 1 }}
            onChange={e => {
              const value = e.target.value
              setStartId(value ? value.replace(/[^0-9]/i, '') : '')
            }}
          />
        </div>
      </FiltersContainer>

      <ListHeader>
        <Typography textAlign="start" level="title-md">
          Products
        </Typography>

        {remaining > 0 && (
          <Typography sx={{ borderRadius: '6px', marginInline: 0 }}>
            | {remaining}
          </Typography>
        )}
      </ListHeader>

      <ProductList
        products={products}
        isLoading={isLoading}
        canLoadMore={hasNextPage}
        loadMore={() => fetchNextPage()}
      />
    </Container>
  )
}
