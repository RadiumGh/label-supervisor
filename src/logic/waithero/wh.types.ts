export interface WHCategory {
  id: number
  name: string
}

export interface WHMasterProduct {
  id: number
  name: string
  categoryName?: string
  category?: WHCategory
}

export interface UpdateWHProductMasterProductDTO {
  productId: number
  masterProductId: number
}

export enum WHProductStatusType {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface WHProduct {
  id: number
  name: string
  category: string
  masterProduct?: WHMasterProduct
}

export interface SearchWHProductsResponse {
  products: WHProduct[]
  remaining: number
}