import 'reflect-metadata'; // ¡Asegúrate de que esta sea la primera importación!
import express from 'express';
import userRoutes from './users/infrastructure/routes/userRoutes';
import taskRoutes from './tasks/infrastructure/routes/taskRoutes';
import {AppDataSource} from './data/database';

import dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        const app = express();
        app.use(express.json());

        // cors
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }
            next();
        });

        // Health check endpoint
        app.use('/health', (req, res) => res.status(200).json({status: 'OK'}));

        app.use('/users', userRoutes);
        app.use('/tasks', taskRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: unknown) => {
        console.error('Error during Data Source initialization:', err);
    });


