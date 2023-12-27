import { AppState } from './store.ts'

export const mockState: Partial<AppState> = {
  product: {
    id: 'product-id',
    label: 'American Pepperoni Pizza',
  },
  productType: 'food',

  predictedMasterCategories: [
    { id: 'master-1', label: 'American Pizza' },
    { id: 'master-2', label: 'Italian Pizza' },
    { id: 'master-3', label: 'Greek Pizza' },
  ],

  registeredCategories: [
    { id: 'category-1', label: 'pizza' },
    { id: 'category-2', label: 'sandwich' },
    { id: 'category-3', label: 'beverage' },
    { id: 'category-4', label: 'coffee' },
    { id: 'category-5', label: 'breakfast' },
    { id: 'category-6', label: 'dinner' },
  ],
}
