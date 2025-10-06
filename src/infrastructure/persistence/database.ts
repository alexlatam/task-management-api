// src/infrastructure/data/data-source.ts
import 'reflect-metadata';
import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';
import {UserOrmEntity} from "./entities/UserOrmEntity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // ¡Muy importante en producción! Usa migraciones.
    logging: true, // Útil para ver las consultas SQL en la consola durante el desarrollo.
    entities: [UserOrmEntity], // Aquí le dices a TypeORM qué entidades usar.
    migrations: [__dirname + '/../data/migrations/*.ts'], // Ruta a tus migraciones.
});
