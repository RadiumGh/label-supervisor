import { Typography } from '@mui/joy'

export function LoadingPage() {
  return (
    <Typography
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      loading product...
    </Typography>
  )
}
