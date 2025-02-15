export const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Ошибка загрузки товаров");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  