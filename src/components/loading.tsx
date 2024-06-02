import { CircularProgress, styled } from '@mui/joy'

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;
`

export function Loading() {
  return (
    <Container>
      <CircularProgress size="lg" />
    </Container>
  )
}
