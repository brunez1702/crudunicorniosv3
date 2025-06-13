import { createContext, useContext, useState } from 'react';

const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);

  const getUnicorns = async () => {
    // Lógica para obtener unicornios
  };

  const createUnicorn = async (unicorn) => {
    // Lógica para crear
  };

  const editUnicorn = async (id, updatedUnicorn) => {
    // Lógica para editar
  };

  const deleteUnicorn = async (id) => {
    // Lógica para eliminar
  };

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        getUnicorns,
        createUnicorn,
        editUnicorn,
        deleteUnicorn
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
};

export const useUnicornContext = () => useContext(UnicornContext);