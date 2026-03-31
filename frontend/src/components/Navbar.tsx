import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: '#333', 
      color: 'white' 
    }}>
      <h2>Gremio de Jugadores</h2>
      <ul style={{ 
        display: 'flex', 
        gap: '1rem', 
        listStyle: 'none' 
      }}>
        <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Inicio</Link></li>
        <li><Link to="/users" style={{color: 'white', textDecoration: 'none'}}>Usuarios</Link></li>
        <li><Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link></li>
        <li><Link to="/register" style={{color: 'white', textDecoration: 'none'}}>Registro</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;