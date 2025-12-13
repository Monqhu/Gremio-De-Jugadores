import { Router } from 'express';
import { 
  register, 
  //login, 
  //getProfile, 
  //updateProfile,
  getAllUsers,
  //
} from '../controllers/userController.js';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.post('/register', register);
//router.post('/login', login);

// Rutas protegidas (requieren autenticación) - las implementaremos después
//router.get('/profile', getProfile);
//router.put('/profile', updateProfile);

// Rutas de administrador
router.get('/', getAllUsers);
//router.delete('/:id', deleteUser);

export default router;