import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ setAddress }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Храним ссылку на карту
  const placemarkRef = useRef(null); // Храним ссылку на маркер
  const [fullAddress, setFullAddress] = useState("");
  const [error, setError] = useState(null); // ✅ Хранение ошибки

  useEffect(() => {
    if (!window.ymaps || mapInstanceRef.current) return; // Предотвращаем дублирование

    window.ymaps.ready(() => {
      if (!mapRef.current) return; // Проверяем, что контейнер существует

      mapRef.current.innerHTML = "";
      
      const map = new window.ymaps.Map(mapRef.current, {
        center: [55.751244, 37.618423],
        zoom: 12,
      });

      mapInstanceRef.current = map; // Сохраняем карту

      const newPlacemark = new window.ymaps.Placemark(map.getCenter(), {}, { draggable: true });

      map.geoObjects.add(newPlacemark);
      placemarkRef.current = newPlacemark;

      newPlacemark.events.add("dragend", () => {
        updateAddress(newPlacemark.geometry.getCoordinates());
      });

      map.events.add("click", (e) => {
        const coords = e.get("coords");
        newPlacemark.geometry.setCoordinates(coords);
        updateAddress(coords);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy(); // Уничтожаем карту
        mapInstanceRef.current = null;
        placemarkRef.current = null;
      }
    };
  }, []);

  // ✅ Функция для обновления адреса с обработкой ошибок
  const updateAddress = async (coords) => {
    try {
      const response = await window.ymaps.geocode(coords);
      const firstGeoObject = response.geoObjects.get(0);

      if (firstGeoObject) {
        const address = firstGeoObject.getAddressLine();
        setFullAddress(address);
        setError(null); // ✅ Убираем ошибку

        if (typeof setAddress === "function") {
          setAddress(address);
        }
      } else {
        setFullAddress("");
        setError("Не удалось определить адрес.");
      }
    } catch (err) {
      setError("Ошибка при получении адреса.");
      console.error("Ошибка геокодирования:", err);
    }
  };

  return (
    <div>
      <div ref={mapRef} className="w-full h-64 border rounded"></div>

      {/* ✅ Блок с информацией об адресе с обработкой ошибок */}
      <div className="mt-4 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-lg font-semibold">Выбранный адрес:</h3>
        {error ? (
          <p className="text-red-500">{error}</p> // ✅ Отображение ошибки
        ) : (
          <p>{fullAddress || "Не выбран"}</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
