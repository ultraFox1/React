import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-40">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Основной блок с колонками */}
        <div className="flex flex-wrap justify-between gap-8 md:gap-12">
          
          {/* Колонка "Компания" */}
          <div className="w-full sm:w-auto">
            <h3 className="text-white font-bold mb-3">Компания</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">О компании</a></li>
              <li><a href="#">Новости</a></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Сервисные центры</a></li>
            </ul>
          </div>

          {/* Колонка "Покупателям" */}
          <div className="w-full sm:w-auto">
            <h3 className="text-white font-bold mb-3">Покупателям</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Как оформить заказ</a></li>
              <li><a href="#">Способы оплаты</a></li>
              <li><a href="#">Доставка</a></li>
              <li><a href="#">Обмен, возврат, гарантия</a></li>
              <li><a href="#">Проверка статуса ремонта</a></li>
            </ul>
          </div>

          {/* Колонка "Оставайтесь на связи" */}
          <div className="w-full sm:w-auto">
            <h3 className="text-white font-bold mb-3">Оставайтесь на связи</h3>
            <p className="text-gray-400 font-semibold">
              8-800-77-07-999 (с 04:00 до 23:00)
            </p>
            <p className="text-gray-400">Адреса магазинов в г. Ульяновск</p>
          </div>
        </div>

        {/* Нижний текст */}
        <div className="text-gray-500 text-sm text-center border-t border-gray-700 mt-6 pt-4">
          © 2025 Интернет-магазин. Все права защищены.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
