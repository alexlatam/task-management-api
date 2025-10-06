import 'reflect-metadata'; // ¡Asegúrate de que esta sea la primera importación!
import express from 'express';
import userRoutes from './api/routes/userRoutes';
//import taskRoutes from './api/routes/taskRoutes';
import { AppDataSource } from './infrastructure/persistence/database';

import dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const app = express();
    app.use(express.json());

    // Health check endpoint
    app.use('/health', (req, res) => res.status(200).json({ status: 'OK' }));

    // app.use('/health', (req, res) => res.send('OK'));
    app.use('/users', userRoutes);
    //app.use('/tasks', taskRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Error during Data Source initialization:', err);
  });


