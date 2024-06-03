import { useCallback, useState } from 'react'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import { IconButton, Input, styled, Tooltip, Typography } from '@mui/joy'
import { MasterProductList } from './components/master-product-list'
import { Category, useAppStore, useDebounce } from '../../logic'
import { DescriptionTypography } from '../../components/description-typography.tsx'
import { CategorySelect } from '../../components/category-select.tsx'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`

const HeaderContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const FiltersContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  gap: 8px;

  @media (min-width: 700px) {
    & > div {
      flex-basis: 50%;
    }

    flex-direction: row;
    margin-bottom: 10px;
  }
`

export function MasterProducts() {
  const [category, setCategory] = useState<Category | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery)

  const openCreateMasterProductModal = useCallback(() => {
    useAppStore.setState({ masterProductModalProps: {} })
  }, [])

  return (
    <Container>
      <HeaderContainer>
        <Typography level="title-md" sx={{ margin: 0 }}>
          Master Products
        </Typography>

        <Tooltip title="Create Master Product" variant="outlined">
          <IconButton
            variant="soft"
            color="primary"
            size="sm"
            onClick={openCreateMasterProductModal}
          >
            <AddRounded />
          </IconButton>
        </Tooltip>
      </HeaderContainer>

      <DescriptionTypography>Filters</DescriptionTypography>
      <FiltersContainer>
        <Input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          aria-placeholder="Search"
          endDecorator={<SearchRounded />}
        />

        <CategorySelect value={category} onValueChange={setCategory} />
      </FiltersContainer>

      <MasterProductList
        searchQuery={debouncedQuery}
        categoryId={category?.id ?? undefined}
      />
    </Container>
  )
}
