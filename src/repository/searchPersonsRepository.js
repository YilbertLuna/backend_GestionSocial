import { sequelize } from "../connection/connection.js";

export class SearchPersons {
    constructor() {
        this.sequelise = sequelize
    }

    async search ({ cedula, nombre }) {
        const query = `SELECT p.pers_apellidos, p.pers_nombres, p.pers_cedula, p.tipo_persona_tipo_pers_id
            FROM personas p 
            WHERE
                p.pers_cedula::text LIKE '${cedula}'
                OR p.pers_nombres ILIKE  '${nombre}'
                OR p.pers_apellidos ILIKE '${nombre}'
            LIMIT 10`

        const [data, ] = await sequelize.query(query)
        return data
    }
}