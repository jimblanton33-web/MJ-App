import { Product } from './types';

export const RETAIL_SALES_PRODUCTS: Product[] = [
  // Pork Deli
  { id: 'drs-1', name: 'Ham Picnic 4x6', brand: 'Celebrity', price: '3.89', category: 'deli-sales', subcategory: 'Pork Deli Meats', unit: 'lb', caseWeight: 24 },
  { id: 'drs-2', name: 'Ham Cooked 4x6', brand: 'Farmland', price: '2.89', category: 'deli-sales', subcategory: 'Pork Deli Meats', unit: 'lb', caseWeight: 24 },

  // Pickled
  { id: 'drs-3', name: 'Pickled Rinds 4lb', brand: 'Durango', price: '32.99', category: 'deli-sales', subcategory: 'Pickled Products', unit: 'ea', caseWeight: 4 },
  { id: 'drs-4', name: 'Pickled Pigs Feet', brand: 'Hormel', price: '38.99', category: 'deli-sales', subcategory: 'Pickled Products', unit: 'ea', caseWeight: 10 },

  // Salsas
  { id: 'drs-5', name: 'Quemada Salsa 1/25lb', brand: 'El Campestre', price: '48.99', category: 'deli-sales', subcategory: 'Deli & Retail Salsas', unit: 'ea', caseWeight: 25 },
  { id: 'drs-6', name: 'Verde Salsa 12/16oz', brand: 'El Campestre', price: '29.99', category: 'deli-sales', subcategory: 'Deli & Retail Salsas', unit: 'box', caseWeight: 12 },
  { id: 'drs-7', name: 'Salsa Roja 1/25lb', brand: 'El Campestre', price: '48.99', category: 'deli-sales', subcategory: 'Deli & Retail Salsas', unit: 'ea', caseWeight: 25 },

  // Head Cheese
  { id: 'drs-8', name: 'Regular Head Cheese', brand: 'Fud', price: '4.39', category: 'deli-sales', subcategory: 'Head Cheese', unit: 'lb', caseWeight: 10 },
  { id: 'drs-9', name: 'Hot Head Cheese', brand: 'Bar-M', price: '4.59', category: 'deli-sales', subcategory: 'Head Cheese', unit: 'lb', caseWeight: 10 }
];