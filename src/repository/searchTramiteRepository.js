import { sequelize } from "../connection/connection.js";

export class SearchTramite {
    constructor() {
        this.name = sequelize
    }

    async searchTramite(search) {
        const query = `
            SELECT 
                tr.id_tramite,
                tr.nro_tramite,
                tr.id_dependencia,
                pt.personas_pers_id,
                pt.persona_tipo_pers_id,
                pt.personas_parroquia_parr_id,
                pt.personas_parr_muni_id,
                pt.personas_parr_muni_estado_id,
                p.pers_apellidos,
                p.pers_nombres,
                p.pers_cedula
            FROM 
                tramite_rangos tr
            INNER JOIN 
                personas_tramites pt ON tr.id_tramite = pt.tramites_tram_id
            INNER JOIN 
                personas p ON pt.personas_pers_id = p.pers_id
            WHERE 
                tr.nro_tramite::text ILIKE :searchParam 
                OR p.pers_apellidos ILIKE :searchParam 
                OR p.pers_nombres ILIKE :searchParam 
                OR p.pers_cedula ILIKE :searchParam
            ORDER BY 
                tr.nro_tramite
            LIMIT 10;
        `
        const data = await sequelize.query(query, {
            replacements: {
                searchParam: `%${search}%`
            },
            type: sequelize.QueryTypes.SELECT
        });

        return data 
    }
}