"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ShieldCheck, ShoppingCart, Globe, Phone, Mail, MapPin, 
  X, Check, Trash2, Home, Construction, Paintbrush, 
  Droplets, Zap, Shield, ChevronLeft, Plus, Minus, Box,
  ArrowRight, HardHat, Ruler, Building2, Hammer, Settings,
  Info, CheckCircle2, Factory, Truck, PenTool, Scale, Warehouse
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** * =================================================================================
 * MODULE 1: THE MASTER DATA ENGINE (מנוע הנתונים - כאן נכנס המפרט מה-PDF)
 * =================================================================================
 */

const EFRATI_DB = {
  he: {
    brand: "א.א אפרתי",
    owners: "אשר & אהרון",
    contact: "צור קשר",
    selectQty: "בחר כמות",
    addToSpec: "הוסף למפרט",
    sendWhatsApp: "שלח לאשר ואהרון",
    servicesTitle: "השירותים והמפרטים שלנו"
  },
  en: {
    brand: "A.A Efrati",
    owners: "Asher & Aaron",
    contact: "Contact",
    selectQty: "Select Quantity",
    addToSpec: "Add to Spec",
    sendWhatsApp: "Send to Asher & Aaron",
    servicesTitle: "Our Services & Specifications"
  }
};

// פירוט קטלוג מלא מבוסס על ה-PDF של סטודיו קרמיקה ונספחי הבנייה
const FULL_CATALOG = {
  "ריצוף פנים וחוץ": [
    { id: "p1", title: "מונטריאול אפור (Montreal)", specs: "80/80 מט R10 - מיוצר באירופה", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
    { id: "p2", title: "אידרה בז' משי (Idra)", specs: "80/80 משי קטיפתי יוקרתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
    { id: "p3", title: "אמאני לבן (Amani)", specs: "80/80 מט נקי ומודרני", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
    { id: "p4", title: "ארק סילבר (Arc Silver)", specs: "80/80 מראה בטון תעשייתי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
    { id: "p5", title: "מדרה אוק (Madera Oak)", specs: "15/60 דמוי פרקט עץ טבעי", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
    { id: "p6", title: "דקו בטון אפור (Antislip)", specs: "33/33 אנטי-סליפ R11 לחדרים רטובים", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" }
  ],
  "כלים סניטריים וברזים": [
    { id: "p7", title: "אסלה תלויה Geberit", specs: "מנגנון סמוי + מושב הידראולי שקט", unit: "יחידה", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
    { id: "p8", title: "ברז רובי שחור מט", specs: "אינטרפוץ 4 דרך, סדרת יוקרה", unit: "יחידה", img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" },
    { id: "p9", title: "אמבטיה אקרילית 170/70", specs: "חיזוק פיברגלס, דגם מלבני", unit: "יחידה", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800" }
  ],
  "דלתות ועבודות עץ": [
    { id: "p10", title: "דלת רב-בריח פולימרית", specs: "עמידות למים ולטרמיטים, משקוף עץ", unit: "יחידה", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" }
  ],
  "מפרט הנדסי ושלד": [
    { id: "s1", title: "יציקת בטון B-300", specs: "בטון מזוין לפי תקן 466, כולל בדיקות מעבדה", unit: "קוב", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
    { id: "s2", title: "איטום ביטומני", specs: "שתי שכבות 5 מ\"מ, כולל הגנה תרמית", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" }
  ]
};

const SERVICES_LIST = [
  { id: "cat1", title: "ריצוף וחיפוי", icon: LayoutGrid, category: "ריצוף פנים וחוץ" },
  { id: "cat2", title: "כלים סניטריים", icon: Droplets, category: "כלים סניטריים וברזים" },
  { id: "cat3", title: "דלתות וגמר", icon: Home, category: "דלתות ועבודות עץ" },
  { id: "cat4", title: "הנדסת שלד", icon: Construction, category: "מפרט הנדסי ושלד" }
];

/** * =================================================================================
 * MODULE 2: MAIN COMPONENT (פתרון שגיאת ה-HYDRATION)
 * =================================================================================
 */

export default function AAEfratiCompleteSite() {
  const [isMounted, setIsMounted] = useState(false);
  const [lang, setLang] = useState("he");
  const [activeService, setActiveService] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // פתרון קריטי לשגיאה: ה-useEffect מבטיח שהקוד ירוץ רק בצד הלקוח
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = EFRATI_DB[lang];

  const addToCart = useCallback((product, qty) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty } : i);
      return [...prev, { ...product, qty }];
    });
    setActiveService(null);
  }, []);

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  if (!isMounted) return null; // מונע שגיאת אי-התאמה בין שרת ללקוח

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === "he" ? "rtl font-sans" : "ltr font-sans"}`} dir={lang === "he" ? "rtl" : "ltr"}>
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 h-24 flex items-center px-6 md:px-20 justify-between">
        <div className="flex items-center gap-5 cursor-pointer" onClick={() => setActiveService(null)}>
          <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-xl shadow-slate-200">
            <ShieldCheck size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-[1000] tracking-tighter leading-none">{t.brand}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] mt-1">{t.owners}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === "he" ? "en" : "he")} className="p-3 bg-slate-50 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2">
             <Globe size={18} /> {lang}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-2xl">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 w-7 h-7 rounded-full text-[11px] flex items-center justify-center font-black border-4 border-white animate-pulse">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="pt-32 pb-20">
        {!activeService ? (
          <section className="px-6 md:px-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
              <h2 className="text-7xl md:text-[140px] font-[1000] tracking-tighter leading-[0.8] mb-12">
                בונים <br /> <span className="text-orange-600 italic">ביטחון.</span>
              </h2>
              <p className="text-2xl text-slate-400 font-bold max-w-2xl leading-relaxed">
                ניהול פרויקטים, הנדסת שלד וגמר פרימיום. בחר מחלקה לצפייה במפרט ובחירת חומרים.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES_LIST.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className="group cursor-pointer p-12 bg-slate-50 rounded-[60px] hover:bg-slate-900 hover:text-white transition-all duration-700"
                >
                  <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center mb-10 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <service.icon size={40} />
                  </div>
                  <h3 className="text-3xl font-[1000] tracking-tighter mb-4">{service.title}</h3>
                  <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                    Open Catalog <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <CatalogView 
            service={activeService} 
            onBack={() => setActiveService(null)} 
            items={FULL_CATALOG[activeService.category] || []}
            onAdd={addToCart}
            t={t}
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
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** * =================================================================================
 * SUB-MODULES (דפי קטלוג ועגלה)
 * =================================================================================
 */

function CatalogView({ service, onBack, items, onAdd, t }) {
  return (
    <motion.section initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="px-6 md:px-20">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest mb-16 hover:text-orange-600 transition-colors">
        <ChevronLeft size={20} /> חזרה לשירותים
      </button>
      
      <div className="mb-20">
        <h2 className="text-6xl md:text-9xl font-[1000] tracking-tighter mb-4">{service.title}</h2>
        <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">Available Specifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
        {items.map(item => (
          <ProductCard key={item.id} item={item} onAdd={onAdd} t={t} />
        ))}
      </div>
    </motion.section>
  );
}

function ProductCard({ item, onAdd, t }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="group bg-white border border-slate-100 rounded-[60px] p-8 shadow-sm hover:shadow-2xl transition-all duration-700">
      <div className="aspect-square rounded-[45px] overflow-hidden mb-8 relative">
        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={item.title} />
      </div>
      <h4 className="text-3xl font-[1000] tracking-tighter mb-2">{item.title}</h4>
      <p className="text-sm text-slate-400 font-bold mb-8 h-10">{item.specs}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-100 rounded-2xl p-2 font-black">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-white rounded-xl transition-all"><Minus size={14}/></button>
          <span className="w-12 text-center text-lg">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-white rounded-xl transition-all"><Plus size={14}/></button>
        </div>
        <button 
          onClick={() => onAdd(item, qty)}
          className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-[1000] text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl"
        >
          {t.addToSpec}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, t }) {
  const total = cart.length;
  
  const handleSend = () => {
    const message = `שלום אשר ואהרון, אשמח לקבל הצעת מחיר עבור המפרט הבא:\n\n${cart.map(i => `• ${i.title} - כמות: ${i.qty} ${i.unit}`).join('\n')}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200]" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[201] p-12 md:p-20 flex flex-col shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center mb-16">
          <h3 className="text-5xl font-[1000] tracking-tighter italic">MY SPEC.</h3>
          <button onClick={onClose} className="p-4 bg-slate-50 rounded-2xl"><X /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          {cart.length === 0 ? (
            <div className="py-20 text-center opacity-10 grayscale">
              <Box size={100} className="mx-auto mb-6" />
              <p className="font-[1000] text-2xl uppercase tracking-[10px]">Empty</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-8 p-8 bg-slate-50 rounded-[40px] items-center group relative overflow-hidden">
              <img src={item.img} className="w-24 h-24 rounded-3xl object-cover" alt="" />
              <div className="flex-1">
                <h5 className="font-black text-xl leading-none mb-2">{item.title}</h5>
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{item.qty} {item.unit}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-all"><Trash2 size={24}/></button>
            </div>
          ))}
        </div>

        <div className="pt-10 mt-10 border-t border-slate-100">
          <div className="flex justify-between items-center mb-10">
             <span className="font-black text-slate-400 uppercase tracking-widest">Total Items</span>
             <span className="text-4xl font-[1000] tracking-tighter">{total}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handleSend}
            className="w-full bg-orange-600 text-white py-10 rounded-[40px] font-[1000] text-2xl shadow-2xl shadow-orange-200 disabled:grayscale transition-all hover:scale-[1.02]"
          >
            {t.sendWhatsApp}
          </button>
        </div>
      </motion.div>
    </>
  );
}
