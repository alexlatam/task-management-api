import 'reflect-metadata';
import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';
import {UserOrmEntity} from "../users/infrastructure/persistence/entities/UserOrmEntity";
import {TaskOrmEntity} from "../tasks/infrastructure/persistence/entities/TaskOrmEntity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [UserOrmEntity, TaskOrmEntity], // here the typerorm entities(models)
    migrations: [__dirname + '/migrations/*.ts'], // path to migrations
});
