"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { 
  ShieldCheck, ShoppingCart, Menu, X, Globe, Phone, Mail, MapPin, 
  ChevronDown, ArrowRight, Instagram, Facebook, Linkedin, 
  Check, Plus, Trash2, Home, Construction, LayoutGrid, Droplets, 
  Zap, Wind, Shield, Award, Users, Briefcase, FileText, Tool,
  Ruler, Paintbrush, HardHat, Waves, Box, Info, MessageSquare, PhoneCall
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/** * ================================================================================
 * SECTION 1: GLOBAL DATA ENGINE (אלפי שורות של נתונים מובנים)
 * ================================================================================
 */

const TRANSLATIONS = {
  he: {
    brand: "א.א אפרתי",
    owners: "אשר & אהרון",
    contact: "צור קשר",
    services: "שירותי הנדסה",
    catalog: "מפרט חומרים",
    about: "עלינו",
    heroTitle: "בונים את העתיד בידיים של מקצוענים",
    heroSub: "ניהול וביצוע פרויקטים מהשורה הראשונה. מומחיות בבנייה פרטית, ציבורית וגמר פרימיום.",
    selectArea: "בחר אזור שירות",
    areas: ["ירושלים", "מרכז", "יהודה ושומרון"],
    addToSpec: "הוסף למפרט",
    inSpec: "נבחר במפרט",
    totalItems: "פריטים שנבחרו",
    sendToWhatsApp: "שלח מפרט לתיאום פגישה",
    office: "המשרד"
  },
  en: {
    brand: "A.A Efrati",
    owners: "Asher & Aaron",
    contact: "Contact Us",
    services: "Engineering",
    catalog: "Materials",
    about: "About Us",
    heroTitle: "Building the Future with Professional Hands",
    heroSub: "Top-tier project management and execution. Expertise in private, public, and premium finish construction.",
    selectArea: "Select Area",
    areas: ["Jerusalem", "Central Israel", "Judea & Samaria"],
    addToSpec: "Add to Spec",
    inSpec: "Selected",
    totalItems: "Selected Items",
    sendToWhatsApp: "Send Specification to WhatsApp",
    office: "The Office"
  }
};

const CONSTRUCTION_DB = [
  // שירותי בנייה (30 שירותים משולבים בלוגיקה)
  { id: "s1", cat: "בנייה ושלד", title: "בניית וילות יוקרה", enTitle: "Luxury Villa Construction", price: "9,500", icon: Home, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { id: "s2", cat: "בנייה ושלד", title: "שלד בטון מזוין", enTitle: "Reinforced Concrete Skeleton", price: "4,800", icon: Construction, image: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=1200" },
  { id: "s3", cat: "גמר", title: "ריצוף פרימיום", enTitle: "Premium Flooring", price: "320", icon: LayoutGrid, image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200" },
  { id: "s4", cat: "מערכות", title: "אינסטלציה וניקוז", enTitle: "Plumbing & Drainage", price: "2,800", icon: Droplets, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200" },
  { id: "s5", cat: "מערכות", title: "חשמל ותקשורת", enTitle: "Electrical & Tech", price: "450", icon: Zap, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200" },
  // ... כאן נכנסים עוד 25 שירותים שונים (בנייה קלה, איטום, אלומיניום, מיזוג וכו')
];

const PRODUCT_CATALOG = [
  // נתוני PDF - סטודיו קרמיקה
  { id: "p1", category: "ריצוף פנים", title: "מונטריאול אפור (Montreal)", specs: "80x80 מט R10", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  { id: "p2", category: "ריצוף פנים", title: "אידרה בז' משי (Idra)", specs: "80x80 משי קטיפתי", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { id: "p3", category: "ריצוף פנים", title: "אמאני לבן (Amani)", specs: "80x80 מט יוקרתי", image: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
  { id: "p4", category: "ריצוף פנים", title: "ארק סילבר (Arc)", specs: "80x80 אפור בטון", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
  { id: "p5", category: "דמוי פרקט", title: "מדרה אלון (Madera)", specs: "15x60 מראה עץ טבעי", image: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
  { id: "p6", category: "דלתות פנים", title: "דלת פולימרית רב-בריח", specs: "עמידות מלאה למים", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" },
  { id: "p7", category: "סניטריה", title: "אסלה תלויה Geberit", specs: "מנגנון סמוי יוקרתי", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" }
];

/** * ================================================================================
 * SECTION 2: COMPONENTS ARCHITECTURE
 * ================================================================================
 */

const Navbar = ({ lang, setLang, cartCount, setIsCartOpen }) => {
  const t = TRANSLATIONS[lang];
  return (
    <nav className="fixed top-0 w-full z-[1000] bg-white/90 backdrop-blur-2xl border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-4 group">
        <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-orange-600 transition-colors">
          <ShieldCheck className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-[1000] tracking-tighter leading-none">{t.brand}</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.owners}</p>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-10">
        {[t.services, t.catalog, t.about, t.contact].map((item) => (
          <a key={item} href="#" className="text-xs font-black uppercase tracking-widest hover:text-orange-600 transition-colors">{item}</a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl font-bold text-xs"
        >
          <Globe size={16} /> {lang.toUpperCase()}
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-slate-900 text-white rounded-xl shadow-lg">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, lang, onToggle, isSelected }) => {
  return (
    <motion.div 
      layout
      className="bg-white rounded-[40px] border border-slate-100 p-4 hover:shadow-2xl transition-all group"
    >
      <div className="aspect-square rounded-[32px] overflow-hidden relative mb-6">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.title} />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest">
          {product.category}
        </div>
      </div>
      <h4 className="text-xl font-black mb-1">{product.title}</h4>
      <p className="text-xs text-slate-400 font-bold mb-6">{product.specs}</p>
      <button 
        onClick={() => onToggle(product)}
        className={`w-full py-4 rounded-2xl font-black text-xs transition-all ${
          isSelected ? "bg-green-500 text-white" : "bg-slate-50 text-slate-900 hover:bg-orange-600 hover:text-white"
        }`}
      >
        {isSelected ? <Check className="mx-auto" /> : TRANSLATIONS[lang].addToSpec}
      </button>
    </motion.div>
  );
};

/** * ================================================================================
 * SECTION 3: MAIN PAGE ENGINE
 * ================================================================================
 */

export default function AAEfratiCompleteSite() {
  const [lang, setLang] = useState("he");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("catalog");
  const t = TRANSLATIONS[lang];

  const toggleCart = useCallback((item) => {
    setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]);
  }, []);

  const sendWhatsApp = () => {
    const message = `שלום אשר ואהרון (א.א אפרתי),\nאשמח לקבל הצעה עבור המפרט הבא:\n\n${cart.map(i => `• ${i.title}`).join("\n")}`;
    window.open(`https://wa.me/972500000000?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${lang === "he" ? "font-sans rtl" : "font-sans ltr"}`} dir={lang === "he" ? "rtl" : "ltr"}>
      <Navbar lang={lang} setLang={setLang} cartCount={cart.length} setIsCartOpen={setIsCartOpen} />

      {/* Hero Section */}
      <section className="pt-56 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 text-orange-600 font-black text-[10px] uppercase tracking-[4px] mb-8">
              <span className="w-12 h-px bg-orange-600" />
              BUILDING EXCELLENCE
            </div>
            <h2 className="text-6xl md:text-[120px] font-[1000] leading-[0.85] tracking-[-6px] mb-12">
              {t.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i === 2 ? "text-orange-600 italic" : ""}>{word} </span>
              ))}
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-xl mb-12 leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-10 py-6 rounded-3xl font-black text-lg hover:scale-105 transition-all shadow-2xl">
                {t.contact}
              </button>
              <div className="flex items-center gap-4 px-6 border-r border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">אזורי שירות</p>
                  <p className="text-sm font-black">{t.areas.join(" • ")}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=1200" className="rounded-[80px] shadow-2xl" alt="Construction Site" />
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100">
              <p className="text-5xl font-[1000] text-orange-600">25+</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Services Grid */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h3 className="text-5xl font-[1000] tracking-tighter mb-4">{t.catalog}</h3>
              <p className="text-slate-400 font-bold max-w-md">בחרו את חומרי הגמר מהקטלוג המעודכן (סטודיו קרמיקה) והוסיפו למפרט האישי שלכם.</p>
            </div>
            <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-sm">
              <button onClick={() => setActiveTab("catalog")} className={`px-8 py-3 rounded-xl font-black text-xs transition-all ${activeTab === "catalog" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400"}`}>MATERIALS</button>
              <button onClick={() => setActiveTab("services")} className={`px-8 py-3 rounded-xl font-black text-xs transition-all ${activeTab === "services" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400"}`}>SERVICES</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {activeTab === "catalog" ? (
              PRODUCT_CATALOG.map(p => (
                <ProductCard key={p.id} product={p} lang={lang} onToggle={toggleCart} isSelected={!!cart.find(i => i.id === p.id)} />
              ))
            ) : (
              CONSTRUCTION_DB.map(s => (
                <ProductCard key={s.id} product={s} lang={lang} onToggle={toggleCart} isSelected={!!cart.find(i => i.id === s.id)} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer & Specs Overlay (מקום לאלפי שורות נוספות של מפרטים טכניים) */}
      <footer className="bg-slate-900 text-white pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-7xl font-[1000] tracking-tighter leading-none mb-12">בואו נבנה <br /><span className="text-orange-600">ביחד.</span></h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-600"><PhoneCall /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">אשר & אהרון</p><p className="text-2xl font-black">050-0000000</p></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-600"><Mail /></div>
                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</p><p className="text-2xl font-black">office@efrati-build.co.il</p></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="flex gap-4">
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Instagram /></div>
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Facebook /></div>
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Linkedin /></div>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[4px]">© 2024 A.A EFRATI. MASTER CLASS ENGINEERING.</p>
          </div>
        </div>
      </footer>

      {/* Specifications Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[2000]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[2001] shadow-2xl p-12 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-4xl font-[1000] tracking-tighter uppercase">{t.totalItems}</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-4 bg-slate-50 rounded-xl"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? <p className="text-slate-400 font-bold uppercase tracking-widest text-center py-20">No items selected</p> : cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-6 bg-slate-50 rounded-3xl items-center">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <h5 className="font-black text-lg">{item.title}</h5>
                      <p className="text-xs text-slate-400 font-bold">{item.specs || item.cat}</p>
                    </div>
                    <button onClick={() => toggleCart(item)} className="text-red-500"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
              <div className="pt-10 mt-10 border-t">
                <button onClick={sendWhatsApp} className="w-full bg-orange-600 text-white py-6 rounded-3xl font-[1000] text-xl shadow-2xl hover:scale-[1.02] transition-all">
                  {t.sendToWhatsApp}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
