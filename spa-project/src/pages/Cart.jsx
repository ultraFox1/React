import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate для перенаправления

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Хук для редиректа

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>

      {cartItems.length === 0 ? (
        // Пустая корзина
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <img 
            src="./images/5501790.png" 
            alt="Пустая корзина" 
            className="w-48 mb-4 opacity-80"
          />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Пока пусто</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Воспользуйтесь <Link to="/" className="text-blue-500 hover:underline">каталогом</Link> или поиском.
          </p>
        </div>
      ) : (
        // Список товаров в корзине
        <div>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded shadow">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.price} ₽</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Кнопка "Оформить заказ" */}
          <button 
            onClick={() => navigate("/order")} // ✅ Перенаправление на страницу заказа
            className="w-full bg-green-500 text-white py-3 rounded font-semibold text-lg hover:bg-green-600 transition"
          >
            Оформить заказ
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
