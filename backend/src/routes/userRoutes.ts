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

// Rutas protegidas (requieren autenticación) - las implementaremos después
//router.get('/profile', getProfile);
router.put('/:username', updateUser);
router.get('/:username', getUserByUsername);

// Rutas de administrador
router.get('/', getAllUsers);
//router.delete('/:id', deleteUser);

export default router;