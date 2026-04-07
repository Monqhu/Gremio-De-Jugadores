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
            width: '2dvw',
          }}
        />
        <h2 style={{ margin: 0 }}>Gremio de Jugadores</h2>
      </div>

      <div style={{
          width: '100%',
          margin: 'auto',
        }}>
        <ul 
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            listStyle: 'none',
            justifyContent: 'space-evenly', 
          }}>
          <li><Link to="/" style={{color: 'white', textDecoration: 'none'}}>Inicio</Link></li>
          <li><Link to="/users" style={{color: 'white', textDecoration: 'none'}}>Usuarios (elimiar este apartado al acabar los CRUDs de usuario)</Link></li>
          <li><Link to="/bookings" style={{color: 'white', textDecoration: 'none'}}>Reservas</Link></li>
          <li><Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;