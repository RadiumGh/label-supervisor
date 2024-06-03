import { ComponentType, useEffect, useState } from 'react'
import {
  CheckCircleRounded,
  ErrorRounded,
  WarningRounded,
  InfoRounded,
} from '@mui/icons-material'
import { Snackbar, SnackbarProps } from '@mui/joy'
import { popTopToast, ToastType } from './api'
import { useTopToast } from './hooks'

const typeToColor: Record<ToastType, SnackbarProps['color']> = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger',
}

const typeToIcon: Record<ToastType, ComponentType> = {
  info: InfoRounded,
  success: CheckCircleRounded,
  warning: WarningRounded,
  error: ErrorRounded,
}

export function Toast() {
  const [open, setOpen] = useState(false)

  const topToast = useTopToast()

  useEffect(() => {
    if (!topToast) return
    setOpen(true)
  }, [topToast])

  const closeToastAndShowNext = () => {
    setOpen(false)
    setTimeout(() => popTopToast(), 300)
  }

  if (!topToast) return null
  const { type, text } = topToast

  const DecoratorComponent = typeToIcon[type]
  return (
    <Snackbar
      open={open}
      variant="soft"
      autoHideDuration={2000}
      color={typeToColor[type] ?? 'primary'}
      startDecorator={<DecoratorComponent />}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ textAlign: 'start' }}
      onClose={closeToastAndShowNext}
    >
      {text}
    </Snackbar>
  )
}
