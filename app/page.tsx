"use client";

import "./globals.css";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hammer, ShoppingCart, Star, CheckCircle2, Trash2, LayoutGrid, Home, 
  Droplets, Zap, DoorOpen, Utensils,  ShieldCheck, Box, 
  Settings, Ruler, Paintbucket, 
  MessageSquare,
} from "lucide-react";

// --- בסיס נתונים ענק של תמונות ומפרטים 2026 ---
const IMAGE_LIBRARY = {
  kitchens: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800",
  modern_kitchen: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
  luxury_bath: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800",
  ceramics: "https://images.unsplash.com/photo-1616486341353-c583c4d436bd?q=80&w=800",
  doors: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=800",
  aluminum: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
  stairs: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
  villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800"
};

const CATALOGS: any = {
  ceramics: [
    { id: 'c1', name: "גרניט פורצלן Calacatta 120/120", brand: "Laminam", price: 280, isPremium: true, img: IMAGE_LIBRARY.ceramics },
    { id: 'c2', name: "אריח דמוי פרקט אלון אירופי", brand: "Marazzi", price: 195, isPremium: true, img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=400" },
    { id: 'c3', name: "בטון אדריכלי חשוף 60/120", brand: "Mapei", price: 140, isPremium: false, img: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=400" }
  ],
  kitchens: [
    { id: 'k1', name: "מטבח נאנו גרפיט - אינטגרלי", desc: "פרזול Blum Legrabox", price: 65000, isPremium: true, img: IMAGE_LIBRARY.kitchens },
    { id: 'k2', name: "מטבח כפרי שלייפלאק לבן", desc: "חזיתות CNC מילואה", price: 48000, isPremium: true, img: IMAGE_LIBRARY.modern_kitchen },
    { id: 'k3', name: "מטבח חוץ נירוסטה 316", desc: "עמיד לפגעי מזג אוויר", price: 35000, isPremium: true, img: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?q=80&w=400" }
  ],
  aluminum: [
    { id: 'a1', name: "קליל Office 5500", desc: "פרופיל בלגי מינימליסטי", price: 3500, isPremium: true, img: IMAGE_LIBRARY.aluminum },
    { id: 'a2', name: "קליל 9200 הזזה", desc: "מפתח ענק לגינה", price: 4200, isPremium: true, img: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=400" }
  ],
  sanitary: [
    { id: 's1', name: "אסלה תלויה Rimless שחור מט", brand: "Vitra", price: 2400, isPremium: true, img: IMAGE_LIBRARY.luxury_bath },
    { id: 's2', name: "מערכת רחצה 4 דרך זהב מוברש", brand: "Grohe", price: 3200, isPremium: true, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400" }
  ],
  doors: [
    { id: 'd1', name: "דלת כניסה קו אפס - גובה 3 מטר", desc: "חיפוי אבן טבעית", price: 15000, isPremium: true, img: IMAGE_LIBRARY.doors },
    { id: 'd2', name: "דלת פנים פולימר אקוסטית", desc: "עמידות מלאה למים", price: 1850, isPremium: false, img: "https://images.unsplash.com/photo-1517646331032-9e8563c520a1?q=80&w=400" }
  ],
  stairs: [
    { id: 'st1', name: "מדרגות מרחפות עץ וזכוכית", desc: "סטנדרט וילה יוקרתית", price: 2500, isPremium: true, img: IMAGE_LIBRARY.stairs }
  ]
};

const SERVICES = [
  { id: 'p1', title: "בניית וילה מאפס (מפתח)", cat: "חבילות", price: 9500, unit: "מ״ר", icon: Home, img: IMAGE_LIBRARY.villa },
  { id: 'p2', title: "שיפוץ דירה קומפלט", cat: "חבילות", price: 3200, unit: "מ״ר", icon: Construction, img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=400" },
  { id: 's1', title: "עבודות ריצוף וגמר", cat: "גמר", price: 180, unit: "מ״ר", icon: LayoutGrid, canAddMaterial: true, catalogKey: 'ceramics' },
  { id: 's2', title: "התקנת מטבחים", cat: "נגרות", price: 4500, unit: "יחידה", icon: Utensils, canAddMaterial: true, catalogKey: 'kitchens' },
  { id: 's3', title: "עבודות חשמל ותאורה", cat: "תשתיות", price: 350, unit: "נקודה", icon: Zap },
  { id: 's4', title: "אינסטלציה וסניטריה", cat: "תשתיות", price: 850, unit: "נקודה", icon: Droplets, canAddMaterial: true, catalogKey: 'sanitary' },
];

export default function AA_Efrati_Final() {
  const [activeTab, setActiveTab] = useState("בית");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [includeMat, setIncludeMat] = useState(false);
  const [chosenProd, setChosenProd] = useState<any>(null);

  const total = useMemo(() => cart.reduce((s, i) => s + i.total, 0), [cart]);

  const addToCart = () => {
    const itemTotal = (selectedService.price * qty) + (includeMat && chosenProd ? chosenProd.price * qty : 0);
    setCart([...cart, { ...selectedService, qty, includeMat, chosenProd, total: itemTotal }]);
    setSelectedService(null);
    setChosenProd(null);
    setQty(1);
    setIncludeMat(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white text-neutral-900 font-sans">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab("בית")}>
          <div className="bg-black text-white p-2 rounded-lg"><Hammer size={24}/></div>
          <div>
            <h1 className="text-xl font-black">א.א אפרתי</h1>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">עבודה עברית • סטנדרט אירופי</p>
          </div>
        </div>
        <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-widest">
          {["בית", "שירותים", "קטלוגים", "עגלה"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={activeTab === t ? "text-black border-b-2 border-black" : "text-neutral-400"}>{t}</button>
          ))}
        </div>
        <button onClick={() => setActiveTab("עגלה")} className="relative p-3 bg-neutral-100 rounded-full">
          <ShoppingCart size={22} />
          {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">{cart.length}</span>}
        </button>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        
        {/* VIEW: HOME */}
        {activeTab === "בית" && (
          <section>
            <div className="text-center mb-24">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter italic">DESIGN <br/><span className="text-neutral-200">EXCELLENCE</span></motion.h2>
              <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium mb-12 italic">א.א אפרתי - מלווים אותך מהחלום ועד המפתח עם צוותי עבודה עברית ואיכות ללא פשרות.</p>
              <button onClick={() => setActiveTab("שירותים")} className="bg-black text-white px-16 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform">התחל הצעת מחיר</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden"><img src={IMAGE_LIBRARY.villa} className="w-full h-full object-cover" /></div>
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mt-12"><img src={IMAGE_LIBRARY.kitchens} className="w-full h-full object-cover" /></div>
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden"><img src={IMAGE_LIBRARY.luxury_bath} className="w-full h-full object-cover" /></div>
            </div>
          </section>
        )}

        {/* VIEW: SERVICES */}
        {activeTab === "שירותים" && (
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <div key={s.id} onClick={() => setSelectedService(s)} className="group cursor-pointer bg-neutral-50 p-8 rounded-[3rem] hover:bg-black hover:text-white transition-all">
                <div className="mb-6"><s.icon size={32} /></div>
                <h3 className="text-2xl font-black mb-2">{s.title}</h3>
                <p className="text-sm opacity-60 font-bold mb-6">₪{s.price} / {s.unit}</p>
                <div className="aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img src={s.img || IMAGE_LIBRARY.villa} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: CATALOGS */}
        {activeTab === "קטלוגים" && (
          <div className="space-y-32">
            {Object.entries(CATALOGS).map(([key, items]: any) => (
              <div key={key}>
                <div className="flex justify-between items-end mb-12">
                  <h3 className="text-5xl font-black capitalize">{key} פרימיום</h3>
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Collection 2026</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {items.map((p: any) => (
                    <div key={p.id} className="group cursor-pointer" onClick={() => { if(selectedService) setChosenProd(p); }}>
                      <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-4 relative bg-neutral-100">
                        <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        {p.isPremium && <span className="absolute top-4 right-4 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full shadow-xl">PREMIUM</span>}
                      </div>
                      <h4 className="font-bold text-sm">{p.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-black mt-1 uppercase">{p.brand || p.desc}</p>
                      <div className="mt-2 font-black">₪{p.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: CART */}
        {activeTab === "עגלה" && (
          <div className="max-w-2xl mx-auto bg-neutral-50 p-12 rounded-[4rem]">
            <h2 className="text-4xl font-black mb-12 flex items-center justify-between">הסל שלך <Award size={32}/></h2>
            {cart.length === 0 ? <p className="text-center py-20 font-bold italic text-neutral-400">העגלה ריקה...</p> : (
              <div className="space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-6">
                    <div>
                      <h4 className="font-black text-lg">{item.title}</h4>
                      <p className="text-xs font-bold text-neutral-400 uppercase">{item.qty} {item.unit} • {item.includeMat ? `חומר: ${item.chosenProd?.name}` : 'עבודה בלבד'}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-black text-xl">₪{item.total.toLocaleString()}</span>
                      <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 size={20}/></button>
                    </div>
                  </div>
                ))}
                <div className="pt-10 flex justify-between items-end">
                   <h3 className="text-5xl font-black tracking-tighter">₪{total.toLocaleString()}</h3>
                   <button onClick={() => window.open(`https://wa.me/972556808431?text=אשמח להצעת מחיר בסך ${total}`, "_blank")} className="bg-black text-white px-10 py-5 rounded-full font-black">שלח הצעה בוואטסאפ</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CONFIG MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="w-full max-w-xl">
              <h3 className="text-5xl font-black mb-12 tracking-tighter">{selectedService.title}</h3>
              <div className="space-y-12">
                <div>
                  <label className="text-[10px] font-black uppercase mb-4 block tracking-widest text-neutral-400">כמות ({selectedService.unit})</label>
                  <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full text-6xl font-black bg-transparent border-b-4 border-black outline-none pb-4" />
                </div>
                {selectedService.canAddMaterial && (
                  <div className="flex gap-4">
                    <button onClick={() => setIncludeMat(false)} className={`flex-1 py-6 rounded-3xl font-black border-2 ${!includeMat ? "bg-black text-white" : "border-neutral-200"}`}>רק עבודה</button>
                    <button onClick={() => {setIncludeMat(true); setActiveTab("קטלוגים");}} className={`flex-1 py-6 rounded-3xl font-black border-2 ${includeMat ? "bg-black text-white" : "border-neutral-200"}`}>כולל חומר</button>
                  </div>
                )}
                {chosenProd && <div className="p-6 bg-neutral-100 rounded-3xl font-bold flex justify-between">נבחר: {chosenProd.name} <button onClick={() => setChosenProd(null)}>ביטול</button></div>}
                <div className="flex gap-4">
                  <button onClick={addToCart} className="flex-1 bg-black text-white py-6 rounded-full font-black text-xl">הוסף לעגלה</button>
                  <button onClick={() => setSelectedService(null)} className="px-10 py-6 font-bold">סגור</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-neutral-100 text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300">
        א.א אפרתי • עבודה עברית • 2026
      </footer>

      {/* WhatsApp Floating */}
      <a href="https://wa.me/972556808431" className="fixed bottom-10 right-10 bg-black text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageSquare size={30} />
      </a>
    </div>
  );
}
