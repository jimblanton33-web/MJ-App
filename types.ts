export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string; // Per pound
  category: string;
  subcategory: string;
  unit: string;
  caseWeight: number; // Pounds per case (usually 40, sometimes 20, 15 etc)
  isSpecial?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  borderColor: string;
  accentColor: string; // Tailwind color class for subcategories
  subcategories: string[];
}

export interface CartItem extends Product {
  cases: number;
}

export interface OrderHistoryItem {
  id: string;
  timestamp: string;
  deliveryDate: string | null;
  items: CartItem[];
  total: number;
}

// Update AppState to include saved items for the favorites feature
export interface AppState {
  isLoggedIn: boolean;
  currentUser: string;
  view: ViewType;
  viewHistory: ViewType[];
  selectedCategory: Category | null;
  selectedSubcategory: string | null;
  cart: CartItem[];
  orderHistory: OrderHistoryItem[];
  savedProductIds: string[];
  searchQuery: string;
  deliveryDate: string | null;
}

export enum ViewType {
  LOGIN = 'login',
  HOME = 'home',
  CATEGORY = 'category',
  SPECIALS = 'specials',
  CHECKOUT = 'checkout',
  CONFIRMATION = 'confirmation',
  HISTORY = 'history',
  SAVED = 'saved',
  REP_CONTACT = 'rep_contact'
}