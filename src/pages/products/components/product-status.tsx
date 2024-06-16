import { useEffect } from 'react'
import { Button, styled, ToggleButtonGroup } from '@mui/joy'
import { ProductStatusType } from '../../../logic'
import { queryClient } from '../../../main'

const Buttons = styled(ToggleButtonGroup)`
  & > button {
    width: 50%;
    min-height: 42px;
    font-size: 14px;
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
