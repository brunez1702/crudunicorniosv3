// src/products/index.jsx
import { Routes, Route } from 'react-router-dom';
import { ProductsView } from './ProductsView';

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
    </Routes>
  );
};