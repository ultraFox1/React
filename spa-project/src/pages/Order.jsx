import React, { useState, useContext } from "react";
import PaymentForm from "../components/PaymentForm";
import MapComponent from "../components/MapComponent";
import { ThemeContext } from "../context/ThemeContext"; // Импорт контекста темы

const Order = () => {
  const { theme } = useContext(ThemeContext); // Получаем текущую тему

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronymic: "",
    birthdate: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });

  // Функция обновления данных в форме
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Функция сохранения адреса из карты
  const handleAddressSelect = (address) => {
    setFormData((prevData) => ({ ...prevData, address }));
  };

  return (
    <div className={`mt-16 max-w-lg mx-auto p-6 shadow-lg rounded-lg transition-colors
      ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>

      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>

      {/* ШАГ 1: ИНФОРМАЦИЯ О ПОКУПАТЕЛЕ */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Шаг 1: Информация о покупателе</h2>

          <input type="text" name="surname" placeholder="Фамилия"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />
          
          <input type="text" name="name" placeholder="Имя"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />
          
          <input type="text" name="patronymic" placeholder="Отчество"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />

          <label className="block mb-2">Дата рождения</label>
          <input type="date" name="birthdate"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />

          <label className="block mb-2">Пол</label>
          <select name="gender"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange}>
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>

          <input type="email" name="email" placeholder="Email"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />

          <input type="text" name="phone" placeholder="Телефон"
            className="w-full p-2 border rounded mb-2 bg-transparent"
            onChange={handleChange} />

          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={() => setStep(2)}>Далее</button>
        </div>
      )}

      {/* ШАГ 2: ОПЛАТА */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold">Шаг 2: Оплата</h2>
          <PaymentForm />
          <div className="flex justify-between mt-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setStep(1)}>Назад</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setStep(3)}>Далее</button>
          </div>
        </div>
      )}

      {/* ШАГ 3: ВЫБОР АДРЕСА */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold">Шаг 3: Выбор адреса</h2>

          <MapComponent setAddress={handleAddressSelect} />

          <div className="flex justify-between mt-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setStep(2)}>Назад</button>

            <button className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => alert(`Заказ оформлен!\n\nДанные покупателя:\nФИО: 
                ${formData.surname} ${formData.name} ${formData.patronymic}\nДата рождения:
                ${formData.birthdate}\nПол: ${formData.gender}\nEmail: ${formData.email}\nТелефон: 
                ${formData.phone}\nВыбранный адрес на карте: ${formData.address}`)}>Оформить заказ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
