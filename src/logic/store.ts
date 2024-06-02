import { create } from 'zustand'

export interface AppState {
  createMasterProductModalIsOpen: boolean
}

export const useAppStore = create<AppState>()(() => ({
  createMasterProductModalIsOpen: false,
}))
