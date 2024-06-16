import { useMemo } from 'react'
import { LinearProgress, Skeleton, styled, Typography } from '@mui/joy'
import { useProgress } from '../../../logic'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledProgressBar = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    color: #59cd93;
  }
`

export function Progress() {
  const { data, isFetching: isLoading } = useProgress()

  const { progressValue, displayValue } = useMemo(() => {
    if (!data) return { progressValue: 0, displayValue: '0' }

    const { completed, total } = data
    const value = Math.round((completed / total) * 100)

    return { progressValue: value, displayValue: value.toFixed(1) }
  }, [data])

  return (
    <Container>
      <Header>
        <Typography textAlign="start" level="title-md">
          Total Progress
        </Typography>

        <Typography fontWeight={500} level="body-sm">
          <Skeleton
            loading={isLoading}
          >{`${data?.completed} / ${data?.total}`}</Skeleton>
        </Typography>
      </Header>

      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="32px" />
      ) : (
        <StyledProgressBar
          determinate
          variant="outlined"
          color="neutral"
          size="sm"
          thickness={24}
          value={progressValue}
          sx={{
            '--LinearProgress-radius': '8px',
            '--LinearProgress-thickness': '32px',
          }}
        >
          <Typography
            level="body-xs"
            fontWeight="500"
            textColor="common.black"
            variant="soft"
            sx={{
              zIndex: 1,
              backgroundColor: 'common.white',
              borderRadius: 10,
            }}
          >
            {displayValue} %
          </Typography>
        </StyledProgressBar>
      )}
    </Container>
  )
}
