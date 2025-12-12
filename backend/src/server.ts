import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js'; 
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend funcionando correctamente!' });
});

//Rutas de la aplicación
app.use('/api', routes);

//Conectar a la BBDD y levantar el servidor
const startServer = async() => {
  try{
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    })
  }catch(e){
    console.error('Error al iniciar el servidor:', e);
    process.exit(1);
  }
}

startServer();