import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {

  try {
    const mongoURI = process.env.MONGODB_URI;

      console.log('🔍 Intentando conectar a MongoDB...');
      console.log('🔍 MONGODB_URI existe:', !!mongoURI);
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno');
    }

    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};