import { create } from 'zustand'
import { Product, Category, MasterCategory, ProductType } from './types.ts'

export interface AppState {
  loading: boolean
  submitting: boolean

  product: Product | null
  productType: ProductType | undefined

  predictedMasterCategories: MasterCategory[]
  registeredCategories: Category[]

  selectedMasterCategory: string | 'custom'
  selectedRegisteredCategory: undefined | Category
}

export const useAppStore = create<AppState>()(() => ({
  loading: true,
  submitting: false,

  product: null,
  productType: undefined,

  predictedMasterCategories: [],

  selectedMasterProduct: '',
  registeredCategories: [],

  selectedMasterCategory: '',
  selectedRegisteredCategory: undefined,
}))
