import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bienvenido a la App</h1>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/unicornios">
          <button style={{ margin: '1rem' }}>Ir a Unicornios</button>
        </Link>
        <Link to="/productos">
          <button style={{ margin: '1rem' }}>Ir a Productos</button>
        </Link>
      </div>
    </div>
  );
}