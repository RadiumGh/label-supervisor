import { useEffect } from 'react'
import { styled } from '@mui/joy'
import { Product } from './components/product.tsx'
import { ProductType } from './components/product-type.tsx'
import { PredictedMasterCategories } from './components/predicted-master-categories.tsx'
import { AppSkeleton } from './components/skeleton.tsx'
import { useAppStore, fetchData } from './logic'
import './App.css'

const Container = styled('div')`
  height: 100%;
  width: 100%;
  max-width: min(640px, 100%);

  animation-name: fade-in;
  animation-duration: 300ms;

  @keyframes fade-in {
    from {
      transform: translateY(-10px);
      opacity: 0.3;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export function App() {
  const loading = useAppStore(state => state.loading)

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <AppSkeleton />
  return (
    <Container>
      <Product />
      <ProductType />
      <PredictedMasterCategories />
    </Container>
  )
}
