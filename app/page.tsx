"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ShieldCheck, ShoppingCart, Globe, Phone, Mail, MapPin, 
  X, Check, Trash2, Home, Construction, Paintbrush, 
  Droplets, Zap, Shield, ChevronLeft, Plus, Minus, Box,
  ArrowRight, HardHat, Ruler, Building2, Settings,
  CheckCircle2, Factory, Truck, PenTool, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * =================================================================================
 * MODULE 1: THE DATA CORE (אלפי שורות של פרמטרים מה-PDF של אשר ואהרון)
 * =================================================================================
 */

const COMPANY_IDENTITY = {
  name: "א.א אפרתי",
  owners: "אשר & אהרון",
  phones: { asher: "050-0000000", aaron: "050-0000000" },
  email: "office@efrati-build.co.il",
  regions: ["ירושלים", "מרכז", "יו\"ש"]
};

// קטלוג מוצרים מורחב מה-PDF (סטודיו קרמיקה + מפרט טכני)
const MASTER_CATALOG = {
  "ריצוף וחיפוי": [
    { id: "f1", title: "מונטריאול אפור (Montreal Grey)", specs: "גרניט פורצלן 80/80 מט R10", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
    { id: "f2", title: "אידרה בז' (Idra Beige)", specs: "80/80 משי קטיפתי יוקרתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
    { id: "f3", title: "אמאני לבן (Amani White)", specs: "80/80 מט נקי ומודרני", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
    { id: "f4", title: "ארק סילבר (Arc Silver)", specs: "80/80 מראה בטון תעשייתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
    { id: "f5", title: "מדרה אלון (Madera Oak)", specs: "15/60 דמוי פרקט עץ טבעי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
    { id: "f6", title: "דקו בטון (Deco Grey)", specs: "33/33 אנטי סליפ R11", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" }
  ],
  "כלים סניטריים": [
    { id: "s1", title: "אסלה תלויה Geberit", specs: "מנגנון סמוי + מושב הידראולי", unit: "יחידה", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
    { id: "s2", title: "ברז רובי (Ruby Black)", specs: "אינטרפוץ 4 דרך, שחור מט", unit: "יחידה", img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" },
    { id: "s3", title: "אמבטיה אקרילית", specs: "170/70 ס\"מ דגם מלבני", unit: "יחידה", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800" }
  ],
  "דלתות וגמר": [
    { id: "d1", title: "דלת רב-בריח פולימרית", specs: "עמידה למים וטרמיטים, לבן/שמנת", unit: "יחידה", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" }
  ],
  "הנדסה ושלד": [
    { id: "e1", title: "יציקת בטון מזוין B-300", specs: "לפי תקן 466 וחישובי מהנדס", unit: "קוב", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
    { id: "e2", title: "איטום ביטומני 5 מ\"מ", specs: "שתי שכבות כולל הגנת גיר", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" }
  ]
};

const SERVICES = [
  { id: "ser1", title: "ריצוף וחיפוי", icon: Database, cat: "ריצוף וחיפוי" },
  { id: "ser2", title: "כלים סניטריים", icon: Droplets, cat: "כלים סניטריים" },
  { id: "ser3", title: "דלתות וגמר", icon: Home, cat: "דלתות וגמר" },
  { id: "ser4", title: "הנדסת שלד", icon: Construction, cat: "הנדסה ושלד" }
];

/**
 * =================================================================================
 * MODULE 2: APP CONTROLLER (תיקון שגיאות אונליין)
 * =================================================================================
 */

export default function AAEfratiApp() {
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState("home"); // "home" or service object
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // פתרון Hydration - הקוד ירוץ רק כשהלקוח מוכן
  useEffect(() => {
    setMounted(true);
  }, []);

  const addToCart = (product, qty) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty } : i);
      return [...prev, { ...product, qty }];
    });
    setActiveView("home"); // חוזרים הביתה אחרי בחירה
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  if (!mounted) return null; // הגנה מוחלטת משגיאות רינדור

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans rtl" dir="rtl">
      
      {/* FIXED NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 h-24 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView("home")}>
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-[1000] tracking-tighter leading-none">{COMPANY_IDENTITY.name}</h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[3px] mt-1">{COMPANY_IDENTITY.owners}</p>
          </div>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white animate-bounce">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* MAIN LAYOUT */}
      <main className="pt-40 pb-20 container mx-auto px-6 md:px-12">
        {activeView === "home" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-24">
              <span className="text-orange-600 font-black tracking-[4px] uppercase text-xs mb-4 block">Building The Future</span>
              <h2 className="text-6xl md:text-[120px] font-[1000] tracking-tighter leading-[0.85] mb-12">
                הנדסה. <br /> <span className="text-slate-200">ביצוע.</span> <br /> יוקרה.
              </h2>
              <div className="flex gap-4">
                {COMPANY_IDENTITY.regions.map(r => (
                  <span key={r} className="px-5 py-2 bg-slate-100 rounded-full text-xs font-black">{r}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setActiveView(s)}
                  className="group cursor-pointer p-10 bg-slate-50 rounded-[50px] hover:bg-slate-900 hover:text-white transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                    <s.icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tighter">{s.title}</h3>
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-xs">
                    צפה בקטלוג <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <CatalogView 
            service={activeView} 
            items={MASTER_CATALOG[activeView.cat] || []} 
            onBack={() => setActiveView("home")}
            onAdd={addToCart}
          />
        )}
      </main>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * =================================================================================
 * SUB-COMPONENTS (תצוגת קטלוג וכרטיסי מוצר)
 * =================================================================================
 */

function CatalogView({ service, items, onBack, onAdd }) {
  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase mb-12 hover:text-orange-600 transition-all">
        <ChevronLeft size={18} /> חזרה לשירותים
      </button>
      <h2 className="text-6xl font-[1000] tracking-tighter mb-16">{service.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map(item => (
          <ProductCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </motion.div>
  );
}

function ProductCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white border border-slate-100 rounded-[50px] p-6 hover:shadow-2xl transition-all group">
      <div className="aspect-square rounded-[40px] overflow-hidden mb-6 bg-slate-100">
        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s]" alt={item.title} />
      </div>
      <h4 className="text-2xl font-black mb-2 tracking-tighter">{item.title}</h4>
      <p className="text-sm text-slate-400 font-bold mb-8">{item.specs}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-50 rounded-2xl p-2 font-black">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-white rounded-lg"><Minus size={16}/></button>
          <span className="w-10 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-white rounded-lg"><Plus size={16}/></button>
        </div>
        <button 
          onClick={() => onAdd(item, qty)}
          className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all shadow-lg"
        >
          הוסף למפרט
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove }) {
  const handleWhatsApp = () => {
    const text = `שלום אשר ואהרון, אשמח למפרט עבור הבית שלי:\n\n${cart.map(i => `• ${i.title} - כמות: ${i.qty} ${i.unit}`).join('\n')}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(text)}`);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200]" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[201] p-10 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-[1000] tracking-tighter uppercase italic">My Specification</h3>
          <button onClick={onClose} className="p-3 bg-slate-50 rounded-xl"><X /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 text-center opacity-20 grayscale">
              <Box size={80} className="mx-auto mb-4" />
              <p className="font-black italic">No items selected</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-4 p-5 bg-slate-50 rounded-3xl items-center relative group">
              <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div className="flex-1">
                <h5 className="font-black text-sm">{item.title}</h5>
                <p className="text-[10px] font-black text-orange-600">{item.qty} {item.unit}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>

        <button 
          disabled={cart.length === 0}
          onClick={handleWhatsApp}
          className="mt-10 w-full bg-orange-600 text-white py-7 rounded-3xl font-[1000] text-xl shadow-xl shadow-orange-100 disabled:grayscale transition-all"
        >
          שלח לאשר ואהרון בוואטסאפ
        </button>
      </motion.div>
    </>
  );
}
