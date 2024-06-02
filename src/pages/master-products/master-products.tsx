import { useCallback, useState } from 'react'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import { IconButton, Input, styled, Tooltip, Typography } from '@mui/joy'
import { MasterProductList } from './components/master-product-list'
import { useAppStore, useDebounce } from '../../logic'

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

export function MasterProducts() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery)

  const openCreateMasterProductModal = useCallback(() => {
    useAppStore.setState({ createMasterProductModalIsOpen: true })
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

      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        sx={{ py: 1.5, flexShrink: 0 }}
        placeholder="Search..."
        aria-placeholder="Search"
        endDecorator={<SearchRounded />}
      />

      <MasterProductList searchQuery={debouncedQuery} />
    </Container>
  )
}
