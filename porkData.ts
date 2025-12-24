import { Product } from './types';

export const PORK_PRODUCTS: Product[] = [
  // Loin
  { id: 'p-loin-1', name: 'Loin c.c. b/i', brand: 'Seaboard', price: '1.89', category: 'pork', subcategory: 'Loin', unit: 'lb', caseWeight: 40 },
  { id: 'p-loin-2', name: 'Loin boneless', brand: 'Seaboard', price: '1.89', category: 'pork', subcategory: 'Loin', unit: 'lb', caseWeight: 40 },
  { id: 'p-loin-3', name: 'Loin whole B/i', brand: 'Seaboard', price: '1.59', category: 'pork', subcategory: 'Loin', unit: 'lb', caseWeight: 40 },
  // Neckbone Fresh
  { id: 'p-nbf-1', name: 'Neck bones', brand: 'Seaboard', price: '1.59', category: 'pork', subcategory: 'Neckbone Fresh', unit: 'lb', caseWeight: 40 },
  // Butt/Cushion
  { id: 'p-bc-1', name: 'Butt B/i', brand: 'Seaboard', price: '1.59', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 60 },
  { id: 'p-bc-2', name: 'Butt B/i', brand: 'IBP', price: '1.69', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 60 },
  { id: 'p-bc-3', name: 'Butt Boneless', brand: 'IBP', price: '1.89', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 60 },
  { id: 'p-bc-4', name: 'Cushion meat', brand: 'Smithfield', price: '1.69', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 40 },
  { id: 'p-bc-5', name: 'Cushion meat', brand: 'IBP', price: '1.79', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 40 },
  { id: 'p-bc-6', name: 'Cushion meat', brand: 'Seaboard', price: '1.79', category: 'pork', subcategory: 'Butt/Cushion', unit: 'lb', caseWeight: 40 },
  // Picnic
  { id: 'p-pic-1', name: 'Picnic Bone In', brand: 'Seaboard', price: '1.59', category: 'pork', subcategory: 'Picnic', unit: 'lb', caseWeight: 60 },
  { id: 'p-pic-2', name: 'Picnic boneless', brand: 'IBP', price: '1.79', category: 'pork', subcategory: 'Picnic', unit: 'lb', caseWeight: 60 },
  { id: 'p-pic-3', name: 'Picnic bnls frozen', brand: 'IBP', price: '1.59', category: 'pork', subcategory: 'Picnic', unit: 'lb', caseWeight: 60 },
  // Belly
  { id: 'p-bel-1', name: 'Bellies fresh', brand: 'Yosemite', price: '3.59', category: 'pork', subcategory: 'Belly', unit: 'lb', caseWeight: 40 },
  { id: 'p-bel-2', name: 'Bellies fz', brand: 'IBP', price: '3.59', category: 'pork', subcategory: 'Belly', unit: 'lb', caseWeight: 40 },
  { id: 'p-bel-3', name: 'Bellies fresh', brand: 'IBP', price: '3.79', category: 'pork', subcategory: 'Belly', unit: 'lb', caseWeight: 40 },
  // Ribs
  { id: 'p-rib-1', name: 'Baby back ribs', brand: 'Seaboard', price: '3.59', category: 'pork', subcategory: 'Ribs', unit: 'lb', caseWeight: 40 },
  { id: 'p-rib-2', name: 'Spare ribs Med', brand: 'Swift', price: '2.19', category: 'pork', subcategory: 'Ribs', unit: 'lb', caseWeight: 40 },
  { id: 'p-rib-3', name: 'Spare ribs Med', brand: 'Seaboard/lb', price: '2.29', category: 'pork', subcategory: 'Ribs', unit: 'lb', caseWeight: 40 },
  { id: 'p-rib-4', name: 'Spare ribs frozen', brand: 'Seaboard', price: '1.99', category: 'pork', subcategory: 'Ribs', unit: 'lb', caseWeight: 40 },
  // Smoked Loin
  { id: 'p-sl-1', name: 'Smoked loin', brand: 'Bar-m', price: '3.29', category: 'pork', subcategory: 'Smoked Loin', unit: 'lb', caseWeight: 40 },
  { id: 'p-sl-2', name: 'Smoked loin', brand: 'Dubuque', price: '3.39', category: 'pork', subcategory: 'Smoked Loin', unit: 'lb', caseWeight: 40 },
  // Frozen Offal
  { id: 'p-fo-1', name: 'Neck bones fz', brand: 'Seaboard', price: '0.99', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-2', name: 'Neck bones fz', brand: 'Hacienda', price: 'Market', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-3', name: 'Front feet', brand: 'Seaboard', price: '1.19', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-4', name: 'Front feet', brand: 'Sasa', price: '1.59', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-5', name: 'Cut Pig feet', brand: 'Packer', price: '2.50', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-6', name: 'Shanks', brand: 'Proan', price: '2.79', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-7', name: 'Heads', brand: 'Packer', price: '1.90', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'ea', caseWeight: 1 },
  { id: 'p-fo-8', name: 'Ears', brand: 'Packer', price: '2.59', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-9', name: 'Tongues', brand: 'Packer', price: '2.99', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-10', name: 'Snouts', brand: 'IBP', price: '1.29', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-11', name: 'Hearts', brand: 'Yosemite', price: '1.29', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-12', name: 'Stomach', brand: 'Costa Brava', price: '1.79', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-13', name: 'Stomach', brand: 'IBP', price: '2.09', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-14', name: 'Livers', brand: 'Yosemite', price: '1.39', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-15', name: 'Kidneys', brand: 'Norson', price: '1.29', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-16', name: 'Uterus', brand: 'IBP', price: '1.79', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 40 },
  { id: 'p-fo-17', name: 'Hog Casing', brand: '1/bag', price: '18.00', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'lb', caseWeight: 1 },
  { id: 'p-fo-18', name: 'Hog Casing', brand: 'box/10pc', price: '15.00', category: 'pork', subcategory: 'Pork Frozen Offal', unit: 'box', caseWeight: 10 }
];