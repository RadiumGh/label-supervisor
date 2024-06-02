import { create } from 'zustand'
import { ToastProps } from '../components/toast/api'

export interface AppState {
  createMasterProductModalIsOpen: boolean
  toastsQueue: ToastProps[]
}

export const useAppStore = create<AppState>()(() => ({
  createMasterProductModalIsOpen: false,
  toastsQueue: [],
}))
