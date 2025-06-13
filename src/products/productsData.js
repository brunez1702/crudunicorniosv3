// src/products/productsData.js
export const initialProducts = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
  ];
  
  export const getProducts = () => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  };
  
  export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };