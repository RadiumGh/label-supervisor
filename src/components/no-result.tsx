import { styled, Typography } from '@mui/joy'

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;
`

export function NoResult() {
  return (
    <Container>
      <Typography color="neutral" level="body-lg">
        No Result Found!
      </Typography>
    </Container>
  )
}
