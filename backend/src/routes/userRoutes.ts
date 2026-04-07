import { Router } from 'express';
import { 
  createUser, 
  //login, 
  updateUser,
  getAllUsers,
  getUserByUsername,
} from '../controllers/userController.js';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post('/register', createUser);
//router.post('/login', login);

// Rutas de administrador
router.get('/getAllUsers', getAllUsers);
//router.delete('/:id', deleteUser);


//NOTA IMPORTANTE: Las rutas que utilizan parámetros dinámicos deben ir al final para evitar conflictos con otras rutas.

// Rutas protegidas (requieren autenticación) - las implementaremos después
//router.get('/profile', getProfile);
router.put('/:username', updateUser);
router.get('/:username', getUserByUsername);

export default router;