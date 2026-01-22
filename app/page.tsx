"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home,
  Droplets, Zap, Utensils, ShieldCheck, 
  Ruler, MessageSquare, Phone, Instagram, Facebook,
  Layers, Paintbrush, Box, HardHat, Drill, 
  PencilRuler, Construction, Wrench, Thermometer, 
  Sun, Wind, Move, Scaling, Lightbulb, 
  HeartHandshake, Award
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
    // בנייה ושלד (6 שירותים)
    { id: 1, cat: "בנייה ושלד", title: "בניית וילות מהיסוד", icon: Home, price: "9,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600" },
    { id: 2, cat: "בנייה ושלד", title: "תוספות בנייה והרחבות", icon: Layers, price: "8,200", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=600" },
    { id: 3, cat: "בנייה ושלד", title: "עבודות שלד ובטון", icon: Construction, price: "4,500", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=600" },
    { id: 4, cat: "בנייה ושלד", title: "חיזוק מבנים תמ\"א 38", icon: ShieldCheck, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=600" },
    { id: 5, cat: "בנייה ושלד", title: "בניית ממ\"דים תקניים", icon: HardHat, price: "120,000", unit: "קומפלט", img: "https://images.unsplash.com/photo-1590059132612-58832a57894a?q=80&w=600" },
    { id: 6, cat: "בנייה ושלד", title: "הריסה ופינוי פסולת", icon: Hammer, price: "15,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=600" },

    // גמר ועיצוב (10 שירותים)
    { id: 7, cat: "גמר ועיצוב", title: "ריצוף וחיפוי שיש יוקרתי", icon: LayoutGrid, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: 8, cat: "גמר ועיצוב", title: "מטבחי פרימיום בהתאמה", icon: Utensils, price: "45,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600" },
    { id: 9, cat: "גמר ועיצוב", title: "עבודות גבס ותקרות", icon: Lightbulb, price: "180", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=600" },
    { id: 10, cat: "גמר ועיצוב", title: "צביעה דקורטיבית וטיח", icon: Paintbrush, price: "65", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600" },
    { id: 11, cat: "גמר ועיצוב", title: "פרקט עץ וגרניט", icon: Move, price: "120", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=600" },
    { id: 12, cat: "גמר ועיצוב", title: "חיפוי חוץ מאוורר", icon: Scaling, price: "350", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=600" },
    { id: 13, cat: "גמר ועיצוב", title: "דלתות פנים מעוצבות", icon: Box, price: "1,800", unit: "יח'", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=600" },
    { id: 14, cat: "גמר ועיצוב", title: "עבודות נגרות אומן", icon: Ruler, price: "לפי תוכנית", unit: "", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600" },
    { id: 15, cat: "גמר ועיצוב", title: "חדרי רחצה מודרניים", icon: Droplets, price: "25,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" },
    { id: 16, cat: "גמר ועיצוב", title: "עבודות מסגרות וברזל", icon: Wrench, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600" },

    // תשתיות (7 שירותים)
    { id: 17, cat: "תשתיות", title: "אינסטלציה וצנרת מים", icon: Droplets, price: "2,500", unit: "נקודה", img: "https://images.unsplash.com/photo-1607472586893-edb5caad0555?q=80&w=600" },
    { id: 18, cat: "תשתיות", title: "חשמל ותקשורת חכמה", icon: Zap, price: "350", unit: "נקודה", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600" },
    { id: 19, cat: "תשתיות", title: "מיזוג אוויר מתקדם", icon: Wind, price: "18,000", unit: "מערכת", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600" },
    { id: 20, cat: "תשתיות", title: "חימום תת-רצפתי", icon: Thermometer, price: "250", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1585129018945-36423a23880a?q=80&w=600" },
    { id: 21, cat: "תשתיות", title: "מערכות בית חכם", icon: Zap, price: "12,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600" },
    { id: 22, cat: "תשתיות", title: "ביוב וניקוז חוץ", icon: Droplets, price: "לפי מטר", unit: "", img: "https://images.unsplash.com/photo-1620629739504-2070381665e8?q=80&w=600" },
    { id: 23, cat: "תשתיות", title: "הארקה ובדיקות חשמל", icon: ShieldCheck, price: "1,200", unit: "בדיקה", img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=600" },

    // מערכות ומשלימים (7 שירותים)
    { id: 24, cat: "מערכות", title: "איטום גגות ומרפסות", icon: Droplets, price: "95", unit: "מ\"ר", img: "https://images.unsplash.com/photo-1635339001331-97b777a8684d?q=80&w=600" },
    { id: 25, cat: "מערכות", title: "דודי שמש וחשמל", icon: Sun, price: "3,800", unit: "יח'", img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=600" },
    { id: 26, cat: "מערכות", title: "מערכות סינון מים", icon: Droplets, price: "1,500", unit: "יח'", img: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=600" },
    { id: 27, cat: "מערכות", title: "בריכות שחייה ביתיות", icon: Droplets, price: "150,000", unit: "החל מ-", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600" },
    { id: 28, cat: "מערכות", title: "פיתוח חוץ וגינון", icon: Home, price: "לפי פרויקט", unit: "", img: "https://images.unsplash.com/photo-1558905611-396558110996?q=80&w=600" },
    { id: 29, cat: "מערכות", title: "תכנון וליווי הנדסי", icon: PencilRuler, price: "כלול", unit: "", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600" },
    { id: 30, cat: "מערכות", title: "בדק בית וביקורת", icon: Award, price: "2,500", unit: "בדיקה", img: "https://images.unsplash.com/photo-1460472178825-e5240623abe5?q=80&w=600" }
  ];

  const filteredServices = filter === "הכל" ? SERVICES : SERVICES.filter(s => s.cat === filter);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans rtl selection:bg-orange-200" dir="rtl">
      {/* Header */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-xl py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none">א.א אפרתי</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">בנייה ושיפוצי יוקרה</span>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all active:scale-95">
            צרו קשר
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            הבית שלך בידיים <span className="text-orange-600">הכי טובות.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
            30 שנות ניסיון בבנייה, שיפוצים ועבודות גמר ברמת הפרימיום הגבוהה ביותר בישראל.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl font-black transition-all ${
                  filter === cat ? "bg-orange-600 text-white shadow-xl" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-2xl">
                      <service.icon className="text-orange-600 w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-orange-600 uppercase mb-2 block">{service.cat}</span>
                    <h3 className="text-xl font-black mb-4 h-12">{service.title}</h3>
                    <div className="flex items-end justify-between border-t pt-6 mt-4">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black">₪{service.price}</span>
                        <span className="text-slate-400 text-xs font-bold">{service.unit}</span>
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <p className="text-2xl font-black mb-8">א.א אפרתי - איכות, שירות ומצוינות</p>
          <div className="flex justify-center gap-6 mb-12">
            {[Phone, Instagram, Facebook].map((Icon, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-2xl hover:bg-orange-600 cursor-pointer transition-all">
                <Icon size={24} />
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}
