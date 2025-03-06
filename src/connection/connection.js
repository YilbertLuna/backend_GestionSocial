import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5430,
    database: 'postgres-dev',
    username: 'admin',
    password: 'admin',
})