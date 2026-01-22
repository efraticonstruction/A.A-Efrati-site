"use client";

import React, { useState, useEffect } from "react";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home,
  Droplets, Zap, Utensils, ShieldCheck, 
  Ruler, MessageSquare, Phone, Instagram, Facebook,
  Layers, Paintbrush, Box, HardHat, 
  Construction, Wrench, Thermometer, 
  Sun, Wind, Move, Scaling, Lightbulb, 
  HeartHandshake, Award, PencilRuler, Drill, 
  Smartphone, Waves, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AAEfratiPremiumSite() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("הכל");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CATEGORIES = ["הכל", "בנייה ושלד", "גמר ועיצוב", "תשתיות", "מערכות"];

  const SERVICES = [
    // בנייה ושלד
    { id: 1, cat: "בנייה ושלד", title: "בניית וילות מהיסוד", icon: Home, price: "9,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600" },
    { id: 2, cat: "בנייה ושלד", title: "תוספות בנייה והרחבות", icon: Layers, price: "8,200", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=600" },
    { id: 3, cat: "בנייה ושלד", title: "עבודות שלד ובטון", icon: Construction, price: "4,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=600" },
    { id: 4, cat: "בנייה ושלד", title: "חיזוק מבנים תמ\"א 38", icon: ShieldCheck, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=600" },
    { id: 5, cat: "בנייה ושלד", title: "בניית ממ\"דים תקניים", icon: HardHat, price: "120,000", unit: "קומפלט", img: "https://images.unsplash.com/photo-1590059132612-58832a57894a?q=80&w=600" },
    { id: 6, cat: "בנייה ושלד", title: "הריסה ופינוי פסולת", icon: Trash2, price: "15,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=600" },

    // גמר ועיצוב
    { id: 7, cat: "גמר ועיצוב", title: "ריצוף וחיפוי שיש", icon: LayoutGrid, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: 8, cat: "גמר ועיצוב", title: "מטבחי פרימיום", icon: Utensils, price: "45,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600" },
    { id: 9, cat: "גמר ועיצוב", title: "עבודות גבס ותקרות", icon: Lightbulb, price: "180", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=600" },
    { id: 10, cat: "גמר ועיצוב", title: "צביעה דקורטיבית", icon: Paintbrush, price: "65", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600" },
    { id: 11, cat: "גמר ועיצוב", title: "פרקט עץ וגרניט", icon: Move, price: "120", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=600" },
    { id: 12, cat: "גמר ועיצוב", title: "חיפוי חוץ מאוורר", icon: Scaling, price: "350", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=600" },
    { id: 13, cat: "גמר ועיצוב", title: "דלתות פנים מעוצבות", icon: Box, price: "1,800", unit: "יח'", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=600" },
    { id: 14, cat: "גמר ועיצוב", title: "עבודות נגרות אומן", icon: Ruler, price: "לפי תוכנית", unit: "", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600" },
    { id: 15, cat: "גמר ועיצוב", title: "חדרי רחצה מודרניים", icon: Droplets, price: "25,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" },
    { id: 16, cat: "גמר ועיצוב", title: "מסגרות וברזל", icon: Wrench, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600" },

    // תשתיות
    { id: 17, cat: "תשתיות", title: "אינסטלציה וצנרת", icon: Droplets, price: "2,500", unit: "נקודה", img: "https://images.unsplash.com/photo-1607472586893-edb5caad0555?q=80&w=600" },
    { id: 18, cat: "תשתיות", title: "חשמל ותקשורת חכמה", icon: Zap, price: "350", unit: "נקודה", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600" },
    { id: 19, cat: "תשתיות", title: "מיזוג אוויר מתקדם", icon: Wind, price: "18,000", unit: "מערכת", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600" },
    { id: 20, cat: "תשתיות", title: "חימום תת-רצפתי", icon: Thermometer, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1585129018945-36423a23880a?q=80&w=600" },
    { id: 21, cat: "תשתיות", title: "מערכות בית חכם", icon: Smartphone, price: "12,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600" },
    { id: 22, cat: "תשתיות", title: "ביוב וניקוז חוץ", icon: Waves, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1620629739504-2070381665e8?q=80&w=600" },
    { id: 23, cat: "תשתיות", title: "בדיקות חשמל", icon: ShieldCheck, price: "1,200", unit: "בדיקה", img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=600" },

    // מערכות
    { id: 24, cat: "מערכות", title: "איטום גגות ומרפסות", icon: Droplets, price: "95", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1635339001331-97b777a8684d?q=80&w=600" },
    { id: 25, cat: "מערכות", title: "דודי שמש וחשמל", icon: Sun, price: "3,800", unit: "יח'", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=600" },
    { id: 26, cat: "מערכות", title: "סינון מים", icon: Droplets, price: "1,500", unit: "יח'", img: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=600" },
    { id: 27, cat: "מערכות", title: "בריכות שחייה", icon: Waves, price: "150,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600" },
    { id: 28, cat: "מערכות", title: "פיתוח חוץ וגינון", icon: Home, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1558905611-396558110996?q=80&w=600" },
    { id: 29, cat: "מערכות", title: "תכנון וליווי הנדסי", icon: PencilRuler, price: "כלול", unit: "", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600" },
    { id: 30, cat: "מערכות", title: "בדק בית וביקורת", icon: Award, price: "2,500", unit: "בדיקה", img: "https://images.unsplash.com/photo-1460472178825-e5240623abe5?q=80&w=600" }
  ];

  const filteredServices = filter === "הכל" ? SERVICES : SERVICES.filter(s => s.cat === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans rtl selection:bg-orange-100" dir="rtl">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-xl py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-200">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">א.א אפרתי</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Premium Construction</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 font-bold text-sm">
            <a href="#" className="hover:text-orange-600 transition-colors">בית</a>
            <a href="#" className="hover:text-orange-600 transition-colors">שירותים</a>
            <a href="#" className="hover:text-orange-600 transition-colors">פרויקטים</a>
            <a href="#" className="hover:text-orange-600 transition-colors">אודות</a>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95">
            צרו קשר
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              נוסד בשנת 1994
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1]">
              אנחנו לא רק בונים בתים,<br />אנחנו בונים <span className="text-orange-600">ביטחון.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed">
              הסטנדרט הגבוה ביותר בישראל לעבודות בנייה, גמר ותשתיות. 30 שנות ניסיון, מאות פרויקטים יוקרתיים וליווי אישי לכל אורך הדרך.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-100 hover:scale-105 transition-transform">
                ייעוץ חינם בשטח
              </button>
              <button className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-colors">
                לצפייה בפרויקטים
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-black mb-4">קטלוג השירותים המלא</h2>
              <p className="text-slate-500 font-medium">בחר קטגוריה כדי לראות את המפרט המלא</p>
            </div>
            <div className="flex flex-wrap gap-3 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                    filter === cat ? "bg-orange-600 text-white shadow-md shadow-orange-100" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={service.id}
                  className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-xl">
                      <service.icon className="text-orange-600 w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full" />
                      <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest">{service.cat}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-6 leading-tight min-h-[4rem]">{service.title}</h3>
                    <div className="flex items-end justify-between border-t border-slate-50 pt-8">
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-slate-900">₪{service.price}</span>
                        <span className="text-slate-400 text-xs font-bold mt-1">{service.unit}</span>
                      </div>
                      <button className="bg-slate-50 text-slate-900 p-4 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                        <MessageSquare size={20} fill="currentColor" fillOpacity={0.2} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-orange-600 p-3 rounded-2xl">
                  <ShieldCheck size={32} />
                </div>
                <span className="text-4xl font-black tracking-tight">א.א אפרתי</span>
              </div>
              <p className="text-slate-400 text-xl leading-relaxed max-w-md">
                חברת הבנייה המובילה בישראל לשיפוצי יוקרה ועבודות גמר. אנחנו הופכים חזון למציאות כבר שלושה עשורים.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-lg font-black mb-6">ניווט מהיר</h4>
                <ul className="space-y-4 text-slate-400 font-bold">
                  <li className="hover:text-orange-600 cursor-pointer">פרויקטים</li>
                  <li className="hover:text-orange-600 cursor-pointer">קטלוג שירותים</li>
                  <li className="hover:text-orange-600 cursor-pointer">המלצות</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-black mb-6">צרו קשר</h4>
                <div className="flex gap-4">
                  {[Phone, Instagram, Facebook].map((Icon, i) => (
                    <div key={i} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer group">
                      <Icon size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 font-bold text-sm">© {new Date().getFullYear()} א.א אפרתי - כל הזכויות שמורות לבנייה ושיפוצי יוקרה</p>
            <div className="flex gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
