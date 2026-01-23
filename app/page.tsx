"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home, Droplets, Zap, Utensils, 
  ShieldCheck, Ruler, MessageSquare, Phone, Instagram, Facebook, Layers, 
  Paintbrush, Box, HardHat, Construction, Wrench, Thermometer, Sun, Wind, 
  Move, Scaling, Lightbulb, HeartHandshake, Award, PencilRuler, Drill, 
  Smartphone, Waves, Trash2, ShoppingCart, X, Plus, Check, PhoneCall, MapPin, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- הגדרות קבועות ---
const PHONE_NUMBER = "972500000000"; 
const BRAND_NAME = "א.א אפרתי";
const SERVICE_AREAS = "מרכז | ירושלים | יהודה ושומרון";

// --- מאגר נתונים מלא ומדויק (ללא כפילויות) ---
const ALL_DATA = [
  // שירותי בנייה ושלד
  { id: "s1", type: "service", cat: "בנייה ושלד", title: "בניית וילות יוקרה", desc: "ביצוע מאפס עד מפתח בסטנדרט הנדסי עליון.", price: "9,500", unit: "מ\"ר", icon: Home, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: "s2", type: "service", cat: "בנייה ושלד", title: "תוספות בנייה והרחבות", desc: "הרחבת מבנים קיימים כולל אישורי קונסטרוקטור.", price: "8,200", unit: "מ\"ר", icon: Layers, img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=800" },
  { id: "s3", type: "service", cat: "בנייה ושלד", title: "בניית ממ\"דים תקניים", desc: "מיגון הבית לפי הנחיות פיקוד העורף.", price: "120,000", unit: "יח'", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1590059132612-58832a57894a?q=80&w=800" },
  { id: "s4", type: "service", cat: "תשתיות", title: "אינסטלציה מתקדמת", desc: "מערכות צנרת חכמות ומניעת נזילות.", price: "2,500", unit: "נקודה", icon: Droplets, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
  { id: "s5", type: "service", cat: "תשתיות", title: "חשמל ותקשורת", desc: "תשתית בית חכם ולוחות חשמל מורכבים.", price: "450", unit: "נקודה", icon: Zap, img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" },
  { id: "s6", type: "service", cat: "מערכות", title: "בריכות שחייה", desc: "תכנון וביצוע בריכות בטון וגלישה.", price: "150,000", unit: "החל מ-", icon: Waves, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800" },
  { id: "s7", type: "service", cat: "גמר", title: "ריצוף וחיפוי פרימיום", desc: "עבודות דיוק בלייזר לכל סוגי האריחים.", price: "280", unit: "מ\"ר", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  
  // מוצרים מהקטלוג (PDF)
  { id: "p1", type: "product", cat: "ריצוף פנים", title: "מונטריאול אפור", desc: "גרניט פורצלן 80/80 מט R10 - סטודיו קרמיקה.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  { id: "p2", type: "product", cat: "ריצוף פנים", title: "אידרה בז' משי", desc: "אריחי 80/80 בגימור משי יוקרתי.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { id: "p3", type: "product", cat: "ריצוף פנים", title: "אמאני לבן", desc: "מראה שיש נקי ומבריק (Lappato).", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
  { id: "p4", type: "product", cat: "ריצוף פנים", title: "ארק סילבר", desc: "סדרת ARC מודרנית בגוון אפור בטון.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
  { id: "p5", type: "product", cat: "ריצוף חוץ", title: "דקו בטון אפור", desc: "אנטי-סליפ 33/33 למרפסות וחוץ.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
  { id: "p6", type: "product", cat: "ריצוף דמוי עץ", title: "מדרה אלון", desc: "גרניט פורצלן 60/15 במראה עץ טבעי.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
  { id: "p7", type: "product", cat: "סניטריה", title: "אסלה תלויה GEBERIT", desc: "סדרת יוקרה כולל מושב הידראולי.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
  { id: "p8", type: "product", cat: "ברזים", title: "ברז אומגה שחור", desc: "סדרת Ruby פרימיום בגימור מט.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" },
  { id: "p9", type: "product", cat: "דלתות", title: "דלת פולימרית רב-בריח", desc: "דלת עמידה למים בגימור לבן/שמנת.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" },
  { id: "p10", type: "product", cat: "סניטריה", title: "אינטרפוץ 4 דרך", desc: "מנגנון קרמי איכותי, כרום מבריק.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1585202900225-6d3ac20a6962?q=80&w=800" }
];

export default function AAEfratiUltimateSite() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("הכל");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // סינון חכם ללא כפילויות
  const items = useMemo(() => {
    return ALL_DATA.filter(item => {
      const matchFilter = filter === "הכל" || item.cat === filter || (filter === "שירותים" && item.type === "service") || (filter === "מוצרים" && item.type === "product");
      const matchSearch = item.title.includes(search) || item.cat.includes(search);
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const toggleCart = (item) => {
    setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]);
    if (!cart.find(i => i.id === item.id)) setIsCartOpen(true);
  };

  const sendOrder = () => {
    const text = `שלום א.א אפרתי, אשמח לקבל הצעה מפורטת.\n\nהבחירות שלי מהאתר:\n${cart.map(i => `• ${i.title} (${i.cat})`).join("\n")}\n\nאזור שירות: [מרכז/י-ם/יו"ש]`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900 rtl font-sans" dir="rtl">
      
      {/* Banner אזורי שירות */}
      <div className="bg-slate-900 text-white py-2 text-center text-[10px] font-black uppercase tracking-[3px] z-[110] relative">
        <MapPin size={10} className="inline-block ml-2 mb-0.5" />
        שירות מקצועי בפריסה ארצית: {SERVICE_AREAS}
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-xl py-2" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-[1000] tracking-tighter block leading-none">{BRAND_NAME}</span>
              <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest mt-1">קבוצת בנייה והנדסה</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            {["הכל", "שירותים", "מוצרים", "ריצוף פנים"].map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${filter === f ? "bg-white text-orange-600 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-white border-2 border-slate-100 rounded-2xl hover:border-orange-600 transition-all group">
              <ShoppingCart size={22} className="group-hover:text-orange-600 transition-colors" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white animate-pulse">{cart.length}</span>}
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="hidden md:flex bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all items-center gap-2">
              <PhoneCall size={16} /> שיחה ישירה
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-6xl md:text-[110px] font-[1000] leading-[0.85] tracking-[-4px] mb-8">
              הבית שלך,<br /><span className="text-orange-600 italic">בידיים בטוחות.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto mb-12">
              מומחים בבנייה, גמר ואספקת חומרים יוקרתיים. <br className="hidden md:block" />
              חווית בנייה שמתחילה בתכנון ומסתיימת בחיוך.
            </p>
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="חפש מוצר (מונטריאול, אידרה) או שירות..." 
                className="w-full bg-white border-2 border-slate-100 py-5 pr-14 pl-6 rounded-[24px] font-bold shadow-xl shadow-slate-200/50 outline-none focus:border-orange-600 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="bg-white rounded-[44px] border border-slate-100 p-5 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group"
              >
                <div className="h-72 rounded-[36px] overflow-hidden relative mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest shadow-sm">
                    {item.cat}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-xs font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 className="text-2xl font-[900] mb-2 tracking-tighter group-hover:text-orange-600 transition-colors">{item.title}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="text-xl font-black text-slate-900">₪{item.price}</span>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-tighter">ל-{item.unit}</span>
                    </div>
                    <button 
                      onClick={() => toggleCart(item)}
                      className={`p-4 rounded-[20px] transition-all ${
                        cart.find(i => i.id === item.id) 
                          ? "bg-green-500 text-white shadow-lg shadow-green-100" 
                          : "bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      {cart.find(i => i.id === item.id) ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[201] shadow-2xl p-10 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-[1000] tracking-tighter uppercase">הסל שלי</h2>
                  <div className="h-1 w-12 bg-orange-600 mt-1"></div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="bg-slate-100 p-3 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"><X size={24}/></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20 opacity-20 font-black italic">הסל ריק... עדיין.</div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-[28px] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0"><img src={item.img} className="w-full h-full object-cover" /></div>
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 leading-none mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.cat}</p>
                    </div>
                    <button onClick={() => toggleCart(item)} className="text-slate-300 hover:text-red-500 transition-colors px-2"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t mt-6">
                <button onClick={sendOrder} className="w-full bg-orange-600 text-white py-6 rounded-3xl font-[1000] text-xl shadow-2xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all">
                  שלח מפרט לוואטסאפ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-24 mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl font-[1000] mb-8 leading-none italic">{BRAND_NAME}</h2>
            <p className="text-slate-400 font-bold max-w-md text-lg leading-relaxed">
              מלווים אתכם בכל שלב – מהיסודות ועד לפרטים הקטנים של הגמר. שירות אישי, הנדסה מדויקת ואמינות ללא פשרות במרכז ובאזור ירושלים.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-6">
            <div className="flex gap-4">
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Instagram size={24}/></div>
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Facebook size={24}/></div>
              <a href={`https://wa.me/${PHONE_NUMBER}`} className="p-4 bg-white/5 rounded-2xl hover:bg-green-500 transition-all"><MessageSquare size={24}/></a>
            </div>
            <p className="text-slate-500 font-black text-[10px] uppercase tracking-[4px]">© 2024 A.A EFRATI GROUP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
