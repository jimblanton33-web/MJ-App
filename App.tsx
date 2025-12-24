import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Mic, 
  ShoppingCart, 
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  DollarSign,
  X,
  Layers,
  User,
  AlertTriangle,
  MicOff,
  History,
  Heart,
  Home,
  Package,
  ArrowRight,
  LogOut,
  Check,
  ShieldCheck,
  CircleUser,
  Phone,
  MessageSquare,
  Mail,
  Briefcase
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, SPECIAL_IDS } from './data';
import { AppState, ViewType, Category, Product, CartItem, OrderHistoryItem } from './types';
import PromoBanner from './PromoBanner';

const stemWord = (word: string) => {
  const lowercase = word.toLowerCase().trim();
  if (lowercase.length > 3 && lowercase.endsWith('s')) return lowercase.slice(0, -1);
  return lowercase;
};

const SHIPPING_FEE = 49.99;
const FREE_SHIPPING_MIN_CASES = 10;

const AnimatedPigLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-1" style={{ filter: 'drop-shadow(0 5px 15px rgba(219, 39, 119, 0.4))' }}>
    {/* Ears */}
    <path d="M25,35 Q15,15 35,25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2.5" />
    <path d="M75,35 Q85,15 65,25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2.5" />
    {/* Head */}
    <circle cx="50" cy="55" r="35" fill="#FFC0CB" stroke="#FF69B4" strokeWidth="2.5" />
    {/* Snout */}
    <ellipse cx="50" cy="65" rx="14" ry="9" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2.5" />
    <circle cx="45" cy="65" r="2.5" fill="#8B4513" />
    <circle cx="55" cy="65" r="2.5" fill="#8B4513" />
    {/* Eyes */}
    <circle cx="38" cy="50" r="3.5" fill="#1a1a1a" /> {/* Left Eye */}
    <circle cx="62" cy="50" r="3.5" fill="#1a1a1a" className="animate-wink" /> {/* Winking Eye */}
    {/* Cheeks */}
    <circle cx="30" cy="62" r="4" fill="#FF69B4" opacity="0.3" />
    <circle cx="70" cy="62" r="4" fill="#FF69B4" opacity="0.3" />
  </svg>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    currentUser: 'M&J_Member_77',
    view: ViewType.LOGIN,
    viewHistory: [],
    selectedCategory: null,
    selectedSubcategory: null,
    cart: [],
    orderHistory: [],
    savedProductIds: [],
    searchQuery: '',
    deliveryDate: null,
  });

  const [isListening, setIsListening] = useState(false);
  const [showVoiceScreen, setShowVoiceScreen] = useState(false);
  const [tempQuantities, setTempQuantities] = useState<Record<string, number>>({});
  const [animateCart, setAnimateCart] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const savedUserLocal = localStorage.getItem('mj_portal_user');
    const savedUserSession = sessionStorage.getItem('mj_portal_user');
    const savedUser = savedUserLocal || savedUserSession;

    const savedHistory = localStorage.getItem('mj_portal_history');
    const savedFavorites = localStorage.getItem('mj_portal_saved');
    
    setState(prev => ({
      ...prev,
      isLoggedIn: !!savedUser,
      currentUser: savedUser || 'M&J_Member_77',
      view: savedUser ? ViewType.HOME : ViewType.LOGIN,
      orderHistory: savedHistory ? JSON.parse(savedHistory) : [],
      savedProductIds: savedFavorites ? JSON.parse(savedFavorites) : [],
      viewHistory: savedUser ? [ViewType.LOGIN] : []
    }));
  }, []);

  const navigateTo = (newView: ViewType, updates = {}) => {
    setState(prev => ({
      ...prev,
      ...updates,
      view: newView,
      viewHistory: [...prev.viewHistory, prev.view]
    }));
  };

  const handleLogin = () => {
    const user = 'M&J_Member_77';
    setState(prev => ({ 
      ...prev, 
      isLoggedIn: true, 
      currentUser: user, 
      view: ViewType.HOME,
      viewHistory: [ViewType.LOGIN]
    }));

    if (rememberMe) {
      localStorage.setItem('mj_portal_user', user);
    } else {
      sessionStorage.setItem('mj_portal_user', user);
    }
  };

  const handleLogout = () => {
    setState(prev => ({ 
      ...prev, 
      isLoggedIn: false, 
      view: ViewType.LOGIN,
      viewHistory: [] 
    }));
    localStorage.removeItem('mj_portal_user');
    sessionStorage.removeItem('mj_portal_user');
  };

  const handleBack = () => {
    if (state.viewHistory.length === 0) {
      if (state.isLoggedIn) handleLogout();
      return;
    }

    const history = [...state.viewHistory];
    const prevView = history.pop() as ViewType;

    setState(prev => ({
      ...prev,
      view: prevView,
      viewHistory: history,
      selectedCategory: prevView === ViewType.HOME ? null : prev.selectedCategory,
      selectedSubcategory: prevView === ViewType.HOME ? null : prev.selectedSubcategory,
    }));
  };

  const toggleSaved = (productId: string) => {
    setState(prev => {
      const isSaved = prev.savedProductIds.includes(productId);
      const updated = isSaved 
        ? prev.savedProductIds.filter(id => id !== productId)
        : [...prev.savedProductIds, productId];
      
      localStorage.setItem('mj_portal_saved', JSON.stringify(updated));
      return { ...prev, savedProductIds: updated };
    });
  };

  const updateTempQty = (id: string, delta: number, min: number = 1) => {
    setTempQuantities(prev => ({ ...prev, [id]: Math.max(min, (prev[id] || min) + delta) }));
  };

  const addToCart = (product: Product) => {
    const minCases = product.isSpecial ? 5 : 1;
    const requestedCases = tempQuantities[product.id] || minCases;

    setState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => item.id === product.id ? { ...item, cases: item.cases + requestedCases } : item)
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, cases: requestedCases }] };
    });
    setTempQuantities(prev => ({ ...prev, [product.id]: minCases }));
  };

  const removeFromCart = (productId: string) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.id === productId);
      if (existing && existing.cases > 1) {
        return { ...prev, cart: prev.cart.map(item => item.id === productId ? { ...item, cases: item.cases - 1 } : item) };
      }
      return { ...prev, cart: prev.cart.filter(item => item.id !== productId) };
    });
  };

  const totals = useMemo(() => {
    const subtotal = state.cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.caseWeight * item.cases), 0);
    const totalCases = state.cart.reduce((sum, item) => sum + item.cases, 0);
    const totalItemsInCart = state.cart.length;
    const deliveryFee = (totalCases > 0 && totalCases < FREE_SHIPPING_MIN_CASES) ? SHIPPING_FEE : 0;
    return { subtotal, totalCases, totalItemsInCart, deliveryFee, grandTotal: subtotal + deliveryFee };
  }, [state.cart]);

  useEffect(() => {
    if (totals.totalCases > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totals.totalCases]);

  const filteredProducts = useMemo(() => {
    const q = stemWord(state.searchQuery);
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p => 
      stemWord(p.name).includes(q) || stemWord(p.brand).includes(q) || stemWord(p.category).includes(q)
    );
  }, [state.searchQuery]);

  const getCategoryCount = (catId: string) => PRODUCTS.filter(p => p.category === catId).length;
  const getSubcategoryCount = (catId: string, sub: string) => PRODUCTS.filter(p => p.category === catId && p.subcategory === sub).length;

  const confirmOrder = () => {
    const newOrder: OrderHistoryItem = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toLocaleString(),
      deliveryDate: state.deliveryDate,
      items: [...state.cart],
      total: totals.grandTotal
    };

    const updatedHistory = [newOrder, ...state.orderHistory];
    
    setState(prev => ({
      ...prev,
      orderHistory: updatedHistory,
      cart: [],
      deliveryDate: null,
      view: ViewType.CONFIRMATION,
      viewHistory: [...prev.viewHistory, prev.view]
    }));

    localStorage.setItem('mj_portal_history', JSON.stringify(updatedHistory));
  };

  const toggleVoiceCapture = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome or Safari.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setState(prev => ({ ...prev, searchQuery: transcript, view: ViewType.HOME }));
        setIsListening(false);
        setShowVoiceScreen(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const renderProductItem = (product: Product) => {
    const minCases = product.isSpecial ? 5 : 1;
    const currentQty = tempQuantities[product.id] || minCases;
    const caseTotal = (parseFloat(product.price) * product.caseWeight).toFixed(2);
    const isSaved = state.savedProductIds.includes(product.id);
    const cat = CATEGORIES.find(c => c.id === product.category);
    
    const accentClass = cat?.accentColor || 'bg-blue-600';
    const borderClass = cat?.borderColor || 'border-blue-600';
    const textColorClass = accentClass.replace('bg-', 'text-');
    
    return (
      <div key={product.id} className="bg-white/[0.05] border border-white/10 rounded-[2rem] p-5 flex flex-col gap-4 hover:bg-white/[0.08] transition-all group relative">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-lg text-white tracking-wide uppercase group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">{product.name}</h3>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 italic">{product.brand} • Case: {product.caseWeight}lb</p>
          </div>
          
          <div className="bg-black/80 px-4 py-3 rounded-2xl border border-white/10 text-right backdrop-blur-md min-w-[120px] flex flex-col gap-0.5 shrink-0">
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 leading-none">Price Breakdown</p>
            <div className="flex flex-col">
              <span className="text-xl font-black text-blue-400 tracking-tight leading-none">${caseTotal} <span className="text-[9px] text-gray-500 uppercase">Case</span></span>
              <span className="text-sm font-black text-green-400 tracking-tighter mt-1 leading-none">${product.price} <span className="text-[9px] text-gray-500 uppercase">lb</span></span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-start">
            <button 
              onClick={() => toggleSaved(product.id)}
              className={`shrink-0 p-2 rounded-xl transition-all border flex items-center justify-center shadow-md active:scale-90 ${
                isSaved 
                  ? `${accentClass} border-transparent text-white` 
                  : `bg-white/5 ${borderClass} ${textColorClass}`
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center bg-black/60 rounded-3xl p-1 border border-white/5 shadow-2xl">
              <button 
                onClick={() => updateTempQty(product.id, -1, minCases)} 
                className="w-12 h-12 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all tap-anim border border-red-500/20"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="flex-1 text-center">
                <span className="block text-2xl font-black text-white leading-none">{currentQty}</span>
                <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1 inline-block">Units</span>
              </div>
              <button 
                onClick={() => updateTempQty(product.id, 1, minCases)} 
                className="w-12 h-12 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-all tap-anim border border-blue-500/20"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <button onClick={() => addToCart(product)} className="bg-blue-600 hover:bg-blue-500 p-6 rounded-3xl shadow-2xl transition-all active:scale-95 group">
              <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    const showHeader = [ViewType.HOME, ViewType.CATEGORY, ViewType.SPECIALS, ViewType.HISTORY, ViewType.SAVED].includes(state.view);
    if (!showHeader) return null;

    return (
      <div id="main-header" className="sticky top-0 z-50 bg-black pt-6 pb-2 space-y-4 px-5 border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" placeholder="Search product matrix..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-blue-500/50 outline-none text-base font-medium text-white transition-all focus:bg-white/10 placeholder:text-gray-600"
              value={state.searchQuery} onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
            {state.searchQuery && (
              <button onClick={() => setState(prev => ({ ...prev, searchQuery: '' }))} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
          <button onClick={() => setShowVoiceScreen(true)} className="p-4 rounded-2xl bg-blue-600 border border-blue-400/50 text-white shadow-lg transition-all hover:scale-105 active:scale-90">
            <Mic className="w-6 h-6" />
          </button>
          <button onClick={handleBack} className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-90 shadow-lg group">
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">Back</span>
          </button>
        </div>
        
        <div className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2.5 flex justify-between items-center shadow-inner">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">Wholesale Network</span>
            <span className="text-xs font-black text-white uppercase italic tracking-tighter">M & J Seafood Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo(ViewType.LOGIN)} 
              className="flex items-center gap-3 px-3 py-1.5 bg-blue-900/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/10 transition-all group"
            >
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-[0.2em] baseline mb-1">Active Client</span>
                <span className="text-xs font-black text-blue-400 uppercase tracking-tight italic group-hover:text-blue-300">{state.currentUser}</span>
              </div>
              <CircleUser className="w-6 h-6 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderLogin = () => {
    if (state.isLoggedIn) {
      return (
        <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden bg-[#000]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70 scale-100" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2000&auto=format&fit=crop')`, filter: 'blur(10px) saturate(1.2) brightness(0.5)' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-blue-950/20 z-[1]" />
          
          <div className="relative z-10 w-full max-w-sm space-y-8">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-blue-600/20 border-2 border-blue-500/40 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <ShieldCheck className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Account Center</h2>
            </div>

            <div className="glass p-10 rounded-[3rem] shadow-2xl backdrop-blur-2xl bg-black/60 border border-white/10 space-y-8">
              <div className="space-y-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Signed In As</p>
                  <p className="text-xl font-black text-white tracking-wide uppercase italic">{state.currentUser}</p>
                </div>
                
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Network Access</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-sm font-black text-green-400 uppercase tracking-tighter">Connection Stable</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => navigateTo(ViewType.HOME)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-xs border border-white/10"
                >
                  Return to Matrix
                </button>
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-6 rounded-2xl transition-all uppercase tracking-widest text-base shadow-xl flex items-center justify-center gap-3"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out of Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden bg-[#000]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 scale-100" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2000&auto=format&fit=crop')`, filter: 'blur(6px) saturate(1.2) brightness(0.8)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-blue-950/20 z-[1]" />
        <div className="relative z-10 w-full max-w-sm text-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-8xl font-black text-blue-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none">M & J</h1>
            <div className="space-y-3">
              <p className="text-lg text-white font-bold uppercase tracking-[0.05em] italic">Quality Meats, Seafood, and Supplies</p>
              <p className="text-2xl text-blue-500 font-black uppercase tracking-[0.2em]">Wholesale Portal</p>
            </div>
          </div>
          <div className="glass p-10 rounded-[3rem] shadow-2xl backdrop-blur-2xl bg-black/40 border border-white/10">
            <div className="space-y-5">
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  value="M&J_Member_77"
                  readOnly
                  placeholder="Username" 
                  className="w-full bg-black/60 border border-white/20 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-base font-medium" 
                />
              </div>
              <div className="relative group">
                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  value="••••••••"
                  readOnly
                  placeholder="Password" 
                  className="w-full bg-black/60 border border-white/20 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-base font-medium" 
                />
              </div>
              
              <button 
                onClick={() => setRememberMe(!rememberMe)} 
                className="w-full flex items-center gap-3 px-1 py-2 text-left transition-all active:scale-95 group"
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-blue-600 border-transparent shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'border-white/20 bg-white/5'}`}>
                  {rememberMe && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${rememberMe ? 'text-blue-400' : 'text-gray-500'}`}>Stay Logged In</span>
              </button>

              <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl transition-all uppercase tracking-widest text-base shadow-xl">Log In</button>
              
              <button 
                onClick={() => navigateTo(ViewType.REP_CONTACT)} 
                className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 mt-4"
              >
                <Phone size={14} className="animate-pulse" />
                Contact Your Rep
              </button>
            </div>
            <p className="mt-8 text-[12px] text-blue-200/60 uppercase font-black tracking-widest leading-relaxed">
              M&J Corporate Wholesale Division<br/>
              <span className="text-gray-600 text-[10px] italic">Secured Environment v4.0.2</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderRepContact = () => {
    const rep = {
      name: 'John Adame',
      title: 'Regional Account Manager',
      phone: '209-777-5575',
      email: 'ljraid25@aol.com'
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden bg-[#000]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')`, filter: 'blur(20px) grayscale(1) brightness(0.3)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black z-[1]" />
        
        <div className="relative z-10 w-full max-w-sm space-y-8">
          <div className="flex justify-start">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 group shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">Back</span>
            </button>
          </div>

          <div className="glass p-10 rounded-[3rem] shadow-2xl backdrop-blur-2xl bg-black/60 border border-white/10 space-y-10">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-28 h-28 bg-gradient-to-br from-pink-500/20 to-pink-900/40 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border-4 border-pink-500/30 transition-all duration-500">
                <AnimatedPigLogo />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{rep.name}</h2>
                <div className="flex items-center justify-center gap-2 text-blue-400/60">
                  <Briefcase size={14} />
                  <p className="text-[11px] font-black uppercase tracking-widest">{rep.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href={`tel:${rep.phone.replace(/\D/g, '')}`} 
                className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-600 transition-all group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/20 group-hover:bg-white/20 rounded-xl text-blue-400 group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-500 group-hover:text-white/60 uppercase tracking-widest">Phone Line</p>
                    <p className="text-lg font-black text-white group-hover:text-white">{rep.phone}</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-700 group-hover:text-white transition-colors" />
              </a>

              <a 
                href={`sms:${rep.phone.replace(/\D/g, '')}`} 
                className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-green-600 transition-all group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-600/20 group-hover:bg-white/20 rounded-xl text-green-400 group-hover:text-white transition-colors">
                    <MessageSquare size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-500 group-hover:text-white/60 uppercase tracking-widest">SMS Messenger</p>
                    <p className="text-lg font-black text-white group-hover:text-white">Text Representative</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-700 group-hover:text-white transition-colors" />
              </a>

              <a 
                href={`mailto:${rep.email}`} 
                className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-600 transition-all group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600/20 group-hover:bg-white/20 rounded-xl text-amber-400 group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-500 group-hover:text-white/60 uppercase tracking-widest">Office Email</p>
                    <p className="text-[13px] font-black text-white group-hover:text-white break-all">{rep.email}</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-700 group-hover:text-white transition-colors" />
              </a>
            </div>

            <p className="text-[9px] text-center text-gray-500 font-black uppercase tracking-[0.2em]">
              Standard data rates may apply
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderHomeContent = () => (
    <div className="px-5 space-y-8 pb-48 pt-6">
      <PromoBanner 
        title={<>This Week's<br/><span className="text-orange-200">Specials</span></>}
        promoName="5 Case Club"
        watermark="5"
        subtitle="5cs Minimum per item"
        onClick={() => navigateTo(ViewType.SPECIALS)}
      />

      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map(cat => {
          const count = getCategoryCount(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => navigateTo(ViewType.CATEGORY, { selectedCategory: cat, selectedSubcategory: cat.subcategories[0] })}
              className={`relative aspect-square rounded-3xl bg-white/[0.04] border ${cat.borderColor} flex flex-col items-center justify-center gap-2 p-3 transition-all hover:bg-white/10 hover:scale-105 active:scale-95 group shadow-xl overflow-hidden`}
            >
              <div className="absolute top-2 right-2 bg-black/40 px-1.5 py-0.5 rounded-lg border border-white/5 backdrop-blur-md">
                <span className="text-[8px] font-black text-gray-400">{count}</span>
              </div>
              <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
              <span className="text-[9px] font-black text-center uppercase tracking-wider text-gray-300 leading-tight group-hover:text-white line-clamp-2 px-1">{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4 opacity-30 grayscale">
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Authorized Wholesale Access Only</p>
      </div>
    </div>
  );

  const renderSavedContent = () => {
    const savedProducts = PRODUCTS.filter(p => state.savedProductIds.includes(p.id));
    return (
      <div className="px-5 pt-6 pb-48 space-y-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-red-500">Saved Items</h2>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-lg bg-white/5">{savedProducts.length} Favorites</span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-6 opacity-30">
            <Heart className="w-20 h-20 mx-auto text-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-black uppercase tracking-[0.2em]">No Saved Items</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">Mark products with a heart to see them here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {savedProducts.map(renderProductItem)}
          </div>
        )}
      </div>
    );
  };

  const renderCategoryViewContent = () => {
    if (!state.selectedCategory) return null;
    const cat = state.selectedCategory;
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <div className="bg-black border-b border-white/10 px-5 py-4 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl drop-shadow-lg">{cat.icon}</span>
            <h2 className="text-xl font-black uppercase italic tracking-tighter">{cat.name}</h2>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
            {cat.subcategories.map(sub => {
              const count = getSubcategoryCount(cat.id, sub);
              const isActive = state.selectedSubcategory === sub;
              const themedBorder = cat.borderColor;
              const themedText = cat.accentColor.replace('bg-', 'text-');
              
              return (
                <button
                  key={sub}
                  onClick={() => setState(prev => ({ ...prev, selectedSubcategory: sub }))}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 shadow-lg ${
                    isActive 
                      ? `${cat.accentColor} text-white shadow-xl scale-105 border-transparent` 
                      : `bg-white/5 text-gray-300 ${themedBorder} hover:bg-white/10`
                  }`}
                >
                  {sub}
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg ${
                    isActive 
                      ? 'bg-black/20 text-white' 
                      : `bg-black/40 ${themedText}`
                  }`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-5 space-y-4 pt-4 pb-48">
          {filteredProducts.filter(p => p.category === cat.id && p.subcategory === state.selectedSubcategory).map(product => renderProductItem(product))}
        </div>
      </div>
    );
  };

  const renderSpecialsContent = () => {
    const specials = PRODUCTS.filter(p => SPECIAL_IDS.includes(p.id));
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <div className="px-6 pt-6 pb-2 border-b border-white/10 flex justify-between items-end">
           <h2 className="text-2xl font-black italic uppercase tracking-tighter text-orange-500">5 Case Club</h2>
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-lg bg-white/5">{specials.length} Inventory Items</span>
        </div>
        <div className="p-6 space-y-6 pb-48 pt-4">
          {specials.map(product => {
            const currentQty = tempQuantities[product.id] || 5;
            const caseTotal = (parseFloat(product.price) * product.caseWeight).toFixed(2);
            const isSaved = state.savedProductIds.includes(product.id);
            const cat = CATEGORIES.find(c => c.id === product.category);
            const accentClass = cat?.accentColor || 'bg-blue-600';
            const borderClass = cat?.borderColor || 'border-blue-600';
            const textColorClass = accentClass.replace('bg-', 'text-');
            
            return (
              <div key={product.id} className="bg-gradient-to-br from-orange-600/15 via-white/[0.03] border border-orange-500/30 rounded-[3rem] p-8 space-y-6 shadow-2xl relative">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-black text-xl text-white uppercase tracking-tight leading-tight">{product.name}</h3>
                    <p className="text-[12px] text-gray-500 font-black uppercase mt-1 italic tracking-widest">{product.brand} • {product.caseWeight}lb Case</p>
                    
                    <div className="mt-5 bg-black/50 p-4 rounded-2xl border border-orange-500/20 inline-flex flex-col gap-1">
                      <p className="text-[9px] text-orange-400 font-black uppercase tracking-[0.2em] mb-1">Club Pricing</p>
                      <span className="text-4xl font-black text-white tracking-tighter">${caseTotal} <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">CS</span></span>
                      <span className="text-lg font-black text-orange-400 tracking-tighter italic border-t border-white/5 pt-1 mt-1">${product.price} <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">LB</span></span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <div className="bg-orange-600 px-4 py-2 rounded-full text-[11px] font-black text-white shadow-xl animate-pulse uppercase shrink-0">5cs CLUB</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-start">
                    <button 
                      onClick={() => toggleSaved(product.id)}
                      className={`p-3 rounded-2xl transition-all border-2 flex items-center justify-center shadow-xl active:scale-90 ${
                        isSaved 
                          ? `${accentClass} border-transparent text-white` 
                          : `bg-black/50 ${borderClass} ${textColorClass}`
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="flex-1 flex items-center bg-black/70 rounded-[2.5rem] p-1.5 border border-white/10 shadow-inner">
                      <button onClick={() => updateTempQty(product.id, -1, 5)} className="w-16 h-16 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all border border-red-500/20"><Minus className="w-8 h-8" /></button>
                      <div className="flex-1 text-center py-2">
                        <span className="block text-4xl font-black text-white">{currentQty}</span>
                        <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1 inline-block">Units</span>
                      </div>
                      <button onClick={() => updateTempQty(product.id, 1, 5)} className="w-16 h-16 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl transition-all border border-blue-500/20"><Plus className="w-8 h-8" /></button>
                    </div>
                    <button onClick={() => addToCart(product)} className="bg-orange-600 p-8 rounded-[2.5rem] shadow-2xl active:scale-95 transition-all"><Plus className="w-10 h-10 text-white" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHistoryContent = () => (
    <div className="px-5 pt-6 pb-48 space-y-6">
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-blue-500">Order History</h2>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-lg bg-white/5">Member Record</span>
      </div>

      {state.orderHistory.length === 0 ? (
        <div className="py-20 text-center space-y-6 opacity-30">
          <History className="w-20 h-20 mx-auto text-gray-500" />
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-[0.2em]">No Order History</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Your wholesale records will appear here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {state.orderHistory.map(order => (
            <div key={order.id} className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-7 space-y-5 hover:bg-white/[0.06] transition-all group">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{order.id}</span>
                    <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-black uppercase rounded-lg">Delivered</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">{order.timestamp}</p>
                </div>
                <p className="text-2xl font-black text-white tracking-tighter italic">${order.total.toFixed(2)}</p>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Delivery: {order.deliveryDate}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Package className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{order.items.reduce((sum, i) => sum + i.cases, 0)} Total Cases</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full bg-blue-600 border-2 border-black flex items-center justify-center text-[10px] font-black">
                      {CATEGORIES.find(c => c.id === item.category)?.icon || '🥩'}
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[8px] font-black text-gray-400">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                  View Detail <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSearchResults = () => (
    <div className="px-5 space-y-6 pb-48 pt-6">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-blue-400">Search Results</h2>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{filteredProducts.length} Matches Found</span>
      </div>
      <div className="space-y-5">
        {filteredProducts.length > 0 ? filteredProducts.map(renderProductItem) : (
          <div className="py-20 text-center space-y-4 opacity-30">
            <Search className="w-16 h-16 mx-auto text-gray-500" />
            <p className="text-sm font-black uppercase tracking-[0.2em]">No Matches Found</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCheckout = () => {
    const nextAvailable = () => {
      const dates = [];
      let current = new Date();
      for (let i = 0; i < 21; i++) {
        current.setDate(current.getDate() + 1);
        if (current.getDay() === 2 || current.getDay() === 5) dates.push(new Date(current));
      }
      return dates;
    };

    return (
      <div className="flex flex-col min-h-screen pb-56 p-7 space-y-10 bg-black">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10 group active:scale-95 transition-all shadow-md">
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white">Back</span>
          </button>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Review Order</h2>
        </div>
        {state.cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic font-black uppercase tracking-[0.2em] text-[14px] space-y-8">
            <ShoppingCart className="w-28 h-28" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-10">
            {totals.totalCases < FREE_SHIPPING_MIN_CASES && (
              <div className="bg-orange-600/10 border border-orange-500/30 p-5 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white uppercase tracking-wide">Small Order Notice</p>
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Orders under {FREE_SHIPPING_MIN_CASES} cases incur a ${SHIPPING_FEE} delivery fee. Add {FREE_SHIPPING_MIN_CASES - totals.totalCases} more cases for free delivery.</p>
                </div>
              </div>
            )}
            <div className="space-y-5">
              <p className="text-[12px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-5 h-5" /> Delivery Date:</p>
              <div className="grid grid-cols-2 gap-4">
                {nextAvailable().map(date => {
                  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                  const isSelected = state.deliveryDate === dateStr;
                  return (
                    <button key={dateStr} onClick={() => setState(prev => ({ ...prev, deliveryDate: dateStr }))} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 shadow-md ${isSelected ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                      <span className={`text-base font-black uppercase ${isSelected ? 'text-white' : 'text-gray-300'}`}>{dateStr}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-blue-100' : 'opacity-40'}`}>Available</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-[12px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Layers className="w-5 h-5" /> Order Items:</p>
              {state.cart.map(item => (
                <div key={item.id} className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-7 flex justify-between items-center">
                  <div>
                    <h4 className="font-black text-base uppercase text-white tracking-wide">{item.name}</h4>
                    <p className="text-[11px] text-gray-500 uppercase font-black tracking-[0.1em] mt-1 italic">{item.cases}cs • ${item.price}/lb • {item.caseWeight}lb Case</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-blue-400 text-2xl tracking-tighter">${(parseFloat(item.price) * item.caseWeight * item.cases).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-[11px] font-black text-red-500/60 uppercase tracking-widest mt-2 border-b border-red-500/20">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#0e0e0e] p-10 rounded-[4rem] border border-white/10 space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest px-1"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
                {totals.deliveryFee > 0 && <div className="flex justify-between items-center text-sm font-bold text-orange-400 uppercase tracking-widest px-1"><span>Delivery Fee</span><span>${totals.deliveryFee.toFixed(2)}</span></div>}
                <div className="flex justify-between items-baseline pt-4 border-t border-white/10"><span className="text-lg font-black uppercase text-gray-400 italic">COD Total</span><span className="text-5xl font-black text-green-400 tracking-tighter">${totals.grandTotal.toFixed(2)}</span></div>
              </div>
              <button disabled={!state.deliveryDate} onClick={confirmOrder} className={`w-full py-7 rounded-[2.25rem] font-black text-lg tracking-[0.2em] transition-all uppercase shadow-2xl ${state.deliveryDate ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40' : 'bg-white/5 text-gray-700 cursor-not-allowed'}`}>{state.deliveryDate ? 'Confirm Order' : 'Select Date'}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="flex flex-col min-h-screen items-center justify-center p-12 text-center space-y-12 bg-black">
      <div className="relative bg-green-500/10 p-14 rounded-full border border-green-500/20 shadow-2xl"><CheckCircle2 className="w-32 h-32 text-green-400" /></div>
      <div className="space-y-4">
        <h2 className="text-7xl font-black italic text-white uppercase tracking-tighter">Order Sent</h2>
        <p className="text-base text-blue-400 font-black uppercase tracking-[0.3em]">Thank You</p>
      </div>
      <div className="glass p-10 rounded-[3.5rem] space-y-8 max-w-sm shadow-2xl border border-white/10">
         <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed italic">The portal has recorded your request for delivery. Our reps will contact you shortly.</p>
      </div>
      <button onClick={() => setState(prev => ({ ...prev, view: ViewType.HOME, searchQuery: '', viewHistory: [] }))} className="px-16 py-7 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2.25rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl">Back to Home</button>
    </div>
  );

  const renderVoiceModal = () => (
    <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-10 space-y-14">
       <button onClick={() => { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); setShowVoiceScreen(false); }} className="absolute top-12 right-12 p-6 bg-white/5 rounded-full border border-white/10"><X className="w-10 h-10" /></button>
       <div className="text-center space-y-6 max-w-sm">
         <h3 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Search Matrix</h3>
         <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-gray-500 italic opacity-80">Speak naturally. Try: "Wholesale Beef Ribs"</p>
       </div>
       <div className="flex flex-col items-center gap-10">
         <button onClick={toggleVoiceCapture} className={`w-44 h-44 rounded-full flex items-center justify-center border-[8px] transition-all duration-300 shadow-2xl relative ${isListening ? 'bg-red-600 border-red-400' : 'bg-blue-600 border-blue-400'}`}>
           {isListening && <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-20" />}
           {isListening ? <MicOff className="w-16 h-16 text-white" /> : <Mic className="w-16 h-16 text-white" />}
         </button>
         <div className="text-center space-y-3">
            <p className={`text-xl font-black uppercase tracking-[0.4em] ${isListening ? 'text-red-500' : 'text-blue-500'}`}>{isListening ? 'Listening...' : 'Ready To Speak'}</p>
            {isListening ? <p className="text-[12px] font-black text-white/90 uppercase tracking-widest bg-red-900/40 px-6 py-2 rounded-full border border-red-500/30 animate-pulse">Press button to stop</p> : <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Press to start</p>}
         </div>
       </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black text-white overflow-hidden relative shadow-2xl flex flex-col font-sans">
      {renderHeader()}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {state.searchQuery && [ViewType.HOME, ViewType.CATEGORY, ViewType.SPECIALS, ViewType.HISTORY, ViewType.SAVED].includes(state.view) ? renderSearchResults() : (
          <>
            {state.view === ViewType.LOGIN && renderLogin()}
            {state.view === ViewType.HOME && renderHomeContent()}
            {state.view === ViewType.CATEGORY && renderCategoryViewContent()}
            {state.view === ViewType.SPECIALS && renderSpecialsContent()}
            {state.view === ViewType.HISTORY && renderHistoryContent()}
            {state.view === ViewType.SAVED && renderSavedContent()}
            {state.view === ViewType.CHECKOUT && renderCheckout()}
            {state.view === ViewType.CONFIRMATION && renderConfirmation()}
            {state.view === ViewType.REP_CONTACT && renderRepContact()}
          </>
        )}
      </main>
      {showVoiceScreen && renderVoiceModal()}
      {state.isLoggedIn && ![ViewType.LOGIN, ViewType.CONFIRMATION, ViewType.REP_CONTACT].includes(state.view) && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[100]">
          <div className="bg-[#0c0c0c] border-t border-white/10 flex h-24 shadow-2xl">
            <button onClick={() => setState(prev => ({ ...prev, view: ViewType.HOME, searchQuery: '', viewHistory: [...prev.viewHistory, prev.view] }))} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${state.view === ViewType.HOME && !state.searchQuery ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Home className="w-6 h-6" /><span className="text-[10px] font-black uppercase">Home</span></button>
            <button onClick={() => navigateTo(ViewType.HISTORY)} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${state.view === ViewType.HISTORY ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><History className="w-6 h-6" /><span className="text-[10px] font-black uppercase">History</span></button>
            <button onClick={() => navigateTo(ViewType.CHECKOUT)} className={`flex-[1.5] flex flex-col items-center justify-center gap-1 transition-all relative ${state.view === ViewType.CHECKOUT ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-400'} ${animateCart ? 'animate-cart-pop' : ''}`}><ShoppingCart className="w-7 h-7" />{state.cart.length > 0 && <div className="absolute top-2 right-6 bg-red-600 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">{state.cart.length}</div>}<span className="text-[11px] font-black uppercase">Cart</span></button>
            <button onClick={() => navigateTo(ViewType.SAVED)} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${state.view === ViewType.SAVED ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Heart className="w-6 h-6" /><span className="text-[10px] font-black uppercase">Saved</span></button>
            <div className="flex-1 flex flex-col items-center justify-center gap-1 bg-black/40"><span className="text-sm font-black text-green-400 tracking-tighter">${totals.grandTotal.toFixed(2)}</span><span className="text-[8px] font-bold uppercase text-gray-600">Total</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;