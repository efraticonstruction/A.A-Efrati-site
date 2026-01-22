"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home,
  Droplets, Zap, Utensils, ShieldCheck, 
  Ruler, MessageSquare, Phone, Instagram, Facebook,
  Layers, HardHat, Drill
} from "lucide-react";
import { motion } from "framer-motion";

export default function AA_Efrati_Site() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SERVICES = [
    { 
      id: 'p1', 
      title: "בנייה מאפס (עד מפתח)", 
      price: 9500, 
      unit: "מ\"ר", 
      icon: Home, 
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
      desc: "ליווי מלא משלב השלד ועד קבלת המפתח."
    },
    { 
      id: 'p2', 
      title: "שיפוץ דירה כללי", 
      price: 3200, 
      unit: "מ\"ר", 
      icon: Hammer, 
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800",
      desc: "חידוש מקיף לדירות ישנות וחדשות."
    },
    { 
      id: 's1', 
      title: "ריצוף וחיפוי יוקרתי", 
      price: 180, 
      unit: "מ\"ר", 
      icon: LayoutGrid, 
      img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800",
      desc: "עבודות קרמיקה, גרניט פורצלן ושיש."
    },
    { 
      id: 's2', 
      title: "מטבחי פרימיום", 
      price: 4500, 
      unit: "מטר", 
      icon: Utensils, 
      img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800",
      desc: "תכנון והתקנת מטבחים מעוצבים."
    },
    { 
      id: 's3', 
      title: "תשתיות חשמל ותאורה", 
      price: 350, 
      unit: "נקודה", 
      icon: Zap, 
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800",
      desc: "תכנון חשמל חכם ותאורת אווירה."
    },
    { 
      id: 's4', 
      title: "אינסטלציה וסניטריה", 
      price: 2800, 
      unit: "חלל", 
      icon: Droplets, 
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
      desc: "הקמת תשתיות מים וחדרי רחצה מודרניים."
    },
    { 
      id: 's5', 
      title: "עבודות גבס ודקורציה", 
      price: 120, 
      unit: "מ\"ר", 
      icon: Layers, 
      img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=800",
      desc: "הנמכות תקרה, נישות מעוצבות וקרניזים."
    },
    { 
      id: 's6', 
      title: "צבע וציפויים דקורטיביים", 
      price: 45, 
      unit: "מ\"ר", 
      icon: Ruler, 
      img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800",
      desc: "צביעה אמנותית וחידוש קירות."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans rtl" dir="rtl">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-2 rounded-lg shadow-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-800">א.א אפרתי</span>
          </div>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg active:scale-95">
            דברו איתנו
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            איכות ללא <span className="text-orange-600">פשרות</span><br />בכל פינה בבית.
          </motion.h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            מומחים לעבודות גמר ושיפוצים ברמת פרימיום. אנחנו כאן כדי להפוך את החלום שלך למציאות הנדסית מושלמת.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-4 text-center">הקטלוג שלנו</h2>
          <p className="text-slate-500 text-center mb-16">שירותי בנייה ושיפוץ בהתאמה אישית</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-xl shadow-md">
                    <service.icon className="text-orange-600 w-6 h-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-orange-600 font-black text-lg">₪{service.price}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">/ {service.unit}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"><Phone /></div>
            <div className="bg-white/10 p-4 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"><Instagram /></div>
            <div className="bg-white/10 p-4 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"><Facebook /></div>
          </div>
          <p className="text-slate-400 font-bold">א.א אפרתי - מומחים לעבודות גמר ושיפוצים</p>
          <div className="mt-8 text-slate-500 text-sm">© {new Date().getFullYear()} כל הזכויות שמורות</div>
        </div>
      </footer>
    </div>
  );
}
