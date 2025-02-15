import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div 
      className="border p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition"
      onClick={() => console.log("Открываем модалку", product)}
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.price} ₽</p>
      <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
