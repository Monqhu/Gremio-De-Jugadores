import { type Request, type Response } from 'express';
import { User, userValidationSchema } from '../models/User.js';
import { z } from 'zod';

export const register = async(req: Request, res: Response): Promise<void> => {
  try {
    //Validar los datos con el schema de Zod
    const validatedData = userValidationSchema.parse(req.body);

    //Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [
        { username: validatedData.username },
        { email: validatedData.email }
      ]
    })

    if(existingUser) {
      res.status(400).json({message: 'El nombre de usuario o el email ya están en uso'});
      return;
    }

    //Creación del nuevo usuario
    const user = await User.create(validatedData);

    //Devolvemos respuesta sin la contraseña
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      rol: user.rol,
      createdAt: user.createdAt
    }

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: userResponse
    });
  } catch(error) {
    if(error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Errores de validación',
        errors: error.issues //error.errors daba problemas de tipado con zod, así que usaremos issues
      });
      return;
    }

    console.error('Error en el registro de usuario:', error);
    res.status(500).json({message: 'Error al registrar el usuario'});


  }
}