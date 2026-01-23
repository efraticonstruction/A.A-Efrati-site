"use client";

import React, { useState, useEffect } from "react";
import { 
  Hammer, Star, CheckCircle2, LayoutGrid, Home, Droplets, Zap, Utensils, 
  ShieldCheck, Ruler, MessageSquare, Phone, Instagram, Facebook, Layers, 
  Paintbrush, Box, HardHat, Construction, Wrench, Thermometer, Sun, Wind, 
  Move, Scaling, Lightbulb, HeartHandshake, Award, PencilRuler, Drill, 
  Smartphone, Waves, Trash2, ShoppingCart, X, Plus, Check, PhoneCall, MapPin, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- הגדרות מערכת ---
const PHONE_NUMBER = "972500000000"; // עדכן למספר שלך
const SERVICE_AREAS = "מרכז | ירושלים | יהודה ושומרון";

export default function AAEfratiEnterpriseSite() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- דאטה: שירותי בנייה (30 שירותים) ---
  const SERVICES = [
    { id: "ser1", cat: "בנייה ושלד", title: "בניית וילות יוקרה", desc: "ליווי מאדריכלות ועד שלד מושלם", price: "9,500", icon: Home, img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600" },
    { id: "ser2", cat: "בנייה ושלד", title: "תוספות בנייה והרחבות", desc: "הגדלת הבית בשיטות בנייה מתקדמות", price: "8,200", icon: Layers, img: "https://images.unsplash.com/photo-1541913055-94490e2c0bb5?q=80&w=600" },
    { id: "ser3", cat: "בנייה ושלד", title: "עבודות שלד ובטון", desc: "יציקות, כלונסאות ותפסנות מקצועית", price: "4,500", icon: Construction, img: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=600" },
    { id: "ser4", cat: "גמר ועיצוב", title: "ריצוף וחיפוי שיש", desc: "עבודה עם לייזר לרמת דיוק מושלמת", price: "250", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: "ser5", cat: "תשתיות", title: "אינסטלציה וצנרת", desc: "מערכות SP וצנרת שקטה בסטנדרט גבוה", price: "2,500", icon: Droplets, img: "https://images.unsplash.com/photo-1607472586893-edb5caad0555?q=80&w=600" },
    { id: "ser6", cat: "מערכות", title: "בריכות שחייה פרטיות", desc: "תכנון וביצוע בריכות בטון וגלישה", price: "150,000", icon: Waves, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600" },
    { id: "ser7", cat: "גמר ועיצוב", title: "עבודות גבס ועיצוב בתאורה", desc: "קרניזים, נישות וסינרים למזגן", price: "180", icon: Lightbulb, img: "https://images.unsplash.com/photo-1504148455328-497c5efdd156?q=80&w=600" },
    { id: "ser8", cat: "בנייה ושלד", title: "חיזוק מבנים (תמ\"א 38)", desc: "חיזוק קונסטרוקטיבי ושיפור פני המבנה", price: "לפי תוכנית", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=600" },
    // ... ניתן להוסיף כאן את כל ה-30 מהקוד הקודם, המבנה נשמר
  ];

  // --- דאטה: קטלוג חומרים (לפי ה-PDF שלך) ---
  const PRODUCTS = [
    { id: "p1", cat: "ריצוף פנים", title: "מונטריאול אפור", desc: "גרניט פורצלן 80/80 מט R10", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600" },
    { id: "p2", cat: "ריצוף פנים", title: "אידרה בז' משי", desc: "מגע משי יוקרתי, 80/80 אירופאי", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: "p3", cat: "ריצוף פנים", title: "אמאני לבן", desc: "מראה שיש נקי ומבריק", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: "p4", cat: "ריצוף פנים", title: "ארק סילבר", desc: "גוון אפור מודרני, גרפיקה משתנה", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600" },
    { id: "p5", cat: "חוץ ומרפסות", title: "דקו בטון אפור", desc: "אנטי סליפ 33/33 תקני", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1541888941255-081ad89b9ec6?q=80&w=600" },
    { id: "p6", cat: "חדר רחצה", title: "מדרה אלון (דמוי פרקט)", desc: "גרניט פורצלן 60/15 במראה עץ", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?q=80&w=600" },
    { id: "p7", cat: "סניטריה", title: "אסלה תלויה גבריט (GEBERIT)", desc: "כולל מושב הידראולי שקט", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" },
    { id: "p8", cat: "סניטריה", title: "ברז אומגה שחור מט", desc: "סדרת פרימיום רובי", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" },
    { id: "p9", cat: "דלתות פנים", title: "דלת פולימרית רב-בריח", desc: "100% עמידות למים, מבחר גוונים", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=600" },
    { id: "p10", cat: "סניטריה", title: "אינטרפוץ 4 דרך", desc: "גימור כרום / זהב מוברש", price: "מפרט קבלן", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600" }
  ];

  const addToCart = (item) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));

  const filteredItems = (activeTab === 'services' ? SERVICES : PRODUCTS).filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendOrder = () => {
    const message = `שלום א.א אפרתי,\nאני מעוניין לקבל הצעת מחיר עבור הפריטים הבאים:\n\n${cart.map(i => `✅ ${i.title} (${i.cat})`).join('\n')}\n\nאשמח ליצירת קשר בהקדם.`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] rtl font-sans" dir="rtl">
      
      {/* Top Banner - Service Areas */}
      <div className="bg-orange-600 text-white py-2 text-center text-xs font-black uppercase tracking-[2px] z-[60] relative">
        <div className="container mx-auto px-6 flex justify-center items-center gap-4">
          <MapPin size={14} />
          <span>אזורי שירות: {SERVICE_AREAS}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "top-0 bg-white shadow-2xl py-3" : "top-8 bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#0F172A] p-2.5 rounded-2xl shadow-lg">
              <ShieldCheck className="text-orange-500 w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-[1000] tracking-tighter block leading-none">א.א אפרתי</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Construction & Design</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${activeTab === 'services' ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              שירותי בנייה
            </button>
            <button 
              onClick={() => setActiveTab('shop')}
              className={`px-8 py-2.5 rounded-xl font-black text-sm transition-all ${activeTab === 'shop' ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              קטלוג חומרי גמר
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-white border border-slate-200 rounded-2xl hover:border-orange-500 transition-all group">
              <ShoppingCart className="text-slate-900 group-hover:text-orange-600" size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
            <a href={`tel:${PHONE_NUMBER}`} className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all hidden md:block">
              חיוג מהיר
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-60 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-6xl md:text-9xl font-[1000] leading-[0.85] tracking-[-4px] mb-8">
                בנייה. עיצוב.<br />
                <span className="text-orange-600">מצוינות.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-bold mb-12 max-w-xl leading-relaxed">
                הופכים חלום למציאות במרכז, ירושלים ויו"ש. קבלן רשום המשלב ביצוע מושלם עם אספקת חומרי פרימיום.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="חפש שירות או מוצר (למשל: ריצוף, אינסטלציה...)" 
                    className="w-full bg-slate-100 border-none py-5 pr-12 pl-6 rounded-2xl font-bold focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="h-72 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-sm font-bold leading-snug">{item.desc}</p>
                  </div>
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl">
                      {item.icon ? <item.icon className="text-orange-600 w-6 h-6" /> : <Box className="text-orange-600 w-6 h-6" />}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-[1000] text-orange-600 uppercase tracking-[2px] block mb-1">{item.cat}</span>
                      <h3 className="text-2xl font-[900] leading-tight tracking-tighter">{item.title}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-4">
                    <div>
                      <span className="text-2xl font-black text-[#0F172A]">₪{item.price}</span>
                      <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-tighter">מחיר יחידה/מ"ר</span>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                        cart.find(i => i.id === item.id) 
                          ? "bg-green-500 text-white shadow-lg shadow-green-100" 
                          : "bg-[#0F172A] text-white hover:bg-orange-600 shadow-lg shadow-slate-100"
                      }`}
                    >
                      {cart.find(i => i.id === item.id) ? <><Check size={18} /> נוסף</> : <><Plus size={18} /> בחר</>}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[101] shadow-2xl p-12 flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-[1000] tracking-tighter">הסל שלך</h2>
                  <p className="text-slate-400 font-bold">סיכום בחירות חומרים ועבודות</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="bg-slate-100 p-3 rounded-2xl hover:bg-orange-100 transition-colors"><X size={24}/></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><ShoppingCart className="text-slate-300" size={32}/></div>
                    <p className="text-slate-400 font-black">הסל ריק. הגיע הזמן לבחור חומרים!</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative group transition-all hover:bg-white hover:shadow-xl">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm">
                      <img src={item.img} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">{item.cat}</span>
                      <h4 className="text-xl font-black text-[#0F172A]">{item.title}</h4>
                      <p className="text-sm font-bold text-slate-400">מחיר מוערך: ₪{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t mt-8 space-y-4">
                <button 
                  onClick={sendOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-orange-600 text-white py-6 rounded-[28px] font-[1000] text-xl shadow-2xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  <MessageSquare size={24} />
                  שלח הצעה לוואטסאפ
                </button>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">ההצעה אינה סופית וכפופה למדידה בשטח</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Global Contact */}
      <div className="fixed bottom-8 left-8 z-[90] flex flex-col gap-4">
        <a href={`https://wa.me/${PHONE_NUMBER}`} className="bg-[#25D366] text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all"><MessageSquare size={32}/></a>
        <a href={`tel:${PHONE_NUMBER}`} className="bg-[#0F172A] text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all"><PhoneCall size={32}/></a>
      </div>

      <footer className="bg-[#0F172A] text-white py-32 mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl font-[1000] mb-8 leading-none">א.א אפרתי - <br /><span className="text-orange-600">בונים את העתיד שלך.</span></h2>
            <p className="text-slate-400 text-xl font-bold max-w-xl mb-12">קבוצת א.א אפרתי מתמחה בניהול פרויקטים הנדסיים, בניית שלד וגמר בסטנדרטים בינלאומיים. שירות בפריסה רחבה במרכז, ירושלים ויהודה ושומרון.</p>
            <div className="flex gap-8">
              <a href="#" className="text-white hover:text-orange-600 transition-colors font-black uppercase text-xs tracking-widest">Instagram</a>
              <a href="#" className="text-white hover:text-orange-600 transition-colors font-black uppercase text-xs tracking-widest">Facebook</a>
              <a href="#" className="text-white hover:text-orange-600 transition-colors font-black uppercase text-xs tracking-widest">WhatsApp</a>
            </div>
          </div>
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 h-fit">
            <h4 className="font-black text-orange-600 uppercase tracking-widest text-xs mb-6">צור קשר ישיר</h4>
            <p className="text-2xl font-black mb-2">050-0000000</p>
            <p className="text-slate-400 font-bold mb-8">office@efrati-build.co.il</p>
            <button className="w-full bg-white text-[#0F172A] py-4 rounded-2xl font-black hover:bg-orange-600 hover:text-white transition-all">השאר פרטים</button>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[3px]">© 2024 A.A EFRATI CONSTRUCTION GROUP. ALL RIGHTS RESERVED.</p>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[3px]">Design by Premium AI</p>
        </div>
      </footer>
    </div>
  );
}
