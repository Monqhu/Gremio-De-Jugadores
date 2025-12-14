import { type Request, type Response } from 'express';
import { User, userValidationSchema,updateUserProfileSchema } from '../models/User.js';
import { z } from 'zod';

export const createUser = async(req: Request, res: Response): Promise<void> => {
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

    //En caso de existir el usuario el código acaba dentro del 'if'
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

export const getAllUsers = async(req: Request, res: Response): Promise<void> => {
  try{
    const users = await User.find().select('-password'); //Excluir la contraseña

    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      count: users.length,
      users
    });
  } catch(error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      message: 'Error al obtener usuarios' 
    });
  }
}

export const getUserByUsername = async(req: Request, res: Response): Promise<void> => {
  try{
    const {username} = req.params;

    // Verificar que username existe, si no ponemos este paso la constante 'user' más abajo se buggea porque typescript no entiende bien el tipado de username
    if(!username){
      res.status(400).json({message: "Debes introducir un nombre de usuario"});
      return;
    }

    //Recuperar el usuario de la base de datos excluyendo la contraseña
    const user = await User.findOne({ username }).select('-password');

    if(!user){
      res.status(404).json({message: "Usuario no encontrado"})
      return;
    }

    res.status(200).json({
      message: "Usuario obtenido correctamente",
      user
    })
  } catch(error){
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
      message: 'Error al obtener usuario' 
    });
  }
}

export const updateUser = async(req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({ 
        message: 'El username es requerido' 
      });
      return;
    }

    // Validar datos con Zod (esto automáticamente ignora el campo 'rol' si viene)
    const validatedData = updateUserProfileSchema.parse(req.body);

    // Buscar el usuario
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ 
        message: 'Usuario no encontrado' 
      });
      return;
    }

    // Verificar si el nuevo username ya existe (si se está actualizando)
    if (validatedData.username && validatedData.username !== username) {
      const existingUser = await User.findOne({ username: validatedData.username });
      if (existingUser) {
        res.status(400).json({ 
          message: 'El nombre de usuario ya está en uso' 
        });
        return;
      }
    }

    // Verificar si el nuevo email ya existe (si se está actualizando)
    if (validatedData.email && validatedData.email !== user.email) {
      const existingEmail = await User.findOne({ email: validatedData.email });
      if (existingEmail) {
        res.status(400).json({ 
          message: 'El email ya está en uso' 
        });
        return;
      }
    }

    // Actualizar solo los campos que vienen en validatedData
    if (validatedData.username) {
      user.username = validatedData.username;
    }
    
    if (validatedData.email) {
      user.email = validatedData.email;
    }
    
    if (validatedData.password) {
      user.password = validatedData.password; // Se hasheará automáticamente
    }

    // Guardar cambios
    await user.save();

    // Respuesta sin contraseña
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      rol: user.rol,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      message: 'Usuario actualizado exitosamente',
      user: userResponse
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        message: 'Errores de validación',
        errors: error.issues
      });
      return;
    }
    
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ 
      message: 'Error al actualizar usuario' 
    });
  }




}




