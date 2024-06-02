import { useAppStore } from '../../logic'
import { useMemo } from 'react'
import { ToastProps } from './api.ts'

export function useTopToast(): ToastProps | undefined {
  const queue = useAppStore(state => state.toastsQueue)
  return useMemo(() => queue[0], [queue])
}
