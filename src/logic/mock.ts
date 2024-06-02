import { MasterProduct, Product } from './types'

export const mockedMasterProducts: MasterProduct[] = [
  {
    id: 1,
    name: 'Prosecco Valdobbiade',
    categoryName: 'Pizza',
  },
  { id: 2, name: 'Pasta-2' },
  { id: 3, name: 'Drinks-3' },
  { id: 4, name: 'Appetizer-4', categoryName: 'Appetizer' },
  { id: 5, name: 'Pizza-5' },
  { id: 6, name: 'Pasta-6' },
  { id: 7, name: 'Drinks-7', categoryName: 'Drinks' },
  { id: 8, name: 'Appetizer-8', categoryName: 'Appetizer' },
  { id: 9, name: 'Pizza-9', categoryName: 'Pizza' },
  { id: 10, name: 'Pasta-10', categoryName: 'Pasta' },
  { id: 11, name: 'Drinks-11' },
  { id: 12, name: 'Appetizer-12', categoryName: 'Appetizer' },
  { id: 13, name: 'Pizza-13', categoryName: 'Pizza' },
  { id: 14, name: 'Pasta-14' },
  { id: 15, name: 'Drinks-15', categoryName: 'Drinks' },
  { id: 16, name: 'Appetizer-16', categoryName: 'Appetizer' },
  { id: 17, name: 'Pizza-17', categoryName: 'Pizza' },
  { id: 18, name: 'Pasta-18', categoryName: 'Pasta' },
  { id: 19, name: 'Drinks-19', categoryName: 'Drinks' },
  { id: 20, name: 'Appetizer-20', categoryName: 'Appetizer' },
  { id: 21, name: 'Pizza-21', categoryName: 'Pizza' },
  { id: 22, name: 'Pasta-22', categoryName: 'Pasta' },
  { id: 23, name: 'Drinks-23', categoryName: 'Drinks' },
  { id: 24, name: 'Appetizer-24', categoryName: 'Appetizer' },
]

export const mockedProducts: Product[] = [
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

export const generatedProducts: Product[] = new Array(200)
  .fill(null)
  .map((_, index) => {
    const referenceProduct = mockedProducts[index % mockedProducts.length]

    return {
      ...referenceProduct,
      id: index,
    }
  })
