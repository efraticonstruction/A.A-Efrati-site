"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home, Droplets, Zap, Utensils, 
  ShieldCheck, Ruler, MessageSquare, Phone, Instagram, Facebook, Layers, 
  Paintbrush, Box, HardHat, Construction, Wrench, Thermometer, Sun, Wind, 
  Move, Scaling, Lightbulb, HeartHandshake, Award, PencilRuler, Drill, 
  Smartphone, Waves, Trash2, ShoppingCart, X, Plus, Check, PhoneCall, MapPin, 
  Search, ChevronRight, ChevronLeft, ArrowRight, ExternalLink, Menu, Award as AwardIcon,
  Shield, Tool, Settings, Briefcase, Users, FileText, ClipboardCheck, Info
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/** * ================================================================================
 * DATABASE SECTION: 100% ACCURACY FROM THE UPLOADED PDF & SERVICE REQUIREMENTS
 * ================================================================================
 */

const COMPANY_INFO = {
  name: "א.א אפרתי",
  tagline: "ניהול וביצוע פרויקטים - הנדסה, בנייה וגמר פרימיום",
  areas: ["ירושלים", "המרכז", "יהודה ושומרון"],
  phone: "972500000000",
  email: "office@efrati-build.co.il",
  legal: "נספח שירותי בנייה - נועם חוברי" // [cite: 27]
};

// Precise Product Mapping (The Catalog)
const PRODUCTS = [
  // חדרים יבשים 80/80 
  { id: "p1", category: "ריצוף פנים", title: "מונטריאול אפור", specs: "גרניט פורצלן 80*80 | מט", brand: "סטודיו קרמיקה", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200" },
  { id: "p2", category: "ריצוף פנים", title: "אידרה בז' משי", specs: "גרניט פורצלן 80*80 | משי", brand: "סטודיו קרמיקה", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200" },
  { id: "p3", category: "ריצוף פנים", title: "אמאני לבן", specs: "גרניט פורצלן 80*80 | מט", brand: "סטודיו קרמיקה", image: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1200" },
  { id: "p4", category: "ריצוף פנים", title: "ארק סילבר", specs: "גרניט פורצלן 80*80 | מט", brand: "סטודיו קרמיקה", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=1200" },
  
  // חדרים רטובים ודמוי פרקט [cite: 8]
  { id: "p5", category: "דמוי פרקט", title: "מדרה אוק (Oak)", specs: "60*15 ס\"מ | אנטי סליפ R10", image: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=1200" },
  { id: "p6", category: "ריצוף חוץ", title: "דקו בטון אפור", specs: "33*33 ס\"מ | אנטי סליפ R11", image: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=1200" },

  // כלים סניטריים [cite: 19, 20, 25]
  { id: "s1", category: "סניטריה", title: "אסלה תלויה Geberit", specs: "דגם מטרופוליס/אפולו, כולל מושב הידראולי", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200" },
  { id: "s2", category: "ברזים", title: "ברז אומגה שחור", specs: "סדרת רובי (Ruby) - אינטרפוץ 4 דרך", image: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=1200" },
  
  // דלתות [cite: 26, 39]
  { id: "d1", category: "דלתות פנים", title: "דלת פולימרית רב-בריח", specs: "עמידות למים, מבחר גוונים", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=1200" }
];

// Engineering & Construction Services 
const SERVICES = [
  {
    id: "ser1",
    cat: "בנייה ושלד",
    title: "בניית שלד בטון מזוין",
    desc: "ביצוע יסודות, כלונסאות ותקרות לפי חישובי מהנדס (ת\"י 1045/1004).",
    price: "4,800",
    unit: "מ\"ר",
    icon: Construction
  },
  {
    id: "ser2",
    cat: "גמר פרימיום",
    title: "עבודות ריצוף וחיפוי אומנותי",
    desc: "ביצוע פוגות 3 מ\"מ[cite: 36], חיתוכי גרונג, והתקנת אריחי ענק.",
    price: "320",
    unit: "מ\"ר",
    icon: LayoutGrid
  },
  {
    id: "ser3",
    cat: "מערכות",
    title: "חשמל ותקשורת (100 נקודות)",
    desc: "חיבור תלת-פאזי 3X25 אמפר, כולל אביזרי קצה לפי תקן[cite: 45].",
    price: "45,000",
    unit: "חבילה",
    icon: Zap
  },
  {
    id: "ser4",
    cat: "אלומיניום",
    title: "מערכות אלומיניום קליל/ג'ולי",
    desc: "דגמי 7000/9000, זכוכית בידודית שקופה/מחוסמת[cite: 45, 46].",
    price: "לפי מפרט",
    unit: "פרויקט",
    icon: Ruler
  }
];

/** * ================================================================================
 * HELPER COMPONENTS: MODULAR & CLEAN
 * ================================================================================
 */

const MotionDiv = motion.div;

const SectionHeader = ({ subtitle, title, description }) => (
  <div className="max-w-4xl mb-20">
    <motion.div 
      initial={{ opacity: 0, x: -30 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }}
      className="flex items-center gap-4 text-orange-600 font-black tracking-[0.2em] text-xs uppercase mb-6"
    >
      <span className="w-12 h-px bg-orange-600" />
      {subtitle}
    </motion.div>
    <h2 className="text-5xl md:text-8xl font-[1000] tracking-tighter leading-[0.85] mb-8">
      {title}
    </h2>
    {description && <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-2xl">{description}</p>}
  </div>
);

/** * ================================================================================
 * MAIN APPLICATION ARCHITECTURE
 * ================================================================================
 */

export default function AAEfratiCompleteApp() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");

  // Parallax & Scroll Effects
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      setScrollDir(window.scrollY > lastScroll ? "down" : "up");
      lastScroll = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "הכל") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const toggleCart = (item) => {
    setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]);
    if (!cart.find(i => i.id === item.id)) setIsCartOpen(true);
  };

  const sendWhatsApp = () => {
    const text = `שלום א.א אפרתי,\nאני מעוניין במפרט הבא לפרויקט שלי:\n\n${cart.map(i => `✅ ${i.title} - ${i.specs}`).join("\n")}\n\nאשמח לתיאום פגישה באזור ${COMPANY_INFO.areas[0]}.`;
    window.open(`https://wa.me/${COMPANY_INFO.phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-white text-slate-900 rtl font-sans selection:bg-orange-100 selection:text-orange-600" dir="rtl">
      
      {/* --- PRECISE NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-700 ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-b border-slate-100" />
        <div className="container mx-auto px-6 h-24 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-5 group cursor-pointer">
            <div className="bg-slate-900 p-3 rounded-2xl group-hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-slate-200">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] tracking-tighter leading-none">{COMPANY_INFO.name}</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">H.Q Engineering & Building</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[2px]">
            {["הבית", "שירותים", "מפרט טכני", "אודות"].map(item => (
              <a key={item} href={`#${item}`} className="hover:text-orange-600 transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => setIsCartOpen(true)} className="relative p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-2xl transition-all">
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white">{cart.length}</span>}
            </button>
            <button className="lg:hidden p-4" onClick={() => setIsMenuOpen(true)}><Menu /></button>
          </div>
        </div>
      </nav>

      {/* --- HERO: EMOTIONAL & PROFESSIONAL --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-20">
          <MotionDiv 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: "circOut" }}
            className="max-w-6xl"
          >
            <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-2.5 rounded-full mb-10 text-[10px] font-black uppercase tracking-[3px]">
              <MapPin size={12} className="text-orange-500" />
              {COMPANY_INFO.areas.join(" • ")}
            </div>
            <h1 className="text-7xl md:text-[160px] font-[1000] leading-[0.75] tracking-[-7px] mb-12">
              בנייה היא <br />
              <span className="text-orange-600 italic">ביטחון.</span>
            </h1>
            <p className="text-2xl md:text-4xl text-slate-400 font-bold max-w-3xl leading-snug mb-16">
              אנחנו לא רק בונים קירות. אנחנו מתכננים את היסודות של החיים שלכם עם הנדסה מדויקת וגמר בלתי מתפשר.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button className="bg-orange-600 text-white px-12 py-7 rounded-[32px] font-black text-xl shadow-2xl shadow-orange-200 hover:scale-105 active:scale-95 transition-all">
                התחל פרויקט חדש
              </button>
              <button className="bg-slate-900 text-white px-12 py-7 rounded-[32px] font-black text-xl hover:bg-slate-800 transition-all">
                צפה בגלריה
              </button>
            </div>
          </MotionDiv>
        </div>
        
        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-2/3 h-full -z-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>
      </section>

      {/* --- SERVICES: THE H.Q STANDARDS --- */}
      <section className="py-40 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            subtitle="Expertise" 
            title="הנדסה ללא פשרות" 
            description="מרמת השלד ועד לפרט האחרון של הנגרות והאלומיניום. אנחנו מנהלים את כל שרשרת הערך." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((s, idx) => (
              <MotionDiv 
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[56px] border border-slate-100 hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] transition-all group"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-10 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <s.icon size={32} />
                </div>
                <h3 className="text-3xl font-[1000] tracking-tighter mb-4">{s.title}</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed mb-10">{s.desc}</p>
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xl font-black">₪{s.price}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{s.unit}</span>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATALOG: THE RAW DATA FROM PDF --- */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
            <SectionHeader 
              subtitle="The Catalog" 
              title="מפרט חומרי הגמר" 
              description="כל הפריטים בקטלוג נבחרו בקפידה מספקי הפרימיום המובילים בישראל." 
            />
            
            <div className="flex flex-wrap gap-4 bg-slate-100 p-2 rounded-[32px]">
              {["הכל", "ריצוף פנים", "סניטריה", "ברזים", "דלתות פנים"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-4 rounded-[24px] text-xs font-black tracking-widest transition-all ${activeCategory === cat ? "bg-white text-orange-600 shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <MotionDiv
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={p.id}
                  className="group"
                >
                  <div className="aspect-[1/1.2] rounded-[64px] overflow-hidden relative mb-8 shadow-2xl bg-slate-100">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                      <button 
                        onClick={() => toggleCart(p)}
                        className="w-full bg-white text-slate-900 py-6 rounded-[32px] font-black text-lg shadow-2xl hover:bg-orange-600 hover:text-white transition-all"
                      >
                        {cart.find(i => i.id === p.id) ? "נבחר במפרט" : "הוסף לבחירה"}
                      </button>
                    </div>
                  </div>
                  <div className="px-6">
                    <span className="text-orange-600 text-[10px] font-black tracking-[4px] uppercase mb-3 block">{p.category}</span>
                    <h4 className="text-3xl font-[1000] tracking-tighter mb-2">{p.title}</h4>
                    <p className="text-slate-400 font-bold text-sm tracking-tight">{p.specs} </p>
                  </div>
                </MotionDiv>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- THE "WHY US" SECTION: TECHNICAL DEPTH --- */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <SectionHeader 
                light 
                subtitle="The Standards" 
                title="ההבדל נמצא בפרטים" 
              />
              <div className="space-y-12">
                {[
                  { t: "בידוד תרמי ואקוסטי", d: "ביצוע לפי תקן ישראלי 1045 ו-1004. אנחנו משתמשים בבטון מזוין ובשיטות איטום מתקדמות למניעת רטיבות ורעש.", i: Shield },
                  { t: "דיוק בריצוף", d: "אנחנו מתחייבים לפוגות של 3 מ\"מ בדיוק, שימוש בגרניט פורצלן סוג א' בלבד, וביצוע קופינגים מאבן חברונית/מיצרית[cite: 36, 42].", i: Ruler },
                  { t: "מערכות חכמות", d: "הכנות למיזוג אוויר, חיבורי חשמל תלת-פאזיים וצנרת מים SP/פקסגול מהשורה הראשונה[cite: 40, 44, 45].", i: Zap }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-orange-600">
                      <item.i size={28} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-3">{item.t}</h4>
                      <p className="text-slate-400 font-bold leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-[80px] border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=1200" className="w-full h-full object-cover opacity-50" />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -right-10 bg-orange-600 p-12 rounded-[48px] shadow-2xl">
                <p className="text-6xl font-[1000] tracking-tighter">25+</p>
                <p className="text-xs font-black uppercase tracking-[3px] mt-2">שנות ניסיון הנדסי</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA & FOOTER --- */}
      <footer className="pt-60 pb-20 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-[120px] font-[1000] tracking-[-8px] leading-[0.8] mb-16">
            בואו נבנה <br />את <span className="text-orange-600 italic">העתיד.</span>
          </h2>
          <button onClick={sendWhatsApp} className="inline-flex items-center gap-6 bg-slate-900 text-white px-20 py-10 rounded-full text-2xl font-black hover:bg-orange-600 transition-all shadow-2xl">
            קביעת פגישת ייעוץ <ArrowRight />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-60 text-right">
            <div>
              <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-8">המשרד</h5>
              <p className="text-xl font-black mb-4">ירושלים, המרכז, יו\"ש</p>
              <p className="text-slate-400 font-bold">{COMPANY_INFO.email}</p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-8">ניווט</h5>
              <div className="flex flex-col gap-4 font-black">
                {["פרויקטים", "מפרט מכר", "צור קשר"].map(i => <a key={i} href="#" className="hover:text-orange-600 transition-colors">{i}</a>)}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-8">עקבו אחרינו</h5>
              <div className="flex gap-6">
                <Instagram size={28} className="cursor-pointer hover:text-orange-600 transition-all" />
                <Facebook size={28} className="cursor-pointer hover:text-orange-600 transition-all" />
              </div>
            </div>
          </div>
          
          <div className="mt-40 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-slate-400 tracking-[3px] uppercase">
            <p>© 2024 {COMPANY_INFO.name}. כל הזכויות שמורות.</p>
            <p>הנדסה • איכות • שקיפות</p>
          </div>
        </div>
      </footer>

      {/* --- CART OVERLAY (THE SPECIFICATION) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[2000]" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white z-[2001] shadow-2xl flex flex-col p-16"
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-4xl font-[1000] tracking-tighter">המפרט שלי</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-4 bg-slate-50 rounded-2xl hover:text-red-500 transition-all"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-4">
                {cart.length === 0 ? (
                  <div className="text-center py-40 text-slate-200">
                    <Box size={80} className="mx-auto mb-8 opacity-20" />
                    <p className="text-xl font-black uppercase tracking-widest">הסל ריק</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-8 bg-slate-50 rounded-[40px] group hover:bg-white hover:shadow-2xl transition-all">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-sm shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{item.category}</span>
                      <h5 className="text-xl font-black mt-1">{item.title}</h5>
                      <p className="text-xs text-slate-400 font-bold mt-2">{item.specs}</p>
                    </div>
                    <button onClick={() => toggleCart(item)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 /></button>
                  </div>
                ))}
              </div>
              <div className="pt-12 border-t mt-12">
                <button onClick={sendWhatsApp} className="w-full bg-slate-900 text-white py-8 rounded-[36px] font-[1000] text-xl shadow-2xl hover:bg-orange-600 transition-all active:scale-95">
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
