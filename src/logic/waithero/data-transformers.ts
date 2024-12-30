import {
  WHMasterProduct,
  SearchWHProductsResponse,
  SearchWHProductsUntransformedResponse,
  SearchWHMasterProductsUntransformedResponse,
  WHUnTransformedProduct,
  WHProduct,
} from './wh.types'

export const transformWHProduct = (
  rawProduct: WHUnTransformedProduct,
): WHProduct => ({
  id: rawProduct.id,
  name: rawProduct.name,
  category: rawProduct.categoryRestaurant?.name ?? '',
  masterProduct: rawProduct.product
    ? {
        id: rawProduct.product.id,
        name: rawProduct.product.name,
      }
    : undefined,
})

export const transformWHSearchProductsResponse = (
  rawResponse: SearchWHProductsUntransformedResponse,
): SearchWHProductsResponse => {
  const { totalElements, list } = rawResponse || {}
  if (!totalElements) return { products: [], remaining: 0 }

  return {
    remaining: totalElements,
    products: list.map(transformWHProduct),
  }
}

export const transformWHSearchMasterProductsResponse = (
  rawResponse: SearchWHMasterProductsUntransformedResponse,
): WHMasterProduct[] => {
  const { totalElements, list } = rawResponse || {}
  if (!totalElements) return []

  return list.map(rawMP => ({
    id: rawMP.id,
    name: rawMP.name,
    category: rawMP.category,
    categoryName: rawMP.category?.name ?? '',
  }))
}
