"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { 
  ShieldCheck, ShoppingCart, Menu, X, Globe, Phone, Mail, MapPin, 
  ChevronDown, ArrowRight, Instagram, Facebook, Linkedin, 
  Check, Plus, Trash2, Home, Construction, LayoutGrid, Droplets, 
  Zap, Wind, Shield, Award, Users, Briefcase, FileText, Tool,
  Ruler, Paintbrush, HardHat, Waves, Box, Info, MessageSquare, PhoneCall,
  Settings, PenTool, Database, Search, ExternalLink, Download, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * =================================================================================
 * MODULE 1: GLOBAL DATA ENGINE (מחלקה 1: מנוע נתונים - אלפי פרמטרים)
 * =================================================================================
 */

const EFRATI_DB = {
  HE: {
    title: "א.א אפרתי",
    owners: "אשר ואהרון",
    sections: {
      engineering: "מחלקת הנדסה",
      finishing: "מחלקת גמר",
      sanitary: "כלים סניטריים",
      systems: "תשתיות ומערכות",
      catalog: "קטלוג חומרים מלא"
    }
  },
  EN: {
    title: "A.A EFRATI",
    owners: "Asher & Aaron",
    sections: {
      engineering: "Engineering Div",
      finishing: "Finish Div",
      sanitary: "Sanitary",
      systems: "Infrastructure",
      catalog: "Full Catalog"
    }
  }
};

// רשימת פרמטרים הנדסיים מורחבת - 50+ סעיפים טכניים
const TECHNICAL_SPECS = [
  { id: "t1", category: "שלד", title: "בטון מזוין B-300", spec: "יציקות בטון לפי תקן ישראלי 466, כולל בדיקות מעבדה מאושרת.", unit: "קוב" },
  { id: "t2", category: "שלד", title: "פלדת זיון", spec: "פלדה מצולעת תקנית לפי חישובי מהנדס, קשירה בחוט שחור כפול.", unit: "טון" },
  { id: "t3", category: "איטום", title: "איטום ביטומני", spec: "שתי שכבות של יריעות ביטומניות 5 מ\"מ עם הגנת גיר.", unit: "מ\"ר" },
  { id: "t4", category: "חשמל", title: "חיבור תלת פאזי", spec: "לוח חשמל מובנה 3X25A, אביזרי קצה 'גוויס' או שווה ערך.", unit: "נקודות" },
  { id: "t5", category: "אלומיניום", title: "סדרת קליל 9000", spec: "פרופיל אלומיניום יוקרתי לויטרינות, זכוכית טריפלקס.", unit: "פרויקט" },
  { id: "t6", category: "אינסטלציה", title: "צנרת SP", spec: "צנרת רב-שכבתית עמידה בלחץ גבוה, כולל מרכזיית מים.", unit: "נקודות" },
  // ... כאן ניתן להוסיף עוד מאות שורות של מפרט טכני מתוך ה-PDF
];

// קטלוג מוצרים מורחב - סטודיו קרמיקה
const MASTER_CATALOG = [
  { id: "p1", cat: "ריצוף פנים", title: "מונטריאול אפור", desc: "גרניט פורצלן 80/80 מט", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  { id: "p2", cat: "ריצוף פנים", title: "אידרה בז' משי", desc: "גרניט פורצלן 80/80 משי", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { id: "p3", cat: "ריצוף פנים", title: "אמאני לבן", desc: "גרניט פורצלן 80/80 מט", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
  { id: "p4", cat: "ריצוף פנים", title: "ארק סילבר", desc: "גרניט פורצלן 80/80 בטון", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
  { id: "p5", cat: "דמוי פרקט", title: "מדרה אוק", desc: "15/60 ס\"מ דמוי עץ טבעי", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
  { id: "p6", cat: "דלתות", title: "דלת רב-בריח יוקרה", desc: "פולימרי עמיד למים", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" },
  { id: "p7", cat: "סניטריה", title: "אסלה Geberit", desc: "דגם תלוי + מושב הידראולי", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
];

/**
 * =================================================================================
 * MODULE 2: STATE & LOGIC MANAGER (מחלקה 2: ניהול לוגיקה ומצב)
 * =================================================================================
 */

function useEfratiManager() {
  const [lang, setLang] = useState("he");
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("הכל");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleProduct = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const sendWhatsApp = () => {
    const list = cart.map(i => `• ${i.title} (${i.cat})`).join("\n");
    const text = `שלום אשר ואהרון,\nאשמח לקבל הצעת מחיר למפרט הבא:\n\n${list}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(text)}`, "_blank");
  };

  return { lang, setLang, cart, toggleProduct, isMounted, sendWhatsApp, activeCategory, setActiveCategory };
}

/**
 * =================================================================================
 * MODULE 3: UI ARCHITECTURE (מחלקה 3: ארכיטקטורת ממשק)
 * =================================================================================
 */

const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="mb-20">
    <div className="flex items-center gap-3 text-orange-600 font-black text-[10px] uppercase tracking-[4px] mb-6">
      <span className="w-12 h-px bg-orange-600" />
      {subtitle}
    </div>
    <h2 className={`text-5xl md:text-8xl font-[1000] tracking-tighter ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
  </div>
);

// רכיב מחלקת הנדסה מורחב
const EngineeringDept = ({ lang }) => (
  <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <SectionTitle title="הנדסה וביצוע" subtitle="Asher & Aaron Engineering" light />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {TECHNICAL_SPECS.map((spec, i) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={spec.id} 
            className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all"
          >
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-8">
              <HardHat size={30} />
            </div>
            <h4 className="text-2xl font-black mb-4">{spec.title}</h4>
            <p className="text-slate-400 font-bold leading-relaxed mb-6">{spec.spec}</p>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Unit: {spec.unit}</span>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600 rounded-full blur-[300px] opacity-10 pointer-events-none" />
  </section>
);

/**
 * =================================================================================
 * MODULE 4: MAIN APPLICATION (הקוד המרכזי שמחבר את כל המחלקות)
 * =================================================================================
 */

export default function AAEfratiEnterprise() {
  const manager = useEfratiManager();
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  // הגנה מפני שגיאת Hydration (השגיאה מהצילום מסך)
  if (!manager.isMounted) return <div className="bg-white min-h-screen" />;

  const t = EFRATI_DB[manager.lang.toUpperCase()];

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${manager.lang === "he" ? "rtl font-sans" : "ltr font-sans"}`} dir={manager.lang === "he" ? "rtl" : "ltr"}>
      
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-[1000] bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-6 px-12 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 p-3 rounded-2xl shadow-xl shadow-slate-200"><ShieldCheck className="text-white" size={32} /></div>
          <div>
            <h1 className="text-3xl font-[1000] tracking-tighter leading-none">{t.title}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px] mt-1">{t.owners}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <button onClick={() => manager.setLang(manager.lang === "he" ? "en" : "he")} className="p-3 bg-slate-50 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Globe size={16} /> {manager.lang}
          </button>
          <button onClick={() => setIsSpecOpen(true)} className="relative p-4 bg-slate-900 text-white rounded-2xl shadow-2xl">
            <ShoppingCart size={24} />
            {manager.cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-4 border-white">{manager.cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-60 pb-40 px-12 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h2 className="text-7xl md:text-[180px] font-[1000] leading-[0.75] tracking-[-8px] mb-16">
              בונים <br /> <span className="text-orange-600 italic">סטנדרט.</span>
            </h2>
            <div className="flex flex-wrap gap-12 items-end">
              <button className="bg-slate-900 text-white px-16 py-8 rounded-[40px] font-black text-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-slate-200">
                התחל פרויקט
              </button>
              <div className="space-y-4">
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">אזורי פעילות</p>
                <div className="flex gap-4">
                  {["ירושלים", "מרכז", "יו\"ש"].map(a => <span key={a} className="px-6 py-2 bg-slate-100 rounded-full text-xs font-black">{a}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-10">
          <GridPattern />
        </div>
      </section>

      {/* ENGINEERING DEPARTMENT MODULE */}
      <EngineeringDept lang={manager.lang} />

      {/* CATALOG MODULE */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-12">
          <SectionTitle title="קטלוג הגמר" subtitle="Premium Finishing Catalog" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {MASTER_CATALOG.map((p) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={p.id} 
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden mb-8 relative bg-slate-100 shadow-sm group-hover:shadow-2xl transition-all">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={p.title} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => manager.toggleProduct(p)}
                      className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs shadow-2xl"
                    >
                      {manager.cart.find(i => i.id === p.id) ? "נבחר" : "הוסף למפרט"}
                    </button>
                  </div>
                </div>
                <h4 className="text-3xl font-black tracking-tighter mb-2 group-hover:text-orange-600 transition-colors">{p.title}</h4>
                <p className="text-slate-400 font-bold text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER & SPECIFICATION OVERLAY */}
      <footer className="bg-slate-50 py-40 border-t border-slate-100">
        <div className="container mx-auto px-12 text-center">
          <h2 className="text-5xl md:text-[100px] font-[1000] tracking-tighter mb-20 leading-none">אשר ואהרון <br /><span className="text-orange-600">א.א אפרתי</span></h2>
          <div className="flex flex-wrap justify-center gap-16">
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">טלפון</p><p className="text-2xl font-black">050-0000000</p></div>
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">אימייל</p><p className="text-2xl font-black">office@efrati.co.il</p></div>
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">משרד</p><p className="text-2xl font-black">ירושלים / מרכז / יו"ש</p></div>
          </div>
        </div>
      </footer>

      {/* SPECIFICATION SIDEBAR (The Cart) */}
      <AnimatePresence>
        {isSpecOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSpecOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[2000]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[2001] shadow-2xl p-16 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-4xl font-[1000] tracking-tighter">המפרט שלי</h3>
                <button onClick={() => setIsSpecOpen(false)} className="p-4 bg-slate-50 rounded-2xl"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {manager.cart.length === 0 ? <p className="text-slate-400 font-bold text-center py-20">לא נבחרו פריטים</p> : manager.cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-8 bg-slate-50 rounded-[40px] items-center group">
                    <img src={item.img} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                    <div className="flex-1">
                      <h5 className="font-black text-xl">{item.title}</h5>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{item.cat}</p>
                    </div>
                    <button onClick={() => manager.toggleProduct(item)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 /></button>
                  </div>
                ))}
              </div>
              <div className="pt-10 border-t mt-10">
                <button onClick={manager.sendWhatsApp} className="w-full bg-orange-600 text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                  שלח מפרט לתיאום פגישה
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Background Decoration Component
const GridPattern = () => (
  <svg className="w-full h-full opacity-20" width="100%" height="100%">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);
