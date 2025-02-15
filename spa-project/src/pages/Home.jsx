import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { motion, AnimatePresence } from "framer-motion";

const Home = ({ 
  sortBy, setSortBy, 
  filterByCategory, setFilterByCategory, 
  priceRange, setPriceRange, 
  searchQuery // ✅ Добавили поиск
}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const isDark = theme === "dark";

  // ✅ Фильтрация товаров (по категории, цене и названию)
  const filteredProducts = products
    .filter(product => (filterByCategory ? product.category === filterByCategory : true))
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())); // 🔍 Поиск по названию

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    return a.name.localeCompare(b.name);
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setNotification(product.name);

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className={`p-6 rounded-lg transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="mt-16 text-2xl font-bold mb-4">Каталог товаров</h1>

      {/* Уведомление */}
      <AnimatePresence>
  {notification && (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className={`fixed top-16 right-4 px-4 py-2 rounded shadow-lg ${
        isDark ? "bg-green-600" : "bg-green-500"
      } text-white z-50`}
    >
      {notification} добавлен в корзину 🛒
    </motion.div>
  )}
</AnimatePresence>

      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select 
          className={`p-2 border rounded transition-all duration-300 ${
            isDark ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"
          }`} 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Сортировать по названию</option>
          <option value="price">Сортировать по цене</option>
        </select>

        <select 
          className={`p-2 border rounded transition-all duration-300 ${
            isDark ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"
          }`} 
          value={filterByCategory || ""} 
          onChange={(e) => setFilterByCategory(e.target.value || null)}
        >
          <option value="">Показать все товары</option>
          <option value="laptop">Только ноутбуки</option>
          <option value="phone">Только смартфоны</option>
          <option value="headphones">Только наушники</option>
        </select>

        {/* Фильтр по цене */}
        <div className="flex flex-col items-center w-full sm:w-auto">
          <label className="text-sm font-semibold mb-1">Цена: {priceRange[0]} - {priceRange[1]} ₽</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500">Нет товаров в выбранной категории или ценовом диапазоне.</p>
      ) : (
        <motion.div layout className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map(product => (
            <motion.div 
              key={product.id} 
              layout 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProduct(product)}
            >
              <ProductCard product={product} addToCart={() => handleAddToCart(product)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Модальное окно */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={(product) => handleAddToCart(product)}
        />
      )}
    </motion.div>
  );
};

export default Home;
