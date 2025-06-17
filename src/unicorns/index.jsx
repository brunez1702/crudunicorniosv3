// src/unicorns/index.jsx
import { Routes, Route } from 'react-router-dom';
import { UnicornsView } from './UnicornsView';
import { UnicornForm } from './UnicornForm';
import UnicornsContainer from './UnicornsContainer';

export const UnicornRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UnicornsContainer />} />
    </Routes>
  );
};