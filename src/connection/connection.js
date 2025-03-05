import { Sequelize } from "sequelize";

var sequelize

export const connectionDatabase = async () => {
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5430,
        database: 'postgres-dev',
        username: 'admin',
        password: 'admin',
    })
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
}

export default sequelize;