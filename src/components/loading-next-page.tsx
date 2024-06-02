import { RefObject } from 'react'
import { CircularProgress, styled, Typography } from '@mui/joy'

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
`

interface Props {
  text?: string
  innerRef?: RefObject<HTMLDivElement>
}

export function LoadingNextPage({ text, innerRef }: Props) {
  return (
    <Container ref={innerRef}>
      <CircularProgress color="neutral" size="sm" />
      <Typography color="neutral">{text ?? 'Loading More'}</Typography>
    </Container>
  )
}
