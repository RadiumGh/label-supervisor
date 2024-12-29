import { useEffect } from 'react'
import { Button, styled, ToggleButtonGroup } from '@mui/joy'
import { WHProductStatusType } from '../../../logic/waithero'
import { queryClient } from '../../../main'

const Buttons = styled(ToggleButtonGroup)`
  & > button {
    width: 50%;
    min-height: 42px;
    font-size: 14px;
  }
`

interface PropTypes {
  status: WHProductStatusType
  setStatus: (status: WHProductStatusType) => void
}

export function WHProductStatus({ status, setStatus }: PropTypes) {
  useEffect(() => {
    queryClient.resetQueries({
      queryKey: [
        'wh-products',
        status === WHProductStatusType.PENDING
          ? WHProductStatusType.COMPLETED
          : WHProductStatusType.PENDING,
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
        newType && setStatus(newType as WHProductStatusType)
      }
    >
      <Button value={WHProductStatusType.PENDING}>Pending</Button>
      <Button value={WHProductStatusType.COMPLETED}>Completed</Button>
    </Buttons>
  )
}
