import { Button, ToggleButtonGroup, styled, FormLabel } from '@mui/joy'
import { useAppStore } from '../logic'
import { ProductType as IProductType } from '../logic/types.ts'

const Buttons = styled(ToggleButtonGroup)`
  margin: 8px 0 20px 0;
  & > button {
    width: 50%;
  }
`

export function ProductType() {
  const productType = useAppStore(state => state.productType)

  const setProductType = (type: IProductType) =>
    useAppStore.setState({ productType: type })

  return (
    <>
      <FormLabel sx={{ color: 'background.tooltip' }}>product type</FormLabel>

      <Buttons
        size="lg"
        value={productType}
        onChange={(_: unknown, newType) => {
          setProductType(newType as IProductType)
        }}
      >
        <Button value="food">Food</Button>
        <Button value="beverage">Beverage</Button>
      </Buttons>
    </>
  )
}
