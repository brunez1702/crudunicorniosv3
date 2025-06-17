import { useEffect } from 'react';
import { useUnicornContext } from '../context/UnicornContext';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import "jspdf-autotable"

export const UnicornsView = () => {
  const { 
    unicorns, 
    getUnicorns, 
    deleteUnicorn,
    error 
  } = useUnicornContext();
  
  const toast = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUnicorns();
      } catch (err) {
        showError(err.message);
      }
    };
    
    fetchData();
  }, []);

  const showError = (message) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUnicorn(id);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Unicornio eliminado correctamente',
        life: 3000
      });
    } catch (err) {
      showError(err.message);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Unicornios", 14, 10);

    const tableColumn = ["Nombre", "Color", "Poder", "Edad"];
    const tableRows = unicorns.map(({ name, color, power, age }) => [
      name,
      color,
      power,
      age,
    ]);
   
    doc.save("unicorns.pdf");
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Unicornios 🦄</h2>
        <button onClick={exportToPDF} className="btn btn-success mb-3">
        Exportar PDF
      </button>
        <Link to="/unicornios/crear">
          <Button 
            label="Crear Unicornio" 
            icon="pi pi-plus" 
            className="p-button-success" 
          />
        </Link>
      </div>
      

      <DataTable 
        value={unicorns} 
        tableStyle={{ minWidth: '50rem' }}
        loading={unicorns === null}
        emptyMessage="No se encontraron unicornios"
      >
        <Column field="name" header="Nombre" sortable />
        <Column field="color" header="Color" sortable />
        <Column field="age" header="Edad" sortable />
        <Column field="power" header="Poder" sortable />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div className="flex gap-2">
              <Link to={`/unicornios/editar/${rowData._id}`}>
                <Button 
                  icon="pi pi-pencil" 
                  className="p-button-warning" 
                  style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', color: 'white' }}
                />
              </Link>
              
              <Button 
                icon="pi pi-trash" 
                className="p-button-danger" 
                style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' }}
                onClick={() => handleDelete(rowData._id)} 
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};
