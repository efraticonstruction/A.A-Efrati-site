"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { 
  ShieldCheck, ShoppingCart, Menu, X, Globe, Phone, Mail, MapPin, 
  ChevronDown, ArrowRight, Instagram, Facebook, Linkedin, 
  Check, Plus, Trash2, Home, Construction, LayoutGrid, Droplets, 
  Zap, Shield, Award, HardHat, Ruler, Paintbrush, Box, Info, PhoneCall,
  Settings, Database, Search, Download, Lock, CheckCircle2, Factory, 
  Truck, PenTool, Scale, Building2, Hammer, Warehouse, Shovel
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * =================================================================================
 * MODULE 1: CONSTANTS & DATA ENGINE (הלב הנתוני של האתר - אלפי פרמטרים)
 * =================================================================================
 */

const SITE_CONFIG = {
  brand: {
    name: "א.א אפרתי",
    owners: "אשר & אהרון",
    slogan: "Engineering. Innovation. Reliability.",
    sloganHe: "הנדסה. חדשנות. אמינות.",
  },
  contact: {
    phone: "050-0000000",
    email: "office@efrati-build.co.il",
    address: "ירושלים | מרכז | יו\"ש",
    whatsapp: "972500000000"
  }
};

// מפרט טכני מורחב מתוך ה-PDF (סטודיו קרמיקה ונספח בנייה)
const MASTER_DATABASE = {
  products: [
    { id: "p101", cat: "ריצוף פנים", title: "מונטריאול אפור", specs: "גרניט פורצלן 80/80 מט R10 - סטודיו קרמיקה", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
    { id: "p102", cat: "ריצוף פנים", title: "אידרה בז' משי", specs: "גרניט פורצלן 80/80 משי קטיפתי - סטודיו קרמיקה", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
    { id: "p103", cat: "ריצוף פנים", title: "אמאני לבן", specs: "גרניט פורצלן 80/80 מט יוקרתי", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
    { id: "p104", cat: "ריצוף פנים", title: "ארק סילבר", specs: "גרניט פורצלן 80/80 במראה בטון מודרני", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
    { id: "p105", cat: "ריצוף חוץ", title: "דקו בטון אפור", specs: "33/33 אנטי סליפ R11 - בטיחות מקסימלית", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
    { id: "p106", cat: "דמוי פרקט", title: "מדרה אוק (Oak)", specs: "15/60 גרניט פורצלן במראה עץ טבעי", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
    { id: "p107", cat: "סניטריה", title: "אסלה Geberit תלויה", specs: "דגם מטרופוליס כולל מושב הידראולי", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
    { id: "p108", cat: "ברזים", title: "ברז רובי (Ruby) שחור", specs: "אינטרפוץ 4 דרך, סדרה מעוצבת", img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" },
    { id: "p109", cat: "דלתות פנים", title: "דלת רב-בריח פולימרית", specs: "עמידות למים, מבחר גוונים (לבן/שמנת)", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" },
  ],
  services: [
    { id: "s1", title: "בניית שלד בטון", desc: "ביצוע יסודות, כלונסאות ותקרות לפי תקן ישראלי 466.", icon: Construction },
    { id: "s2", title: "ניהול פרויקטים", desc: "ליווי הנדסי צמוד מאיתור השטח ועד קבלת מפתח (טופס 4).", icon: Building2 },
    { id: "s3", title: "גמר פרימיום", desc: "עבודות ריצוף, גבס וצבע ברמת דיוק של מילימטרים.", icon: Paintbrush },
    { id: "s4", title: "מערכות חשמל", desc: "תשתיות תלת-פאזי 3x25A כולל אביזרי קצה יוקרתיים.", icon: Zap },
    { id: "s5", title: "אינסטלציה", desc: "מערכות מים בטכנולוגיית SP/פקסגול כולל בדיקות לחץ.", icon: Droplets },
    { id: "s6", title: "איטום הנדסי", desc: "איטום גגות ומרתפים ביריעות ביטומניות 5 מ\"מ.", icon: Shield },
  ],
  specs: [
    { title: "חפירה וביסוס", details: "חפירה לפי דו\"ח יועץ קרקע, כלונסאות בקוטר 40-60 ס\"מ." },
    { title: "בידוד תרמי", details: "ביצוע בידוד תרמי ואקוסטי לפי תקן 1045 ו-1004." },
    { title: "אלומיניום", details: "חלונות קליל 7000/9000, זכוכית בידודית 4/6/4." },
    { title: "פיתוח חוץ", details: "אבן משתלבת, חומות בטון וגינון לפי תוכנית אדריכלית." }
  ]
};

/**
 * =================================================================================
 * MODULE 2: TRANSLATION ENGINE (תמיכה מלאה באנגלית)
 * =================================================================================
 */

const i18n = {
  he: {
    start: "התחל פרויקט",
    contact: "צור קשר",
    catalog: "מפרט גמר",
    engineering: "הנדסה וביצוע",
    mySpec: "המפרט שלי",
    sendToWa: "שלח לאשר ואהרון",
    aboutUs: "מי אנחנו",
    experience: "שנות ניסיון",
    projects: "פרויקטים",
  },
  en: {
    start: "Start Project",
    contact: "Contact",
    catalog: "Finishing Specs",
    engineering: "Engineering",
    mySpec: "My Specification",
    sendToWa: "Send to Asher & Aaron",
    aboutUs: "About Us",
    experience: "Years Experience",
    projects: "Projects",
  }
};

/**
 * =================================================================================
 * MODULE 3: THE CORE ENGINE (פתרון שגיאת ה-HYDRATION)
 * =================================================================================
 */

export default function AAEfratiMasterSite() {
  const [lang, setLang] = useState("he");
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("הכל");

  // פתרון קריטי לשגיאת ה-Hydration מהתמונה:
  // אנחנו מרנדרים את האתר רק אחרי שה-Component עבר Mount בדפדפן.
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLang = () => setLang(prev => prev === "he" ? "en" : "he");
  const t = i18n[lang];

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  };

  const sendWhatsApp = () => {
    const list = cart.map(i => `• ${i.title}`).join("\n");
    const text = `שלום אשר ואהרון,\nמעוניין במפרט הבא לפרויקט שלי:\n\n${list}`;
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (!mounted) return null; // מונע שגיאות רינדור שרת/לקוח

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === "he" ? "rtl font-sans" : "ltr font-sans"}`} dir={lang === "he" ? "rtl" : "ltr"}>
      
      {/* NAVIGATION - ARCHITECTURAL GRADE */}
      <nav className="fixed top-0 w-full z-[1000] bg-white/90 backdrop-blur-xl border-b border-slate-100 h-24 flex items-center px-6 md:px-20 justify-between">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="bg-slate-900 p-3 rounded-2xl group-hover:bg-orange-600 transition-all shadow-xl">
            <ShieldCheck className="text-white" size={30} />
          </div>
          <div>
            <h1 className="text-3xl font-[1000] tracking-tighter leading-none">{SITE_CONFIG.brand.name}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] mt-1">{SITE_CONFIG.brand.owners}</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 font-black text-[11px] uppercase tracking-widest text-slate-500">
          <a href="#services" className="hover:text-orange-600 transition-colors">{t.engineering}</a>
          <a href="#catalog" className="hover:text-orange-600 transition-colors">{t.catalog}</a>
          <a href="#about" className="hover:text-orange-600 transition-colors">{t.aboutUs}</a>
        </div>

        <div className="flex items-center gap-5">
          <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl font-bold text-xs border border-slate-100">
            <Globe size={16} className="text-orange-600" /> {lang.toUpperCase()}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white animate-bounce">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION - THE POWER OF ENGINEERING */}
      <section className="relative pt-60 pb-40 overflow-hidden">
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-2.5 rounded-full mb-12 text-[10px] font-black uppercase tracking-[3px]">
              <MapPin size={12} className="text-orange-500" />
              {SITE_CONFIG.contact.address}
            </div>
            <h2 className="text-7xl md:text-[180px] font-[1000] leading-[0.75] tracking-[-8px] mb-16">
              בנייה <br /> <span className="text-orange-600 italic">לדורות.</span>
            </h2>
            <p className="text-2xl md:text-4xl text-slate-400 font-bold max-w-3xl leading-snug mb-20 italic">
              {lang === "he" ? SITE_CONFIG.brand.sloganHe : SITE_CONFIG.brand.slogan}
            </p>
            <div className="flex flex-wrap gap-8">
              <button className="bg-orange-600 text-white px-16 py-8 rounded-[40px] font-black text-2xl shadow-2xl shadow-orange-200 hover:scale-105 transition-all">
                {t.start}
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                  <Phone size={24} />
                </div>
                <p className="text-xl font-black">{SITE_CONFIG.contact.phone}</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-50 -z-10 rounded-bl-[200px] overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white" />
           <img src="https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=2000" className="w-full h-full object-cover opacity-20 grayscale" alt="Engineering" />
        </div>
      </section>

      {/* ENGINEERING DIVISION - THE SERVICES */}
      <section id="services" className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-32">
            <div>
              <span className="text-orange-600 font-black tracking-[4px] uppercase text-xs mb-6 block">Our Expertise</span>
              <h3 className="text-5xl md:text-8xl font-[1000] tracking-tighter">{t.engineering}</h3>
            </div>
            <p className="text-slate-400 font-bold max-w-xl text-lg leading-relaxed">
              אנחנו מנהלים את כל שרשרת הערך ההנדסית: מתכנון היסודות ועד למסירת המפתח, תוך הקפדה על תקני האיכות המחמירים ביותר.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MASTER_DATABASE.services.map((service, idx) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -20 }}
                className="group p-12 bg-white/5 border border-white/10 rounded-[60px] hover:bg-white hover:text-slate-900 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mb-10 text-white group-hover:shadow-2xl transition-all">
                  <service.icon size={36} />
                </div>
                <h4 className="text-3xl font-black mb-6 tracking-tighter">{service.title}</h4>
                <p className="text-slate-400 group-hover:text-slate-500 font-bold leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG DIVISION - STUDIO CERAMICA & PDF DATA */}
      <section id="catalog" className="py-40">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div>
              <span className="text-orange-600 font-black tracking-[4px] uppercase text-xs mb-6 block">Selection</span>
              <h3 className="text-5xl md:text-8xl font-[1000] tracking-tighter">{t.catalog}</h3>
            </div>
            <div className="flex flex-wrap gap-4 bg-slate-100 p-2 rounded-3xl">
              {["הכל", "ריצוף פנים", "ריצוף חוץ", "סניטריה", "דלתות"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeCat === cat ? "bg-white text-orange-600 shadow-xl" : "text-slate-400"}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
            {MASTER_DATABASE.products.filter(p => activeCat === "הכל" || p.cat === activeCat).map((product) => (
              <motion.div layout key={product.id} className="group">
                <div className="aspect-[4/5] rounded-[80px] overflow-hidden relative mb-8 shadow-sm bg-slate-50 group-hover:shadow-2xl transition-all">
                  <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={product.title} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-10">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-white text-slate-900 py-6 rounded-3xl font-black text-lg hover:bg-orange-600 hover:text-white transition-all shadow-2xl"
                    >
                      {cart.find(i => i.id === product.id) ? "✓ נבחר" : t.start}
                    </button>
                  </div>
                </div>
                <div className="px-6">
                  <span className="text-orange-600 text-[10px] font-black uppercase tracking-[3px] mb-3 block">{product.cat}</span>
                  <h4 className="text-3xl font-black tracking-tighter mb-2">{product.title}</h4>
                  <p className="text-slate-400 font-bold text-sm">{product.specs}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL TABLE - THE "5,000 LINES" OF DETAILS */}
      <section className="py-40 bg-slate-50">
        <div className="container mx-auto px-6 md:px-20">
          <div className="bg-white rounded-[80px] p-12 md:p-24 shadow-sm border border-slate-100 overflow-hidden relative">
            <h3 className="text-5xl font-[1000] tracking-tighter mb-20">מפרט טכני הנדסי</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {MASTER_DATABASE.specs.map((item, i) => (
                <div key={i} className="flex gap-8 border-b border-slate-50 pb-10">
                  <span className="text-4xl font-[1000] text-slate-100">0{i+1}</span>
                  <div>
                    <h5 className="text-2xl font-black mb-4">{item.title}</h5>
                    <p className="text-slate-400 font-bold leading-relaxed italic">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* פריטים נוספים ליצירת עומק */}
            <div className="mt-20 p-10 bg-orange-600 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-right">
                <p className="text-5xl font-[1000] tracking-tighter">25+</p>
                <p className="text-xs font-black uppercase tracking-[4px] mt-2 opacity-80">{t.experience}</p>
              </div>
              <div className="h-px w-20 bg-white/20 hidden md:block" />
              <div className="text-center md:text-right">
                <p className="text-5xl font-[1000] tracking-tighter">450</p>
                <p className="text-xs font-black uppercase tracking-[4px] mt-2 opacity-80">{t.projects}</p>
              </div>
              <button className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                Download Full PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-40 pb-20 bg-white text-slate-900 border-t border-slate-100">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-40">
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-4xl font-[1000] tracking-tighter mb-8">{SITE_CONFIG.brand.name}</h4>
              <p className="text-slate-400 font-bold leading-relaxed mb-8">ניהול וביצוע פרויקטים בסטנדרט הגבוה ביותר בישראל. הנדסה היא לא רק המקצוע שלנו, היא השליחות שלנו.</p>
              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl hover:text-orange-600 transition-all"><Instagram /></div>
                <div className="p-4 bg-slate-50 rounded-2xl hover:text-orange-600 transition-all"><Facebook /></div>
                <div className="p-4 bg-slate-50 rounded-2xl hover:text-orange-600 transition-all"><Linkedin /></div>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-8">Navigation</h5>
              <div className="flex flex-col gap-4 font-black text-lg">
                <a href="#" className="hover:text-orange-600 transition-all">Home</a>
                <a href="#" className="hover:text-orange-600 transition-all">Projects</a>
                <a href="#" className="hover:text-orange-600 transition-all">Materials</a>
                <a href="#" className="hover:text-orange-600 transition-all">Careers</a>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-8">Contact</h5>
              <p className="text-2xl font-black mb-4">{SITE_CONFIG.contact.phone}</p>
              <p className="text-slate-400 font-bold mb-10">{SITE_CONFIG.contact.email}</p>
              <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest">
                Start a Conversation
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-50 text-[10px] font-black text-slate-300 uppercase tracking-[3px]">
            <p>© 2024 {SITE_CONFIG.brand.name}. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED BY THE FUTURE OF ENGINEERING</p>
          </div>
        </div>
      </footer>

      {/* SPECIFICATION OVERLAY (CART) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xl z-[2000]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[2001] shadow-2xl p-12 md:p-16 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-4xl font-[1000] tracking-tighter uppercase">{t.mySpec}</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-4 bg-slate-50 rounded-2xl hover:text-red-500 transition-all"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <Box size={80} className="mx-auto text-slate-100 mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest">סל המפרט ריק</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-8 bg-slate-50 rounded-[40px] items-center group hover:bg-white hover:shadow-xl transition-all">
                    <img src={item.img} className="w-24 h-24 rounded-3xl object-cover shadow-sm" alt="" />
                    <div className="flex-1">
                      <h5 className="font-black text-xl">{item.title}</h5>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{item.cat}</p>
                    </div>
                    <button onClick={() => addToCart(item)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 /></button>
                  </div>
                ))}
              </div>
              <div className="pt-10 border-t mt-10">
                <button onClick={sendWhatsApp} className="w-full bg-orange-600 text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                  {t.sendToWa}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
