import { sequelize } from "../connection/connection.js";

export class DataPerson {
    constructor() {
        this.sequelize = sequelize;
    }

    async getDataPerson(personId) {
        const query = `
            SELECT
                p.*,
                e.*,
                m.*,
                parr.*
            FROM 
                personas p
            INNER JOIN 
                estado e ON e.estado_id = p.parroquia_municipio_estado_estado_id
            INNER JOIN 
                municipio m ON m.estado_estado_id = p.parroquia_municipio_estado_estado_id 
                        AND m.muni_id = p.parroquia_municipio_muni_id
            INNER JOIN 
                parroquia parr ON parr.municipio_estado_estado_id = p.parroquia_municipio_estado_estado_id
                            AND parr.municipio_muni_id = p.parroquia_municipio_muni_id
                            AND parr.parr_id = p.parroquia_parr_id
            WHERE 
                p.pers_id = :personId
            LIMIT 1;
        `;
        const [[data], ] = await this.sequelize.query(query, {
            replacements: { personId },
        });
        return data;
    }
}