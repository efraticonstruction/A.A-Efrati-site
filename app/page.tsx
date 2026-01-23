"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, ShoppingCart, Globe, Phone, Mail, MapPin, 
  X, Check, Trash2, Home, Construction, Paintbrush, 
  Droplets, Zap, Shield, ChevronLeft, Plus, Minus, Box,
  ArrowRight, HardHat, Ruler, Building2
} from "lucide-react";

/** * =================================================================================
 * CLASS 1: DATA REPOSITORY (מפרט טכני מלא מה-PDF)
 * =================================================================================
 */
const EFRATI_ASSETS = {
  brand: "א.א אפרתי",
  owners: "אשר & אהרון",
  catalog: {
    "ריצוף וחיפוי": [
      { id: "f1", title: "מונטריאול אפור (Montreal)", specs: "80/80 מט R10 - סטודיו קרמיקה", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
      { id: "f2", title: "אידרה בז' (Idra Beige)", specs: "80/80 משי קטיפתי יוקרתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
      { id: "f3", title: "אמאני לבן (Amani White)", specs: "80/80 מט נקי ומודרני", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
      { id: "f4", title: "ארק סילבר (Arc Silver)", specs: "80/80 מראה בטון תעשייתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
      { id: "f5", title: "מדרה אלון (Madera Oak)", specs: "15/60 דמוי פרקט עץ טבעי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" }
    ],
    "כלים סניטריים": [
      { id: "s1", title: "אסלה תלויה Geberit", specs: "מנגנון סמוי + מושב הידראולי שקט", unit: "יחידה", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
      { id: "s2", title: "ברז רובי שחור מט", specs: "אינטרפוץ 4 דרך, סדרת יוקרה", unit: "יחידה", img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" }
    ],
    "שלד ופיתוח": [
      { id: "e1", title: "יציקת בטון B-300", specs: "לפי תקן 466 כולל בדיקת מעבדה", unit: "קוב", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
      { id: "e2", title: "איטום ביטומני", specs: "שתי שכבות 5 מ\"מ תקניות", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" }
    ]
  }
};

/** * =================================================================================
 * CLASS 2: UI COMPONENTS (מניעת שגיאות רינדור)
 * =================================================================================
 */
export default function EfratiEnterpriseApp() {
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // התיקון המרכזי לשגיאות שראית בתמונות:
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-white min-h-screen" />;

  const addToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty } : item);
      return [...prev, { ...product, qty }];
    });
    setActiveService(null);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans rtl" dir="rtl">
      
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 h-24 flex items-center px-6 md:px-20 justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveService(null)}>
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-lg"><ShieldCheck size={28} /></div>
          <div>
            <h1 className="text-2xl font-black leading-none">{EFRATI_ASSETS.brand}</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{EFRATI_ASSETS.owners}</p>
          </div>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:scale-105 transition-all">
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* MAIN VIEW */}
      <main className="pt-40 pb-20 container mx-auto px-6 md:px-20">
        {!activeService ? (
          <div>
            <div className="mb-24">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
                בונים <br /> <span className="text-orange-600">באיכות הנדסית.</span>
              </h2>
              <p className="text-xl text-slate-400 font-bold max-w-2xl">בחר שירות לצפייה בקטלוג המוצרים והזנת כמויות למפרט שלך.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.keys(EFRATI_ASSETS.catalog).map((catName) => (
                <div 
                  key={catName}
                  onClick={() => setActiveService(catName)}
                  className="group cursor-pointer p-12 bg-slate-50 rounded-[50px] hover:bg-slate-900 hover:text-white transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 transition-all shadow-sm">
                    {catName.includes("ריצוף") ? <Box size={30} /> : catName.includes("סניטריה") ? <Droplets size={30} /> : <Construction size={30} />}
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">{catName}</h3>
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-xs">צפה בקטלוג <ArrowRight size={16} /></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CatalogSection 
            title={activeService} 
            items={EFRATI_ASSETS.catalog[activeService]} 
            onBack={() => setActiveService(null)}
            onAdd={addToCart}
          />
        )}
      </main>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full md:w-[550px] bg-white h-full shadow-2xl p-10 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black tracking-tighter uppercase">המפרט שלי</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-3 bg-slate-50 rounded-xl"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center opacity-20"><Box size={80} className="mx-auto" /></div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-4 p-5 bg-slate-50 rounded-3xl items-center">
                  <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <h5 className="font-black text-sm">{item.title}</h5>
                    <p className="text-[10px] font-bold text-orange-600">{item.qty} {item.unit}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>

            <button 
              disabled={cart.length === 0}
              onClick={() => {
                const text = `שלום אשר ואהרון, אשמח למפרט:\n${cart.map(i => `${i.title}: ${i.qty} ${i.unit}`).join('\n')}`;
                window.open(`https://wa.me/972500000000?text=${encodeURIComponent(text)}`);
              }}
              className="mt-10 w-full bg-orange-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl disabled:grayscale"
            >
              שלח לאשר ואהרון בוואטסאפ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** * =================================================================================
 * CLASS 3: CATALOG VIEW ENGINE
 * =================================================================================
 */
function CatalogSection({ title, items, onBack, onAdd }) {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-orange-600">
        <ChevronLeft size={20} /> חזרה לשירותים
      </button>
      <h2 className="text-6xl font-black tracking-tighter mb-16">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map(item => (
          <ProductCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white border border-slate-100 rounded-[50px] p-6 hover:shadow-2xl transition-all group">
      <div className="aspect-square rounded-[40px] overflow-hidden mb-6 bg-slate-100">
        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
      </div>
      <h4 className="text-2xl font-black mb-2 tracking-tighter">{item.title}</h4>
      <p className="text-sm text-slate-400 font-bold mb-8 h-10">{item.specs}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-50 rounded-2xl p-2 font-black">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-white rounded-lg"><Minus size={16}/></button>
          <span className="w-10 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-white rounded-lg"><Plus size={16}/></button>
        </div>
        <button 
          onClick={() => onAdd(item, qty)}
          className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs hover:bg-orange-600 shadow-lg"
        >
          הוסף למפרט
        </button>
      </div>
    </div>
  );
}
