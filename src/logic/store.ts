import { create } from 'zustand'
import { ToastProps } from '../components/toast'
import { MasterProductModalProps } from '../components/modals'

export interface AppState {
  createCategoryModalIsOpen: boolean
  masterProductModalProps: MasterProductModalProps | undefined

  toastsQueue: ToastProps[]
}

export const useAppStore = create<AppState>()(() => ({
  createCategoryModalIsOpen: false,
  masterProductModalProps: undefined,

  toastsQueue: [],
}))
