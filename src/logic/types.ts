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

// export interface LabeledEntity {
//   label: string
//   id: string
// }
//
// export type ProductType = 'food' | 'beverage'
//
// export type Product = LabeledEntity
// export type Category = LabeledEntity
// export type MasterProduct = LabeledEntity
// export type MasterCategory = LabeledEntity
//
// export interface CustomMasterProduct {
//   label: string
// }
//
// export interface CustomMasterCategory {
//   label: string
// }
