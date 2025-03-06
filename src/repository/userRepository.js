import { sequelize } from "../connection/connection.js";

export class userRepository {
  constructor(sequelize){
    this.sequelize = sequelize
  }

  async findUser(userLogin) {
    const query = `SELECT * FROM usuarios where usua_login='${userLogin}' and status='A'`;
    const [data, ] = await sequelize.query(query)
    return data
  }
}