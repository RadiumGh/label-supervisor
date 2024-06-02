import { useMediaQuery } from '@mui/material'

export function useIsDesktopSize() {
  return useMediaQuery('(min-width:700px)')
}
