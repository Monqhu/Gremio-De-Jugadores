import { useEffect, useState } from 'react';
import { getUsers, type User } from '../services/api';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data.users);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);  

  if (loading) {
    return <div className="users-page">Cargando usuarios...</div>;
  }  

  if (error) {
    return <div className="users-page error">{error}</div>;
  }  

  return(
    <>
      <div className="users-page">
        <h1>Lista de Usuarios</h1>
        <p>Total de usuarios: {users.length}</p>
        
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> <span className={`rol ${user.rol}`}>{user.rol}</span></p>
              <p className="date">
                Creado: {new Date(user.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          ))}
        </div>
      </div>      
    </>
  )
}

export default UsersPage;