import { useState } from 'react'
import { Typography } from '@mui/joy'
import { ProductList, ProductStatus } from './components'
import { DescriptionTypography } from '../../components/description-typography'
import { ProductStatusType } from '../../logic'

export function Products() {
  const [filter, setFilter] = useState<ProductStatusType>(
    ProductStatusType.PENDING,
  )

  return (
    <>
      <Typography textAlign="start" level="title-md" sx={{ mb: 2 }}>
        Products
      </Typography>

      <DescriptionTypography>Filter by</DescriptionTypography>
      <ProductStatus status={filter} setStatus={setFilter} />

      <ProductList filter={filter} />
    </>
  )
}
