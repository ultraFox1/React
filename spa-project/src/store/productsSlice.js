import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  { id: 1, name: "Игровой ноутбук MSI Thin 15", category: "laptop", price: 60000, image: "./images/ewg6ewpadkoudbf9w466o406am5pbuay.jpg", description: "Добейтесь успеха в любом соревновании и займите верхние строчки списка лидеров с помощью игровых ноутбуков Thin. "  },
  { id: 2, name: " Apple iPhone 14", category: "phone", price: 50000, image: "./images/images (1).jpg", description: "Смартфон Apple iPhone 14 – компактная модель с безрамочным дисплеем OLED 6.1 дюйма. Стеклянный корпус мобильного устройства соответствует стандарту защищенности IP68 – он устойчив к воздействию влаги и пыли. Передняя панель обладает покрытием Ceramic Shield для защиты экрана от появления царапин и различных дефектов."  },
  { id: 3, name: "Наушники беспроводные Marshall Major IV ", category: "headphones", price: 5000, image: "./images/images (2).jpg", description: "Беспроводные наушники с шумоподавлением и отличным звуком."  },
  { id: 4, name: "AGON by AOC 34 Монитор CU34G2", category: "monitor", price: 15000, image: "./images/53491200.png", description: "IPS-монитор с высоким разрешением и яркими цветами."  },
  { id: 5, name: "Hyperx alloy origins core", category: "accessories", price: 3000, image: "./images/cd73abb86e82d84634bc345868842cb2.webp", description: "Механическая клавиатура с RGB-подсветкой."  },
  { id: 6, name: "Ноутбук asus rog strix g", category: "laptop", price: 100000, image: "./images/laptop.jpg", description: "Мощный и стильный ноутбук для работы и игр."  },
  { id: 7, name: "Apple iPhone 13", category: "phone", price: 40000, image: "./images/images.jpg", description: "Не существует ни одной задачи, с выполнением которой не справился бы смартфон Apple iPhone 13. Неважно, что необходимо пользователю в текущий момент – навигация между окнами, быстрая загрузка приложений или мгновенная обработка данных."   },
  { id: 8, name: "Наушники JBL Tune520BTBlue", category: "headphones", price: 5000, image: "./images/6797484713.jpg", description: "Беспроводные наушники с шумоподавлением и отличным звуком."  },
  { id: 9, name: "Монитор YUNMEIHANG 165Гц 2k", category: "monitor", price: 15000, image: "./images/7028347129.jpg", description: "IPS-монитор с высоким разрешением и яркими цветами."  },
  { id: 10, name: "HyperX Alloy Origins 60 белый", category: "accessories", price: 3000, image: "./images/hx-features-keyboard-alloy-origins-60-pink.jpg", description: "Механическая клавиатура с RGB-подсветкой."  }
];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: initialProducts,
  },
  reducers: {},
});

export default productsSlice.reducer;