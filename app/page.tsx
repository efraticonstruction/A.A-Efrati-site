"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home,
  Droplets, Zap, Utensils, ShieldCheck, 
  Ruler, MessageSquare, Phone, Instagram, Facebook,
  Layers, Paintbrush, Box, shadow,
  HardHat, Drill, PencilRuler, Construction,
  Wrench, Thermometer, Sun, Wind, Move,
  Scaling, Brush, Lightbulb, HeartHandshake, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AA_Efrati_Site() {
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
    { id: 1, cat: "בנייה ושלד", title: "בניית וילות מהיסוד", icon: Home, price: "9,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=500" },
    { id: 2, cat: "בנייה ושלד", title: "תוספות בנייה", icon: Layers, price: "8,200", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=500" },
    { id: 3, cat: "בנייה ושלד", title: "עבודות שלד ובטון", icon: Hammer, price: "4,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=500" },
    { id: 4, cat: "בנייה ושלד", title: "חיזוק מבנים (תמ\"א)", icon: ShieldCheck, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=500" },
    { id: 5, cat: "בנייה ושלד", title: "בניית ממ\"דים", icon: ShieldCheck, price: "120,000", unit: "קומפלט", img: "https://images.unsplash.com/photo-1590059132612-58832a57894a?q=80&w=500" },
    { id: 6, cat: "בנייה ושלד", title: "הריסה ופינוי", icon: Hammer, price: "15,000", unit: "פרויקט", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=500" },

    // גמר ועיצוב
    { id: 7, cat: "גמר ועיצוב", title: "ריצוף יוקרתי (שיש/גרניט)", icon: LayoutGrid, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=500" },
    { id: 8, cat: "גמר ועיצוב", title: "מטבחי מעצבים", icon: Utensils, price: "45,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=500" },
    { id: 9, cat: "גמר ועיצוב", title: "עבודות גבס ותאורה", icon: Lightbulb, price: "180", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=500" },
    { id: 10, cat: "גמר ועיצוב", title: "צביעה דקורטיבית", icon: Paintbrush, price: "65", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500" },
    { id: 11, cat: "גמר ועיצוב", title: "התקנת פרקטים", icon: Move, price: "120", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=500" },
    { id: 12, cat: "גמר ועיצוב", title: "חיפוי קירות חיצוני", icon: Scaling, price: "350", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=500" },
    { id: 13, cat: "גמר ועיצוב", title: "עבודות נגרות מותאמות", icon: Ruler, price: "לפי תוכנית", unit: "", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500" },
    { id: 14, cat: "גמר ועיצוב", title: "התקנת דלתות פנים", icon: Box, price: "1,800", unit: "יח'", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=500" },

    // תשתיות
    { id: 15, cat: "תשתיות", title: "אינסטלציה קומפלט", icon: Droplets, price: "2,500", unit: "נקודה", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500" },
    { id: 16, cat: "תשתיות", title: "חשמל ותקשורת", icon: Zap, price: "350", unit: "נקודה", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500" },
    { id: 17, cat: "תשתיות", title: "מיזוג אוויר מרכזי", icon: Wind, price: "18,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=500" },
    { id: 18, cat: "תשתיות", title: "חימום תת-רצפתי", icon: Thermometer, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1585129018945-36423a23880a?q=80&w=500" },
    { id: 19, cat: "תשתיות", title: "בית חכם", icon: Zap, price: "12,000", unit: "מערכת", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500" },
    { id: 20, cat: "תשתיות", title: "ביוב וניקוז", icon: Droplets, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1620629739504-2070381665e8?q=80&w=500" },

    // מערכות ומשלימים
    { id: 21, cat: "מערכות", title: "איטום גגות ומרפסות", icon: Droplets, price: "95", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1635339001331-97b777a8684d?q=80&w=500" },
    { id: 22, cat: "מערכות", title: "התקנת דודי שמש", icon: Sun, price: "3,800", unit: "יח'", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=500" },
    { id: 23, cat: "מערכות", title: "מערכות סינון מים", icon: Droplets, price: "1,500", unit: "יח'", img: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=500" },
    { id: 24, cat: "מערכות", title: "התקנת ספרינקלרים", icon: Droplets, price: "לפי תוכנית", unit: "", img: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?q=80&w=500" },

    // נוספים
    { id: 25, cat: "גמר ועיצוב", title: "בריכות שחייה", icon: Droplets, price: "150,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=500" },
    { id: 26, cat: "גמר ועיצוב", title: "גינון ופיתוח חוץ", icon: Home, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1558905611-396558110996?q=80&w=500" },
    { id: 27, cat: "בנייה ושלד", title: "תכנון וליווי הנדסי", icon: PencilRuler, price: "מובנה", unit: "במחיר", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=500" },
    { id: 28, cat: "גמר ועיצוב", title: "התקנת מעליות", icon: Move, price: "180,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=500" },
    { id: 29, cat: "גמר ועיצוב", title: "עבודות מסגרות", icon: Hammer, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=500" },
    { id: 30, cat: "מערכות", title: "ביקורת מבנים (בדק בית)", icon: Award, price: "2,500", unit: "בדיקה", img: "https://images.unsplash.com/photo-1460472178825-e5240623abe5?q=80&w=500" },
  ];

  const filteredServices = filter === "הכל" ? SERVICES : SERVICES.filter(s => s.cat === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans rtl selection:bg-orange-200" dir="rtl">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-2xl py-2" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-orange-200 shadow-xl group-hover:rotate-12 transition-transform">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">א.א אפרתי</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">בנייה ושיפוצי יוקרה</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 font-black text-xs uppercase tracking-widest text-slate-500">
            {["שירותים", "פרויקטים", "אודות", "צרו קשר"].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-orange-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-xl active:scale-95">
            הצעת מחיר
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-orange-100 text-orange-700 px-5 py-2 rounded-2xl text-xs font-black mb-8 border border-orange-200">
              נבחרת המקצוענים של השנה
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-slate-900 leading-[0.9]">
              בונים <span className="text-orange-600">איכות</span><br />שנשארת לדורות.
            </h1>
            <p className="text-xl text-slate-500 max-w-xl mb-12 font-medium leading-relaxed">
              שיפוצי יוקרה, עבודות גמר ובנייה מהיסוד עם רמת דיוק של מילימטר. אנחנו לא רק בונים - אנחנו מגשימים חלומות הנדסיים.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-orange-700 transition-all shadow-2xl shadow-orange-200">
                בואו נתחיל פרויקט
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-sm" />)}
                </div>
                <div className="text-sm font-bold">
                  <span className="text-orange-600 block leading-none">+250</span>
                  <span className="text-slate-400">לקוחות מרוצים</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000" alt="Construction" className="w-full h-[600px] object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl max-w-[240px]">
              <Award className="text-orange-600 w-12 h-12 mb-4" />
              <h4 className="font-black text-xl mb-1">ISO 9001</h4>
              <p className="text-xs text-slate-400 font-bold">תקן איכות בינלאומי לניהול וביצוע פרויקטים</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Filter */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">קטלוג השירותים המלא</h2>
            <p className="text-slate-400 font-bold max-w-2xl mx-auto italic">למעלה מ-30 סוגי שירותים תחת קורת גג אחת, בביצוע צוותים אורגניים בלבד.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl font-black transition-all border-2 ${
                  filter === cat ? "bg-orange-600 border-orange-600 text-white shadow-xl" : "bg-white border-slate-200 text-slate-500 hover:border-orange-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={service.id}
                  className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                      <service.icon className="text-orange-600 w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-2 block">{service.cat}</span>
                    <h3 className="text-xl font-black mb-4 group-hover:text-orange-600 transition-colors leading-tight">{service.title}</h3>
                    <div className="flex items-end justify-between mt-6 pt-6 border-t border-slate-50">
                      <div>
                        <span className="text-2xl font-black text-slate-900">₪{service.price}</span>
                        <span className="text-slate-400 text-xs font-bold mr-1 italic">/ {service.unit}</span>
                      </div>
                      <button className="bg-slate-50 p-3 rounded-xl hover:bg-orange-600 hover:text-white transition-all">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-slate-900 text-white pt-32 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-orange-600 via-yellow-400 to-orange-600" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-24">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-orange-600 p-2.5 rounded-2xl">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-3xl font-black italic tracking-tighter">א.א אפרתי</span>
              </div>
              <p className="text-slate-400 font-bold leading-relaxed text-lg mb-8">
                מובילים את ענף הבנייה והשיפוצים בישראל עם סטנדרט ביצוע שטרם נראה. כל בית הוא סיפור של הצלחה.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Phone].map((Icon, i) => (
                  <div key={i} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-all border border-white/10 group">
                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-sm">
                <h4 className="text-2xl font-black mb-8">צרו קשר ישיר</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <span className="text-xl font-bold">052-1234567</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <MessageSquare size={20} />
                    </div>
                    <span className="text-xl font-bold">office@efrati.co.il</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-4xl font-black mb-4">מוכנים לשינוי?</h4>
                <p className="text-slate-400 font-bold mb-8 italic">השאירו פרטים ונתחיל בתכנון הבית הבא שלכם עוד היום.</p>
                <button className="w-full bg-orange-600 py-6 rounded-2xl text-xl font-black shadow-2xl hover:bg-orange-700 transition-all active:scale-95">
                  קבלו ייעוץ מקצועי חינם
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} א.א אפרתי - מומחים לבנייה וגמר • כל הזכויות שמורות
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
