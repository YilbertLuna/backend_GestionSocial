import { sequelize } from "../connection/connection.js";

export class GetLocation {
    constructor() {
        this.sequelize = sequelize
    }

    async getEstado() {
        const query = `SELECT * FROM estado ORDER BY estado_descripcion;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getMunicipio(id_estado) {
        const query = `SELECT * FROM municipio WHERE estado_estado_id=${id_estado} ORDER BY muni_descripcion;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getParroquia(id_municipio, id_estado) {
        const query = `SELECT * FROM parroquia WHERE municipio_estado_estado_id=${id_estado} AND municipio_muni_id=${id_municipio} ORDER BY parr_descripcion;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }
}