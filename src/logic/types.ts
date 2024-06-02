export interface UpdateMasterProductDTO {
  id: number
  name: string
}

export interface CreateMasterProductDTO {
  name: string
}

export interface MasterProduct {
  id: number
  name: string
  categoryName?: string
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
