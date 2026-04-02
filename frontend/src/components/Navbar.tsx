import { Link } from 'react-router-dom';
import logo from '../../multimedia/images/logo.png';

function Navbar() {
  return (
    <nav 
      style={{ 
        padding: '1rem', 
        backgroundColor: '#333', 
        display: 'flex',
        gap:'1rem',
      }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={logo} 
          alt="logo"
          style={{
            borderRadius: '100%',
            aspectRatio: '1/1',
            width: '3dvw', // Usa un tamaño fijo en píxeles
          }}
        />
        <h2 style={{ margin: 0 }}>Gremio de Jugadores</h2>
      </div>

      <div>
        <ul 
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            listStyle: 'none' 
          }}>
          <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Inicio</Link></li>
          <li><Link to="/users" style={{color: 'white', textDecoration: 'none'}}>Usuarios</Link></li>
          <li><Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link></li>
          <li><Link to="/register" style={{color: 'white', textDecoration: 'none'}}>Registro</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;