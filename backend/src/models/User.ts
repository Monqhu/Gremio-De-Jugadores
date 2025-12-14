import mongoose, { type Document, Schema } from 'mongoose';
import {z} from 'zod';
import bcrypt from 'bcrypt';

//Schema de validación con zod
export const userValidationSchema = z.object({
  username: z
  .string()
  .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
  .max(20, "El nombre de usuario no puede tener más de 20 caracteres")
  .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos")
  .trim(),

  email: z
  .email("Por favor introduce un correo electrónico válido")
  .toLowerCase()
  .trim(),

  password: z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(50, "La contraseña no puede exceder los 50 caracteres")
  .trim()
  .refine((val) => val.length > 0, {
    message: 'La contraseña no puede estar vacía'
  }),

  rol: z
  .enum(['admin', 'user'])
  .default('user')
})

export const updateUserProfileSchema = z.object({
  username: z
  .string()
  .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
  .max(20, "El nombre de usuario no puede tener más de 20 caracteres")
  .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos")
  .trim()
  .optional(),

  email: z
  .email("Por favor introduce un correo electrónico válido")
  .toLowerCase()
  .trim()
  .optional(),

  password: z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(50, "La contraseña no puede exceder los 50 caracteres")
  .trim()
  .refine((val) => val.length > 0, {
    message: 'La contraseña no puede estar vacía'
  })
  .optional()

  //Aseguramos que al menos un campo esté modificado
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "Debes proporcionar al menos un campo para actualizar" }
);



// Tipos TypeScript inferidos automáticamente desde Zod
export type UserInput = z.infer<typeof userValidationSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;


//Interfaz para los documentos en MongoDB
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  rol: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

//Schema de Mongoose
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true
  }
},
{
  timestamps: true
})

// Middleware para hashear la contraseña ANTES de guardar
userSchema.pre('save', async function() {
  
  // Solo hashear si la contraseña fue modificada (o es nueva)
  if (!this.isModified('password')) {
    return;
  }

  try {
    // Generar salt y hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
});

// Método para comparar contraseñas (útil para login)
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);