import { sequelize } from "../connection/connection.js";

export class UserRepository {
  constructor(sequelize){
    this.sequelize = sequelize
  }

  async getData(username) {
    const query = `
      SELECT usuarios.*,
        permisos.*,
        dependencias.depe_nombre
      FROM usuarios
      INNER JOIN permisos ON usuarios.usua_cedula = permisos.usuarios_usua_cedula
      inner join dependencias ON usuarios.dependencias_depe_id = dependencias.depe_id
      WHERE 
        usuarios.usua_login = '${username}'
        AND usuarios.status = 'A'
        AND permisos.estatus = 'A'
      ORDER BY 
        permisos.modulos_modu_id;
    `
    const [data, ] = await sequelize.query(query)
    return data
  }
}