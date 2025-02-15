import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ searchQuery, setSearchQuery, notification }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-gray-800 text-white p-4 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex items-center space-x-2">
          <img src="./images/watermelon.png" alt="Логотип" className="h-8 w-8" />
          <span className="text-xl font-bold">Watermelon Store</span>
        </Link>

        <input 
          type="text" 
          placeholder="🔍 Поиск товаров..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="p-2 w-64 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Каталог</Link>
          <Link to="/cart" className="hover:text-gray-300">Корзина</Link>
          <Link to="/order" className="hover:text-gray-300">Заказ</Link>

          <button 
            onClick={toggleTheme} 
            className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Уведомление */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed top-16 right-4 px-4 py-2 rounded shadow-lg bg-green-500 text-white"
          >
            {notification} добавлен в корзину 🛒
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
