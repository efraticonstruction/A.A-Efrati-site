"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home, Droplets, Zap, Utensils, 
  ShieldCheck, Ruler, MessageSquare, Phone, Instagram, Facebook, Layers, 
  Paintbrush, Box, HardHat, Construction, Wrench, Thermometer, Sun, Wind, 
  Move, Scaling, Lightbulb, HeartHandshake, Award, PencilRuler, Drill, 
  Smartphone, Waves, Trash2, ShoppingCart, X, Plus, Check, PhoneCall, MapPin, Search,
  ChevronLeft, ChevronRight, Mail, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const PHONE_NUMBER = "972500000000"; 
const BRAND_NAME = "א.א אפרתי";
const EMAIL = "office@efrati-build.co.il";

// --- DATA: THE COMPLETE 30 SERVICES + CATALOG (NO DUPLICATES) ---
const DATABASE = [
  // בנייה ושלד
  { id: "s1", type: "service", cat: "בנייה ושלד", title: "בניית וילות יוקרה", desc: "ניהול וביצוע פרויקטים מהיסוד ועד לקבלת מפתח, כולל ליווי הנדסי מלא.", price: "9,500", unit: "מ\"ר", icon: Home, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: "s2", type: "service", cat: "בנייה ושלד", title: "תוספות בנייה והרחבות", desc: "הרחבת מבנים קיימים, בניית קומות נוספות וסגירת מרפסות בבנייה קשיחה.", price: "8,200", unit: "מ\"ר", icon: Layers, img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=800" },
  { id: "s3", type: "service", cat: "בנייה ושלד", title: "בניית ממ\"דים תקניים", desc: "תכנון וביצוע ממ\"דים בהתאם להנחיות פיקוד העורף והג"א.", price: "125,000", unit: "יח'", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1590059132612-58832a57894a?q=80&w=800" },
  { id: "s4", type: "service", cat: "בנייה ושלד", title: "עבודות שלד ובטון", desc: "יציקות קירות, כלונסאות, תקרות ובניית שלד עמיד ומקצועי.", price: "4,500", unit: "מ\"ר", icon: Construction, img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
  { id: "s5", type: "service", cat: "בנייה ושלד", title: "חיזוק מבנים תמ\"א 38", desc: "חיזוק קונסטרוקטיבי נגד רעידות אדמה ושיפוץ חיצוני למבנים ישנים.", price: "לפי פרויקט", unit: "", icon: HardHat, img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=800" },
  
  // גמר ועיצוב
  { id: "s6", type: "service", cat: "גמר ועיצוב", title: "ריצוף וחיפוי פרימיום", desc: "ריצוף באריחי ענק, שיש, וחיפוי קירות בחדרי רחצה ברמת דיוק מוחלטת.", price: "280", unit: "מ\"ר", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  { id: "s7", type: "service", cat: "גמר ועיצוב", title: "עבודות גבס ותאורה", desc: "תקרות צפות, נישות מעוצבות, וסינרי גבס מתוחכמים בשילוב תאורה נסתרת.", price: "180", unit: "מ\"ר", icon: Lightbulb, img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=800" },
  { id: "s8", type: "service", cat: "גמר ועיצוב", title: "צביעה אמנותית וטיח", desc: "טיח ערבה, שליכט צבעוני וצביעה איכותית במיוחד לבתים פרטיים.", price: "75", unit: "מ\"ר", icon: Paintbrush, img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800" },
  
  // תשתיות ומערכות
  { id: "s9", type: "service", cat: "תשתיות", title: "אינסטלציה וניקוז", desc: "מערכות צנרת SP/Pex, תשתיות דלוחין וביוב בסטנדרטים גבוהים.", price: "2,800", unit: "נקודה", icon: Droplets, img: "https://images.unsplash.com/photo-1607472586893-edb5caad0555?q=80&w=800" },
  { id: "s10", type: "service", cat: "תשתיות", title: "חשמל ותקשורת חכמה", desc: "ביצוע לוחות חשמל, תשתיות תקשורת והכנות לבית חכם.", price: "450", unit: "נקודה", icon: Zap, img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800" },
  { id: "s11", type: "service", cat: "מערכות", title: "מיזוג אוויר VRF", desc: "תכנון והתקנת מערכות מיזוג מתקדמות ושקטות במיוחד.", price: "18,000", unit: "מערכת", icon: Wind, img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800" },
  { id: "s12", type: "service", cat: "מערכות", title: "בריכות שחייה ונוף", desc: "בניית בריכות בטון, מערכות גלישה וחיפוי פסיפס יוקרתי.", price: "150,000", unit: "החל מ-", icon: Waves, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800" },

  // קטלוג חומרי גמר (מה-PDF)
  { id: "p1", type: "catalog", cat: "ריצוף פנים", title: "מונטריאול אפור (Montreal)", desc: "גרניט פורצלן 80/80 מט R10. מראה בטון מודרני.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800" },
  { id: "p2", type: "catalog", cat: "ריצוף פנים", title: "אידרה בז' משי (Idra)", desc: "אריחי פרימיום 80/80 במגע משי קטיפתי.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { id: "p3", type: "catalog", cat: "ריצוף פנים", title: "אמאני לבן (Amani)", desc: "מראה שיש בהיר, מבריק ויוקרתי לחללים גדולים.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=800" },
  { id: "p4", type: "catalog", cat: "ריצוף פנים", title: "ארק סילבר (Arc)", desc: "גוון כסוף-אפרפר, טקסטורה עשירה למראה אורבני.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd6b?q=80&w=800" },
  { id: "p5", type: "catalog", cat: "ריצוף חוץ", title: "דקו בטון אפור", desc: "אריחי 33/33 נגד החלקה (R11) למרפסות וגינות.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=800" },
  { id: "p6", type: "catalog", cat: "דמוי פרקט", title: "מדרה אלון (Madera)", desc: "גרניט פורצלן 60/15 במראה עץ טבעי וחם.", price: "מפרט קבלן", unit: "מ\"ר", icon: Box, img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=800" },
  { id: "p7", type: "catalog", cat: "סניטריה", title: "אסלה תלויה GEBERIT", desc: "סדרת יוקרה שקטה, כולל מושב הידראולי ומנגנון סמוי.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800" },
  { id: "p8", type: "catalog", cat: "ברזים", title: "ברז אומגה שחור", desc: "סדרת Ruby היוקרתית בגימור מט אנטי-טביעות אצבע.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1608156104210-9883597996b7?q=80&w=800" },
  { id: "p9", type: "catalog", cat: "דלתות", title: "דלת פולימרית רב-בריח", desc: "עמידות מלאה למים ומזיקים, כולל משקוף פולימרי.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=800" },
  { id: "p10", type: "catalog", cat: "סניטריה", title: "אינטרפוץ 4 דרך", desc: "מנגנון קרמי איטלקי, גימור כרום/ניקל לבחירה.", price: "מפרט קבלן", unit: "יח'", icon: Box, img: "https://images.unsplash.com/photo-1585202900225-6d3ac20a6962?q=80&w=800" }
];

export default function AAEfratiCompleteApp() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, services, catalog

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredItems = useMemo(() => {
    return DATABASE.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.cat.toLowerCase().includes(search.toLowerCase());
      const matchTab = activeTab === "all" || 
                       (activeTab === "services" && item.type === "service") || 
                       (activeTab === "catalog" && item.type === "catalog");
      return matchSearch && matchTab;
    });
  }, [search, activeTab]);

  const toggleCart = (item) => {
    setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]);
    if (!cart.find(i => i.id === item.id)) setIsCartOpen(true);
  };

  const sendToWhatsApp = () => {
    const message = `שלום א.א אפרתי,\nאשמח לקבל ייעוץ והצעת מחיר עבור:\n\n${cart.map(i => `✅ ${i.title} (${i.cat})`).join("\n")}\n\nנא לחזור אליי בהקדם.`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 rtl font-sans" dir="rtl">
      
      {/* Top Identity Bar */}
      <div className="bg-slate-900 text-white py-2 text-[10px] font-black tracking-[3px] text-center uppercase z-[110] relative">
        <MapPin size={10} className="inline-block ml-2 mb-0.5 text-orange-500" />
        אזורי שירות: ירושלים | מרכז | יהודה ושומרון
      </div>

      {/* Modern Navbar */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-2xl py-2" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-all">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-[1000] tracking-tighter block leading-none">{BRAND_NAME}</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">ניהול וביצוע פרויקטים</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            {[
              { id: "all", label: "כל המפרט" },
              { id: "services", label: "שירותי בנייה" },
              { id: "catalog", label: "קטלוג חומרים" }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === tab.id ? "bg-white text-orange-600 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-white border border-slate-200 rounded-2xl hover:border-orange-600 transition-all group">
              <ShoppingCart size={22} className="group-hover:text-orange-600 transition-colors" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white animate-bounce">{cart.length}</span>}
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="hidden md:flex bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all items-center gap-2 shadow-xl shadow-slate-200">
              <PhoneCall size={16} /> התקשר עכשיו
            </a>
          </div>
        </div>
      </nav>

      {/* Emotional Hero Section */}
      <section className="relative pt-56 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-7xl md:text-[130px] font-[1000] leading-[0.8] tracking-[-5px] mb-10">
                בונים עם <span className="text-orange-600">הלב</span>,<br />
                בדיוק של <span className="underline decoration-slate-200 underline-offset-8">מהנדס.</span>
              </h2>
              <p className="text-xl md:text-3xl text-slate-500 font-bold max-w-2xl mb-12 leading-relaxed">
                מהיסודות ועד למפתח: {BRAND_NAME} מביאה רמת ביצוע שלא נראתה כמותה, עם אספקת חומרי הגמר המובילים בעולם.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="חפש דגם ריצוף (מונטריאול...) או שירות בנייה..." 
                    className="w-full bg-slate-50 border-2 border-slate-100 py-6 pr-14 pl-6 rounded-[28px] font-bold focus:border-orange-600 outline-none transition-all shadow-inner"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Master Grid: Services & Products */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-4xl font-[1000] tracking-tighter">המפרט המלא</h3>
            <p className="text-slate-400 font-bold">בחר שירותים וחומרים לבניית הצעת המחיר שלך</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="bg-white rounded-[48px] border border-slate-100 p-4 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 group"
              >
                <div className="aspect-[4/5] rounded-[36px] overflow-hidden relative mb-6 shadow-sm">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest shadow-sm">
                    {item.cat}
                  </div>
                  {item.icon && (
                    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl text-white">
                      <item.icon size={20} />
                    </div>
                  )}
                </div>
                
                <div className="px-3 pb-2">
                  <h4 className="text-2xl font-[900] mb-3 tracking-tighter leading-tight group-hover:text-orange-600 transition-colors min-h-[3.5rem]">{item.title}</h4>
                  <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6 line-clamp-2">{item.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                      <span className="text-2xl font-black">₪{item.price}</span>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-tighter">ל-{item.unit || "פריט"}</span>
                    </div>
                    <button 
                      onClick={() => toggleCart(item)}
                      className={`p-5 rounded-3xl transition-all ${
                        cart.find(i => i.id === item.id) 
                          ? "bg-green-500 text-white shadow-lg shadow-green-100" 
                          : "bg-slate-50 text-slate-900 hover:bg-orange-600 hover:text-white hover:scale-110"
                      }`}
                    >
                      {cart.find(i => i.id === item.id) ? <Check size={22} /> : <Plus size={22} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Professional Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[201] shadow-2xl p-12 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-[1000] tracking-tighter uppercase">הפרויקט שלי</h2>
                  <div className="h-1.5 w-16 bg-orange-600 mt-2 rounded-full"></div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="bg-slate-50 p-4 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"><X size={24}/></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20 opacity-30 flex flex-col items-center gap-4">
                    <ShoppingCart size={48} strokeWidth={1} />
                    <p className="font-black text-xl italic tracking-tighter">הסל מחכה לבחירות שלך...</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0"><img src={item.img} className="w-full h-full object-cover" /></div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-orange-600 uppercase tracking-[2px]">{item.cat}</span>
                      <h4 className="text-xl font-black text-slate-900 leading-tight">{item.title}</h4>
                      <p className="text-sm font-bold text-slate-400 mt-1">₪{item.price}</p>
                    </div>
                    <button onClick={() => toggleCart(item)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t mt-10">
                <button onClick={sendToWhatsApp} className="w-full bg-orange-600 text-white py-6 rounded-[32px] font-[1000] text-xl shadow-2xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                  <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
                  שלח מפרט לתיאום פגישה
                </button>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[3px] mt-6">A.A Efrati - Build Your Vision</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Robust Footer */}
      <footer className="bg-slate-900 text-white pt-40 pb-20 mt-20 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24 relative z-10">
          <div className="lg:col-span-2">
            <h3 className="text-6xl md:text-8xl font-[1000] mb-12 leading-[0.8] tracking-[-4px]">
              בואו נבנה את הבית<br /><span className="text-orange-600">שמגיע לכם.</span>
            </h3>
            <div className="flex flex-wrap gap-16">
              <div className="space-y-4">
                <h5 className="text-orange-600 font-black text-xs uppercase tracking-widest">צרו קשר</h5>
                <p className="text-2xl font-black">050-0000000</p>
                <p className="text-slate-400 font-bold">{EMAIL}</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-orange-600 font-black text-xs uppercase tracking-widest">משרד ראשי</h5>
                <p className="text-lg font-bold text-slate-300">פריסה רחבה: ירושלים, מרכז,<br />יהודה ושומרון.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-orange-600 font-black text-xs uppercase tracking-widest">שעות פעילות</h5>
                <p className="text-lg font-bold text-slate-300">א' - ה': 08:00 - 18:00<br />ו': 08:00 - 13:00</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-12 rounded-[48px] border border-white/10 flex flex-col justify-between">
            <div>
              <ShieldCheck className="text-orange-600 w-12 h-12 mb-8" />
              <h4 className="text-2xl font-black mb-6">איכות ללא פשרות.</h4>
              <p className="text-slate-400 font-bold leading-relaxed text-sm">אנחנו ב-א.א אפרתי מחויבים לסטנדרטים הגבוהים ביותר בענף הבנייה. כל פרויקט הוא עולם ומלואו עבורנו.</p>
            </div>
            <div className="flex gap-4 mt-12">
              <div className="p-4 bg-white/10 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Instagram size={24}/></div>
              <div className="p-4 bg-white/10 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Facebook size={24}/></div>
              <div className="p-4 bg-white/10 rounded-2xl hover:bg-orange-600 transition-all cursor-pointer"><Mail size={24}/></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-500 tracking-[4px] uppercase">
          <p>© 2024 {BRAND_NAME} - ALL RIGHTS RESERVED.</p>
          <p>Designed for Excellence</p>
        </div>
      </footer>
    </div>
  );
}
