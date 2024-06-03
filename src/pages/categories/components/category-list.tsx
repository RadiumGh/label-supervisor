import { useMemo } from 'react'
import { styled } from '@mui/joy'
import { CategoryCard } from './category-card'
import { Loading } from '../../../components/loading'
import { NoResult } from '../../../components/no-result'
import { useCategories } from '../../../logic'

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
export function CategoryList({ searchQuery }: Props) {
  const { data, isFetching } = useCategories()

  const searchResult = useMemo(() => {
    if (!data?.length) return []

    if (!searchQuery) return data
    return data.filter(category =>
      category.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    )
  }, [searchQuery, data])

  return isFetching ? (
    <Loading />
  ) : !searchResult?.length ? (
    <NoResult />
  ) : (
    <Container>
      {searchResult.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Container>
  )
}
