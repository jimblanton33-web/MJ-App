import { Product } from './types';

export const CHEESE_PRODUCTS: Product[] = [
  // Quesos & Cremas
  { id: 'c-qc-1', name: 'Queso Fresco', brand: 'Los Altos', price: '4.49', category: 'cheese', subcategory: 'Quesos & Cremas', unit: 'lb', caseWeight: 20 },
  { id: 'c-qc-2', name: 'Cotija Enchilado', brand: 'Rincon de Mich.', price: '5.99', category: 'cheese', subcategory: 'Quesos & Cremas', unit: 'lb', caseWeight: 20 },
  { id: 'c-qc-3', name: 'Queso Oaxaca', brand: 'Los Altos', price: '5.89', category: 'cheese', subcategory: 'Quesos & Cremas', unit: 'lb', caseWeight: 20 },
  { id: 'c-qc-4', name: 'Crema Mexicana', brand: 'Los Altos', price: '24.99', category: 'cheese', subcategory: 'Quesos & Cremas', unit: 'ea', caseWeight: 10 },

  // Deli & Bulk Cheese
  { id: 'c-bc-1', name: 'American sliced', brand: '4/5lb', price: '2.69', category: 'cheese', subcategory: 'Deli & Bulk Cheese', unit: 'lb', caseWeight: 20 },
  { id: 'c-bc-2', name: 'Monterrey Thick', brand: 'Shredded', price: '2.29', category: 'cheese', subcategory: 'Deli & Bulk Cheese', unit: 'lb', caseWeight: 20 },
  { id: 'c-bc-3', name: 'Swiss Cheese', brand: 'Bulk', price: '4.89', category: 'cheese', subcategory: 'Deli & Bulk Cheese', unit: 'lb', caseWeight: 20 },
  { id: 'c-bc-4', name: 'Cheddar Block', brand: 'Bulk', price: '3.59', category: 'cheese', subcategory: 'Deli & Bulk Cheese', unit: 'lb', caseWeight: 40 }
];