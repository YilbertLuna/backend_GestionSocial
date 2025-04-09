import { sequelize } from "../connection/connection.js";

export class SearchPersons {
    constructor() {
        this.sequelise = sequelize
    }

    async search(person) {
        const query = `SELECT p.pers_apellidos, p.pers_nombres, p.pers_cedula, p.tipo_persona_tipo_pers_id
            FROM personas p 
            WHERE
                p.pers_cedula::text LIKE :searchParam
                OR p.pers_nombres ILIKE :searchParam
                OR p.pers_apellidos ILIKE :searchParam
            LIMIT 10`
    
        const data = await sequelize.query(query, {
            replacements: {
                searchParam: `%${person}%`
            },
            type: sequelize.QueryTypes.SELECT
        });
        
        return data;
    }
}