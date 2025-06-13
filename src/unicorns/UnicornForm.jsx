import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUnicornContext } from '../context/UnicornContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import classNames from 'classnames';

// Esquema de validación con Yup
const UnicornSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Requerido'),
  color: Yup.string()
    .required('Requerido'),
  age: Yup.number()
    .min(0, 'La edad no puede ser negativa')
    .max(1000, 'Edad poco realista para un unicornio')
    .required('Requerido')
    .integer('Debe ser un número entero'),
  power: Yup.string()
    .required('Requerido')
});

export const UnicornForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createUnicorn, editUnicorn, getUnicornById } = useUnicornContext();
  const toast = useRef(null);
  const isEditing = !!id;

  // Mostrar mensajes de error
  const showError = (message) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await editUnicorn(id, values);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Unicornio actualizado correctamente',
          life: 3000
        });
      } else {
        await createUnicorn(values);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Unicornio creado correctamente',
          life: 3000
        });
      }
      navigate('/unicornios');
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>{isEditing ? 'Editar Unicornio' : 'Crear Nuevo Unicornio'}</h2>
      
      <Formik
        initialValues={{
          name: '',
          color: '',
          age: '',
          power: ''
        }}
        validationSchema={UnicornSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty
        }) => (
          <form onSubmit={handleSubmit} className="p-fluid grid formgrid">
            <div className="field col-12 md:col-6">
              <label htmlFor="name">Nombre</label>
              <InputText
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  'p-invalid': errors.name && touched.name
                })}
              />
              {errors.name && touched.name && (
                <small className="p-error">{errors.name}</small>
              )}
            </div>

            <div className="field col-12 md:col-6">
              <label htmlFor="color">Color</label>
              <InputText
                id="color"
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  'p-invalid': errors.color && touched.color
                })}
              />
              {errors.color && touched.color && (
                <small className="p-error">{errors.color}</small>
              )}
            </div>

            <div className="field col-12 md:col-6">
              <label htmlFor="age">Edad</label>
              <InputText
                id="age"
                name="age"
                type="number"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  'p-invalid': errors.age && touched.age
                })}
              />
              {errors.age && touched.age && (
                <small className="p-error">{errors.age}</small>
              )}
            </div>

            <div className="field col-12 md:col-6">
              <label htmlFor="power">Poder Mágico</label>
              <InputText
                id="power"
                name="power"
                value={values.power}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames({
                  'p-invalid': errors.power && touched.power
                })}
              />
              {errors.power && touched.power && (
                <small className="p-error">{errors.power}</small>
              )}
            </div>

            <div className="field col-12 flex gap-3">
              <Button
                type="submit"
                label={isEditing ? "Actualizar" : "Crear"}
                icon={isEditing ? "pi pi-check" : "pi pi-plus"}
                className="p-button-success"
                disabled={!isValid || !dirty || isSubmitting}
                loading={isSubmitting}
              />
              <Button
                type="button"
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-secondary"
                onClick={() => navigate('/unicornios')}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
