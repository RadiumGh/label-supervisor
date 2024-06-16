export interface UpdateCategoryDTO {
  id: number
  name: string
}

export interface CreateCategoryDTO {
  name: string
}

export interface Category {
  id: number
  name: string
}

export interface UpdateMasterProductDTO {
  id: number
  name: string
  categoryId: number
}

export interface CreateMasterProductDTO {
  name: string
  categoryId: number
}

export interface MasterProduct {
  id: number
  name: string
  categoryName?: string
  category?: Category
}

export interface UpdateProductMasterProductDTO {
  productId: number
  masterProductId: number
}

export enum ProductStatusType {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface Product {
  id: number
  name: string
  category: string
  masterProduct?: MasterProduct
}

export interface SearchProductsResponse {
  products: Product[]
  remaining: number
}

export interface ProgressResponse {
  completed: number
  total: number
}
