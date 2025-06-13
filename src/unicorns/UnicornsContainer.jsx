import { useState, useEffect } from 'react';
import axios from 'axios';
import UnicornsView from './UnicornsView';

const API_URL = 'https://crudcrud.com/api/21d4df2ea5404ed99bac1f2d471de085/unicorns'; 

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [unicorn, setUnicorn] = useState({ name: '', color: '', age: '' , power: ''});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getUnicorns();
  }, []);

  const getUnicorns = async () => {
    try {
      const res = await axios.get(API_URL);
      setUnicorns(res.data);
    } catch (err) {
      console.error('Error al obtener unicornios', err);
    }
  };

  const createUnicorn = async () => {
    try {
      await axios.post(API_URL, unicorn);
      setUnicorn({ name: '', color: '', age: '' , power: ''});
      getUnicorns();
    } catch (err) {
      console.error('Error al crear unicornio', err);
    }
  };

  const deleteUnicorn = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getUnicorns();
    } catch (err) {
      console.error('Error al eliminar unicornio', err);
    }
  };

  const updateUnicorn = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, unicorn);
      setEditingId(null);
      setUnicorn({ name: '', color: '', age: '' , power: ''});
      getUnicorns();
    } catch (err) {
      console.error('Error al actualizar unicornio', err);
    }
  };

  const startEdit = (unic) => {
    setEditingId(unic._id);
    setUnicorn({ name: unic.name, color: unic.color, age: unic.age , power: unic.power});
  };

  return (
    <UnicornsView
      unicorn={unicorn}
      unicorns={unicorns}
      setUnicorn={setUnicorn}
      createUnicorn={createUnicorn}
      deleteUnicorn={deleteUnicorn}
      startEdit={startEdit}
      updateUnicorn={updateUnicorn}
      editingId={editingId}
    />
  );
};

export default UnicornsContainer;
