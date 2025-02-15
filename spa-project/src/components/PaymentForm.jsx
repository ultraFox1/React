import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length < 19 || expiryDate.length < 4 || cvv.length < 3) {
      setError("Заполните все поля корректно!");
      return;
    }
    alert("Оплата успешно проведена!");
  };

  return (
    <div className="max-w-md mx-auto p-6  ">
      <h2 className="text-xl font-semibold mb-4">Оплата банковской картой</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-4">
        <Cards
          number={cardNumber}
          name={cardName}
          expiry={expiryDate.replace("/", "")}
          cvc={cvv}
          focused={focused}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700">Номер карты</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          onFocus={() => setFocused("number")}
          maxLength="19"
          placeholder="1234 5678 9101 1121"
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-gray-700">Имя владельца</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          onFocus={() => setFocused("name")}
          placeholder="IVAN IVANOV"
          className="w-full p-2 border rounded-md mb-3 uppercase"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Дата (MM/YY)</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onFocus={() => setFocused("expiry")}
              placeholder="12/25"
              maxLength="5"
              className="w-full p-2 border rounded-md mb-3"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              onFocus={() => setFocused("cvc")}
              placeholder="***"
              maxLength="3"
              className="w-full p-2 border rounded-md mb-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Оплатить
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
