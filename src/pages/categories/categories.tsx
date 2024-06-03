import { useCallback, useState } from 'react'
import { AddRounded, SearchRounded } from '@mui/icons-material'
import { IconButton, Input, styled, Tooltip, Typography } from '@mui/joy'
import { CategoryList } from './components'
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

export function Categories() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300)

  const openCreateCategoryModal = useCallback(
    () => useAppStore.setState({ createCategoryModalIsOpen: true }),
    [],
  )

  return (
    <Container>
      <HeaderContainer>
        <Typography level="title-md" sx={{ margin: 0 }}>
          Categories
        </Typography>

        <Tooltip title="Create Category" variant="outlined">
          <IconButton
            variant="soft"
            color="primary"
            size="sm"
            onClick={openCreateCategoryModal}
          >
            <AddRounded />
          </IconButton>
        </Tooltip>
      </HeaderContainer>

      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search..."
        aria-placeholder="Search"
        endDecorator={<SearchRounded />}
      />

      <CategoryList searchQuery={debouncedQuery} />
    </Container>
  )
}
