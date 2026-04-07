const API_URL = import.meta.env.VITE_API_URL; //CAMBIAR ESTO POR LA URL DE TU BACKEND

export interface User {
  _id: string;
  username: string;
  email: string;
  rol: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  message: string;
  count: number;
  users: User[];
}

export const getUsers = async (): Promise<GetUsersResponse> => {
  const response = await fetch(`${API_URL}/users/getAllUsers`);
  
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  
  return response.json();
};