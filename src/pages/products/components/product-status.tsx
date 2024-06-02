import { Button, styled, ToggleButtonGroup } from '@mui/joy'
import { ProductStatusType } from '../../../logic'
import { useEffect } from 'react'
import { queryClient } from '../../../main.tsx'

const Buttons = styled(ToggleButtonGroup)`
  margin: 8px 0 20px 0;
  & > button {
    width: 50%;
  }
`

interface PropTypes {
  status: ProductStatusType
  setStatus: (status: ProductStatusType) => void
}

export function ProductStatus({ status, setStatus }: PropTypes) {
  useEffect(() => {
    queryClient.resetQueries({
      queryKey: [
        'products',
        status === ProductStatusType.PENDING
          ? ProductStatusType.COMPLETED
          : ProductStatusType.PENDING,
      ],
    })
  }, [status])

  return (
    <Buttons
      size="lg"
      color="neutral"
      variant="outlined"
      value={status}
      onChange={(_: unknown, newType) =>
        newType && setStatus(newType as ProductStatusType)
      }
    >
      <Button value={ProductStatusType.PENDING}>Pending</Button>
      <Button value={ProductStatusType.COMPLETED}>Completed</Button>
    </Buttons>
  )
}
