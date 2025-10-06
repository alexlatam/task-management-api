"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // ¡Asegúrate de que esta sea la primera importación!
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./api/routes/userRoutes"));
//import taskRoutes from './api/routes/taskRoutes';
const database_1 = require("./infrastructure/persistence/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Health check endpoint
    app.use('/health', (req, res) => res.status(200).json({ status: 'OK' }));
    // app.use('/health', (req, res) => res.send('OK'));
    app.use('/users', userRoutes_1.default);
    //app.use('/tasks', taskRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
