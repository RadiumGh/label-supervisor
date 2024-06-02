import { MasterProduct, Product } from './types'

export const mockedMasterProducts: MasterProduct[] = [
  { id: 1, name: 'Pizza-1' },
  { id: 2, name: 'Pasta-2' },
  { id: 3, name: 'Drinks-3' },
  { id: 4, name: 'Appetizer-4' },
  { id: 5, name: 'Pizza-5' },
  { id: 6, name: 'Pasta-6' },
  { id: 7, name: 'Drinks-7' },
  { id: 8, name: 'Appetizer-8' },
  { id: 9, name: 'Pizza-9' },
  { id: 10, name: 'Pasta-10' },
  { id: 11, name: 'Drinks-11' },
  { id: 12, name: 'Appetizer-12' },
  { id: 13, name: 'Pizza-13' },
  { id: 14, name: 'Pasta-14' },
  { id: 15, name: 'Drinks-15' },
  { id: 16, name: 'Appetizer-16' },
  { id: 17, name: 'Pizza-17' },
  { id: 18, name: 'Pasta-18' },
  { id: 19, name: 'Drinks-19' },
  { id: 20, name: 'Appetizer-20' },
  { id: 21, name: 'Pizza-21' },
  { id: 22, name: 'Pasta-22' },
  { id: 23, name: 'Drinks-23' },
  { id: 24, name: 'Appetizer-24' },
]

export const mockedProducts: Product[] = [
  {
    id: 0,
    name: 'Alfredo',
    category: 'Pasta',
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
