import { extendTheme } from '@mui/joy'

export const theme = extendTheme({
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          padding: '10px 12px',
          flexShrink: 0,
        },
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: {
          minWidth: '375px',
        },
      },
    },
    JoyTooltip: {
      defaultProps: {
        enterDelay: 500,
      },
    },
  },
})
