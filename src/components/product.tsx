import { FormLabel, Typography } from '@mui/joy'
import { useAppStore } from '../logic'

export function Product() {
  const product = useAppStore(state => state.product)

  return (
    <>
      <FormLabel sx={{ color: 'background.tooltip' }}>product name</FormLabel>

      <Typography level="h3" textAlign="start" sx={{ marginBottom: 2 }}>
        {product?.label}
      </Typography>
    </>
  )
}
