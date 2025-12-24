import { Category, Product } from './types';
import { BEEF_PRODUCTS } from './beefData';
import { PORK_PRODUCTS } from './porkData';
import { LAMB_PRODUCTS } from './lambData';
import { CHICKEN_PRODUCTS } from './chickenData';
import { SHRIMP_PRODUCTS } from './shrimpData';
import { GAME_HENS_PRODUCTS } from './gameHensData';
import { QUAILS_PRODUCTS } from './quailsData';
import { TURKEY_PRODUCTS } from './turkeyData';
import { PLATTER_BACON_PRODUCTS } from './platterBaconData';
import { SAUSAGE_PRODUCTS } from './sausageData';
import { CHEESE_PRODUCTS } from './cheeseData';
import { BLOOD_SAUSAGE_PRODUCTS } from './bloodSausageData';
import { CHICHARRON_PRODUCTS } from './chicharronData';
import { PATTIES_PRODUCTS } from './pattiesData';
import { CESINA_PRODUCTS } from './cesinaData';
import { JERKY_PRODUCTS } from './jerkyData';
import { BULK_LARD_PRODUCTS } from './bulkLardData';
import { RETAIL_SALES_PRODUCTS } from './retailSalesData';
import { SWEETS_PRODUCTS } from './sweetsData';
import { PREPARED_FOODS_PRODUCTS } from './preparedFoodsData';
import { PULPA_PRODUCTS } from './pulpaData';
import { SEASONING_PRODUCTS } from './seasoningData';
import { RETAIL_LARD_PRODUCTS } from './retailLardData';
import { CHARCOAL_PRODUCTS } from './charcoalData';
import { WHOLE_FISH_PRODUCTS } from './wholeFishData';
import { FILLETS_PRODUCTS } from './filletsData';
import { CRAB_PRODUCTS } from './crabData';
import { CLAMS_PRODUCTS } from './clamsData';
import { SCALLOPS_PRODUCTS } from './scallopsData';
import { SQUID_PRODUCTS } from './squidData';
import { MISC_PRODUCTS } from './miscData';
import { SPECIALS_PRODUCTS } from './specialsData';

export const CATEGORIES: Category[] = [
  // TOP 3 CORE PROTEINS
  { id: 'beef', name: 'Beef', icon: '🥩', borderColor: 'border-red-600', accentColor: 'bg-red-600', subcategories: ['Middle Cuts', 'End Cuts', 'Heads', 'Offal & Variety'] },
  { id: 'pork', name: 'Pork', icon: '🐖', borderColor: 'border-pink-500', accentColor: 'bg-pink-600', subcategories: ['Loin', 'Neckbone Fresh', 'Butt/Cushion', 'Picnic', 'Belly', 'Ribs', 'Smoked Loin', 'Pork Frozen Offal'] },
  { id: 'chicken', name: 'Chicken', icon: '🐔', borderColor: 'border-yellow-500', accentColor: 'bg-yellow-600', subcategories: ['Wogs', 'Yellow Chicken', 'Head on Feet on', 'Breast', 'Legs & Thighs', 'Wings', 'Prepared Frozen', 'Parts & Offal'] },
  
  // SEAFOOD VARIETIES
  { id: 'shrimp', name: 'Shrimp', icon: '🦐', borderColor: 'border-blue-400', accentColor: 'bg-blue-400', subcategories: ['Headless Blocks', 'Sunday Best', 'IQF Headless', 'Black Tiger Blocks', 'Head On Shrimp', 'Fresh Water', 'EZ Peel', 'P&D Tail Off', 'Cooked Tail Off', 'Breaded Shrimp'] },
  { id: 'whole-fish', name: 'Whole Fish', icon: '🐟', borderColor: 'border-blue-700', accentColor: 'bg-blue-700', subcategories: ['Whole Fish'] },
  { id: 'fillets', name: 'Fillets', icon: '🍣', borderColor: 'border-blue-500', accentColor: 'bg-blue-500', subcategories: ['Fillets'] },
  { id: 'crab', name: 'Crab & Imitation', icon: '🦀', borderColor: 'border-red-700', accentColor: 'bg-red-700', subcategories: ['Crab & Imitation'] },
  { id: 'clams', name: 'Clams & Mussels', icon: '🐚', borderColor: 'border-blue-300', accentColor: 'bg-blue-300', subcategories: ['Clams & Mussels'] },
  { id: 'scallops', name: 'Scallops', icon: '🍥', borderColor: 'border-pink-200', accentColor: 'bg-pink-200', subcategories: ['Scallops'] },
  { id: 'squid', name: 'Squid & Octopus', icon: '🦑', borderColor: 'border-purple-600', accentColor: 'bg-purple-600', subcategories: ['Squid & Octopus'] },

  // REMAINING MEATS
  { id: 'lamb', name: 'Lamb & Mutton', icon: '🐑', borderColor: 'border-orange-600', accentColor: 'bg-orange-600', subcategories: ['Lamb & Mutton'] },
  { id: 'game-hens', name: 'Game Hens', icon: '🐤', borderColor: 'border-yellow-300', accentColor: 'bg-yellow-300', subcategories: ['Game Hens'] },
  { id: 'quails', name: 'Quails', icon: '🐦', borderColor: 'border-gray-500', accentColor: 'bg-gray-500', subcategories: ['Quails'] },
  { id: 'turkey', name: 'Turkey', icon: '🦃', borderColor: 'border-amber-700', accentColor: 'bg-amber-700', subcategories: ['Turkey Deli Hams'] },
  { id: 'cesina', name: 'Don Pedro Cesina', icon: '🥩', borderColor: 'border-red-300', accentColor: 'bg-red-300', subcategories: ['Don Pedro Cesina'] },
  { id: 'jerky', name: "People's Choice Jerky", icon: '🍖', borderColor: 'border-amber-900', accentColor: 'bg-amber-900', subcategories: ["People's Choice Jerky"] },

  // DELI & CHEESE ITEMS
  { id: 'cheese', name: 'Deli & Bulk Cheese', icon: '🧀', borderColor: 'border-yellow-400', accentColor: 'bg-yellow-400', subcategories: ['Quesos & Cremas', 'Deli & Bulk Cheese'] },
  { id: 'hot-links', name: 'Hot Links & Sausage', icon: '🌭', borderColor: 'border-red-400', accentColor: 'bg-red-400', subcategories: ['Hot Links & Sausage'] },
  { id: 'blood-sausage', name: 'Pork Blood Sausage', icon: '🩸', borderColor: 'border-red-900', accentColor: 'bg-red-900', subcategories: ['Pork Blood Sausage'] },
  { id: 'chicharron', name: 'Chicharron Varieties', icon: '🥓', borderColor: 'border-orange-800', accentColor: 'bg-orange-800', subcategories: ['Chicharron Varieties'] },
  { id: 'deli-sales', name: 'Deli & Retail Sales', icon: '🏪', borderColor: 'border-green-600', accentColor: 'bg-green-600', subcategories: ['Pork Deli Meats', 'Pickled Products', 'Deli & Retail Salsas', 'Head Cheese'] },
  { id: 'prepared-foods', name: 'Prepared Foods-Tamales-Pupusas', icon: '🫔', borderColor: 'border-orange-400', accentColor: 'bg-orange-400', subcategories: ['Prepared Foods - Tamales - Pupusas'] },

  // THE REST
  { id: 'platter-bacon', name: 'Platter Bacon', icon: '🥓', borderColor: 'border-red-400', accentColor: 'bg-red-400', subcategories: ['Platter Bacon'] },
  { id: 'patties', name: 'Patties-Nuggets-Fries', icon: '🍔', borderColor: 'border-yellow-700', accentColor: 'bg-yellow-700', subcategories: ['Patties - Nuggets - Fries'] },
  { id: 'bulk-lard', name: 'Bulk Lard/Oil', icon: '🛢️', borderColor: 'border-gray-300', accentColor: 'bg-gray-300', subcategories: ['Bulk Lard/Oil'] },
  { id: 'retail-lard', name: 'Retail Lard', icon: '🥫', borderColor: 'border-gray-200', accentColor: 'bg-gray-200', subcategories: ['Retail Lard'] },
  { id: 'sweets', name: 'Ates-Cajetas-Dulce de Leche', icon: '🍯', borderColor: 'border-yellow-200', accentColor: 'bg-yellow-200', subcategories: ['Ates - Cajetas - Dulce de Leche'] },
  { id: 'pulpa', name: 'Pulpa de Aguacate', icon: '🥑', borderColor: 'border-green-400', accentColor: 'bg-green-400', subcategories: ['Pulpa de Aguacate'] },
  { id: 'seasonings', name: 'Marinades & Seasonings', icon: '🧂', borderColor: 'border-red-500', accentColor: 'bg-red-500', subcategories: ['Marinades & Seasonings'] },
  { id: 'charcoal', name: 'Mesquite Natural Charcoal', icon: '🔥', borderColor: 'border-zinc-500', accentColor: 'bg-zinc-700', subcategories: ['Mesquite Charcoal'] },
  { id: 'misc', name: 'Misc Items', icon: '📦', borderColor: 'border-gray-400', accentColor: 'bg-gray-400', subcategories: ['Miscellaneous Items'] }
];

export const PRODUCTS: Product[] = [
  ...SPECIALS_PRODUCTS,
  ...BEEF_PRODUCTS,
  ...PORK_PRODUCTS,
  ...LAMB_PRODUCTS,
  ...CHICKEN_PRODUCTS,
  ...SHRIMP_PRODUCTS,
  ...GAME_HENS_PRODUCTS,
  ...QUAILS_PRODUCTS,
  ...TURKEY_PRODUCTS,
  ...PLATTER_BACON_PRODUCTS,
  ...SAUSAGE_PRODUCTS,
  ...CHEESE_PRODUCTS,
  ...BLOOD_SAUSAGE_PRODUCTS,
  ...CHICHARRON_PRODUCTS,
  ...PATTIES_PRODUCTS,
  ...CESINA_PRODUCTS,
  ...JERKY_PRODUCTS,
  ...BULK_LARD_PRODUCTS,
  ...RETAIL_SALES_PRODUCTS,
  ...SWEETS_PRODUCTS,
  ...PREPARED_FOODS_PRODUCTS,
  ...PULPA_PRODUCTS,
  ...SEASONING_PRODUCTS,
  ...RETAIL_LARD_PRODUCTS,
  ...CHARCOAL_PRODUCTS,
  ...WHOLE_FISH_PRODUCTS,
  ...FILLETS_PRODUCTS,
  ...CRAB_PRODUCTS,
  ...CLAMS_PRODUCTS,
  ...SCALLOPS_PRODUCTS,
  ...SQUID_PRODUCTS,
  ...MISC_PRODUCTS
];

export const SPECIAL_IDS = SPECIALS_PRODUCTS.map(p => p.id);