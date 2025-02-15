import React from "react";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="flex justify-between border-b p-2">
      <span>{item.name} - {item.price} ₽</span>
      <button onClick={() => removeFromCart(item.id)} className="text-red-500">Удалить</button>
    </div>
  );
};

export default CartItem;
