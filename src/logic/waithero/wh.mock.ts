import {
  WHCategory,
  WHMasterProduct,
  WHProduct,
  WHRestaurant,
} from './wh.types'

export const mockedCategories: WHCategory[] = [
  { id: 1, name: 'Category-1' },
  { id: 2, name: 'Category-2' },
  { id: 3, name: 'Category-3' },
  { id: 4, name: 'Category-4' },
]

export const mockedMasterProducts: WHMasterProduct[] = [
  {
    id: 1,
    name: 'Prosecco Valdobbiade',
    categoryName: 'Category-1',
    category: mockedCategories[0],
  },
  { id: 2, name: 'Pasta-2' },
  { id: 3, name: 'Drinks-3' },
  {
    id: 4,
    name: 'Appetizer-4',
    categoryName: 'Category-4',
    category: mockedCategories[3],
  },
]

export const mockedProducts: WHProduct[] = [
  {
    id: 0,
    name: 'Prosecco Valdobbiadene DOC (Veneto) [CLONE]',
    category: 'COCKTAIL CLASSICI E SIGNATURE',
  },
  {
    id: 1,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 2,
    name: 'Alfredo',
    category: 'Pasta',
  },
  {
    id: 3,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 4,
    name: 'Alfredo',
    category: 'Pasta',
  },
  {
    id: 5,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 6,
    name: 'Alfredo',
    category: 'Pasta',
  },
  {
    id: 7,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 8,
    name: 'Alfredo',
    category: 'Pasta',
  },
  {
    id: 9,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 10,
    name: 'Alfredo',
    category: 'Pasta',
  },
  {
    id: 11,
    name: 'Pepperoni',
    category: 'Pizza',
    masterProduct: mockedMasterProducts[0],
  },
  {
    id: 12,
    name: 'Alfredo',
    category: 'Pasta',
  },
]

export const mockedRestaurants: WHRestaurant[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
].map(id => ({ id, name: `Restaurant ${id}` }))

export const generatedProducts: WHProduct[] = new Array(200)
  .fill(null)
  .map((_, index) => {
    const referenceProduct = mockedProducts[index % mockedProducts.length]

    return {
      ...referenceProduct,
      id: index,
    }
  })
