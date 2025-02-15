import React from "react";
import { motion } from "framer-motion";

const ProductModal = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
      >
        {/* Кнопка закрытия */}
        <button className="absolute top-2 right-2 text-gray-500 text-2xl" onClick={onClose}>&times;</button>

        {/* Изображение */}
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />

        {/* Название и рейтинг */}
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-yellow-500">⭐ {product.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1)} / 5</p>

        {/* Цена и описание */}
        <p className="text-xl font-semibold text-blue-600 mt-2">{product.price} ₽</p>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Кнопка добавления в корзину */}
        <button onClick={() => addToCart(product)} className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Добавить в корзину
        </button>
      </motion.div>
    </div>
  );
};

export default ProductModal;
