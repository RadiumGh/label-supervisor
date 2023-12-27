export interface LabeledEntity {
  label: string
  id: string
}

export type ProductType = 'food' | 'beverage'

export type Product = LabeledEntity
export type Category = LabeledEntity
export type MasterProduct = LabeledEntity
export type MasterCategory = LabeledEntity

export interface CustomMasterProduct {
  label: string
}

export interface CustomMasterCategory {
  label: string
}
