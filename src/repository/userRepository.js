import { sequelize } from "../connection/connection.js";

export class UserRepository {
  constructor(sequelize){
    this.sequelize = sequelize
  }

  async findUser(userLogin) {
    const query = `SELECT * FROM usuarios where usua_login='${userLogin}' and status='A'`;
    const [data, ] = await sequelize.query(query)
    return data
  }

  async findDependence(userId) {
    console.log(userId)
    const query = `select * from permisos where usuarios_usua_cedula = '${userId}' and estatus='A'`;
    const [data, ] = await sequelize.query(query)
    return data
  }
}