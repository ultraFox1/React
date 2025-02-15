export const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(price);
  };
  
  export const filterProducts = (products, query) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  