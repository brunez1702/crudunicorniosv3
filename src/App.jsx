// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import { UnicornRoutes } from './unicorns';
import { ProductRoutes } from './products';
import { Home } from './home/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/unicornios/*"
        element={
          <UnicornProvider>
            <UnicornRoutes />
          </UnicornProvider>
        }
      />
      <Route path="/productos/*" element={<ProductRoutes />} />
    </Routes>
  );
}

export default App;