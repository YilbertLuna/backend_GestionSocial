import { Sequelize } from "sequelize";
import "dotenv/config"

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})