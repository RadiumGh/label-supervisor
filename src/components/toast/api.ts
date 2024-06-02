import { v4 as uuid } from 'uuid'
import { useAppStore } from '../../logic'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastProps {
  id: string
  type: ToastType
  text: string
}

export function showToast(text = '', type: ToastType = 'info') {
  useAppStore.setState(({ toastsQueue }) => ({
    toastsQueue: toastsQueue.concat([{ id: uuid(), text, type }]),
  }))
}

export function popTopToast() {
  const { toastsQueue } = useAppStore.getState()
  useAppStore.setState({ toastsQueue: toastsQueue.slice(1) })
}
