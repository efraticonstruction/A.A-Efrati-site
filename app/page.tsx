"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ShieldCheck, ShoppingCart, Globe, Phone, Mail, MapPin, 
  X, Check, Trash2, Home, Construction, Paintbrush, 
  Droplets, Zap, Shield, ChevronLeft, Plus, Minus, Box
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * =================================================================================
 * MODULE 1: EXTENDED CATALOG DATA (מבוסס על ה-PDF ששלחת)
 * =================================================================================
 */

const EFRATI_CATALOG = {
  "ריצוף וחיפוי": [
    { id: "flo1", title: "מונטריאול אפור (Montreal)", specs: "80x80 מט R10", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800", unit: "מ\"ר" },
    { id: "flo2", title: "אידרה בז' משי (Idra)", specs: "80x80 משי קטיפתי", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800", unit: "מ\"ר" },
    { id: "flo3", title: "אמאני לבן (Amani)", specs: "80x80 מט יוקרתי", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800", unit: "מ\"ר" },
    { id: "flo4", title: "ארק סילבר (Arc Silver)", specs: "80x80 אפור בטון", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800", unit: "מ\"ר" },
    { id: "flo5", title: "מדרה אלון (Madera Oak)", specs: "15x60 דמוי פרקט", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800", unit: "מ\"ר" }
  ],
  "כלים סניטריים": [
    { id: "san1", title: "אסלה תלויה Geberit", specs: "דגם מטרופוליס + מושב הידראולי", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", unit: "יח'" },
    { id: "san2", title: "ברז רובי שחור (Ruby)", specs: "אינטרפוץ 4 דרך מעוצב", img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800", unit: "יח'" }
  ],
  "דלתות וגמר": [
    { id: "dor1", title: "דלת רב-בריח פולימרית", specs: "עמידות למים בגימור לבן/שמנת", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800", unit: "יח'" }
  ]
};

const SERVICES = [
  { id: "s1", title: "ריצוף וחיפוי", icon: GridPattern, color: "orange", category: "ריצוף וחיפוי" },
  { id: "s2", title: "סניטריה ואינסטלציה", icon: Droplets, color: "blue", category: "כלים סניטריים" },
  { id: "s3", title: "דלתות ונגרות", icon: Home, color: "green", category: "דלתות וגמר" },
  { id: "s4", title: "עבודות שלד", icon: Construction, color: "slate", category: "שלד" },
  { id: "s5", title: "חשמל ותקשורת", icon: Zap, color: "yellow", category: "חשמל" }
];

/**
 * =================================================================================
 * MODULE 2: MAIN COMPONENT
 * =================================================================================
 */

export default function EfratiEnterpriseApp() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("he");
  const [activeService, setActiveService] = useState(null); // לניהול "דף נפרד" לכל שירות
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // לוגיקת הוספה לעגלה עם כמות
  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: quantity } : item);
      }
      return [...prev, { ...product, qty: quantity }];
    });
    setActiveService(null); // סגירת דף השירות אחרי בחירה
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === "he" ? "rtl font-sans" : "ltr font-sans"}`} dir={lang === "he" ? "rtl" : "ltr"}>
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 h-20 flex items-center px-6 md:px-20 justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveService(null)}>
          <div className="bg-slate-900 p-2 rounded-xl text-white"><ShieldCheck size={24}/></div>
          <div>
            <h1 className="text-xl font-black leading-none">א.א אפרתי</h1>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">אשר & אהרון</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-slate-900 text-white rounded-xl shadow-lg">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-32 pb-20 container mx-auto px-6 md:px-20">
        {!activeService ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-20">
              <h2 className="text-5xl md:text-8xl font-[1000] tracking-tighter mb-6">השירותים שלנו.</h2>
              <p className="text-xl text-slate-400 font-bold">בחר שירות כדי לצפות בקטלוג ולהרכיב מפרט</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className="group cursor-pointer p-10 bg-slate-50 rounded-[40px] hover:bg-slate-900 hover:text-white transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {React.createElement(service.icon || Home, { size: 30 })}
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">{service.title}</h3>
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                    צפה בקטלוג <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <ServicePage 
            service={activeService} 
            onBack={() => setActiveService(null)} 
            catalog={EFRATI_CATALOG[activeService.category] || []}
            onAdd={addToCart}
          />
        )}
      </main>

      {/* CART OVERLAY */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
            onSend={() => {
                const text = `שלום אשר ואהרון, אשמח למפרט:\n${cart.map(i => `${i.title} - כמות: ${i.qty} ${i.unit}`).join('\n')}`;
                window.open(`https://wa.me/972500000000?text=${encodeURIComponent(text)}`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * =================================================================================
 * SUB-COMPONENTS
 * =================================================================================
 */

function ServicePage({ service, onBack, catalog, onAdd }) {
  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-orange-600">
        <ChevronLeft size={20} /> חזרה לשירותים
      </button>
      <h2 className="text-6xl font-[1000] tracking-tighter mb-16">{service.title}</h2>
      
      {catalog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {catalog.map(item => (
            <ProductSelectionCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="p-20 bg-slate-50 rounded-[40px] text-center">
          <Construction size={60} className="mx-auto text-slate-200 mb-6" />
          <p className="text-xl font-bold text-slate-400">הקטלוג לשירות זה בבנייה...</p>
        </div>
      )}
    </motion.div>
  );
}

function ProductSelectionCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white border border-slate-100 rounded-[50px] p-6 shadow-sm hover:shadow-2xl transition-all group">
      <div className="aspect-square rounded-[40px] overflow-hidden mb-6 bg-slate-100">
        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
      </div>
      <h4 className="text-2xl font-black mb-2 tracking-tighter">{item.title}</h4>
      <p className="text-sm text-slate-400 font-bold mb-8">{item.specs}</p>
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-slate-50 rounded-2xl p-2">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-white rounded-xl transition-all"><Minus size={16}/></button>
          <input 
            type="number" 
            value={qty} 
            onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            className="w-12 text-center bg-transparent font-black"
          />
          <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-white rounded-xl transition-all"><Plus size={16}/></button>
        </div>
        <button 
          onClick={() => onAdd(item, qty)}
          className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all"
        >
          הוסף למפרט
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, onSend }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200]" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[201] p-10 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black tracking-tighter">המפרט שלי</h3>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl"><X /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {cart.length === 0 ? (
            <div className="py-20 text-center opacity-20">
              <Box size={80} className="mx-auto mb-4" />
              <p className="font-black italic uppercase">Empty Specification</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-3xl items-center">
              <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div className="flex-1">
                <h5 className="font-black text-sm leading-tight">{item.title}</h5>
                <p className="text-[10px] font-bold text-orange-600">{item.qty} {item.unit}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-400 p-2"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>

        <button 
          disabled={cart.length === 0}
          onClick={onSend}
          className="mt-10 w-full bg-orange-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-orange-100 disabled:grayscale transition-all"
        >
          שלח לאשר ואהרון בוואטסאפ
        </button>
      </motion.div>
    </>
  );
}

const GridPattern = (props) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
