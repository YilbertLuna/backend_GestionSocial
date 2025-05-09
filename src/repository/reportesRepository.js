import { sequelize } from "../connection/connection.js";

export class Reportes {
    constructor() {
        this.sequelize = sequelize;
    }

    async ListProcessApproved(depe_id, pageSize, offset) {
        const query = `
            SELECT 
                q1.tram_id, 
                q1.pers_cedula, 
                q1.pers_nombres, 
                q1.pers_apellidos, 
                q1.pers_direccion, 
                q1.muni_descripcion, 
                q1.parr_descripcion, 
                q1.tram_monto,  
                q1.stat_descripcion, 
                q1.max_fecha, 
                q1.depe_nombre AS dependencia_nombre, 
                q1.monto_aprobado, 
                q1.nro_tramite,
                q2.serv_descripcion,
                q2.area_descripcion,
                COUNT(*) OVER() AS total_records -- Calcula el total de registros
            FROM (
                SELECT 
                    DISTINCT(tram_id), 
                    pers_cedula, 
                    pers_nombres, 
                    pers_apellidos, 
                    pers_direccion, 
                    muni_descripcion, 
                    parr_descripcion, 
                    tram_monto,  
                    stat_descripcion, 
                    MAX(fecha) as max_fecha, 
                    depe_nombre, 
                    monto_aprobado, 
                    nro_tramite,
                    depe_id
                FROM tramites, personas_tramites a, personas, parroquia, municipio, estado,
                    status_tramites b, status, depen_serv_requi_tramites c, dependencias, tramite_rangos
                WHERE 
                    tram_id = a.tramites_tram_id
                    AND personas_pers_id = pers_id
                    AND personas_parroquia_parr_id = parroquia_parr_id
                    AND parroquia_parr_id = parr_id
                    AND parroquia_municipio_muni_id = municipio_muni_id
                    AND personas_parr_muni_id = parroquia_municipio_muni_id
                    AND municipio_muni_id = muni_id
                    AND parroquia_municipio_estado_estado_id = municipio_estado_estado_id		
                    AND municipio_estado_estado_id = estado_estado_id
                    AND estado_estado_id = estado_id
                    AND b.tramites_tram_id = tram_id
                    AND status_stat_id = stat_id							
                    AND tipo_persona_tipo_pers_id = 2
                    AND stat_id = 7
                    AND c.tramites_tram_id = tram_id
                    AND depe_serv_depe_id = depe_id
                    AND depe_id = ${depe_id}
                    AND id_tramite = tram_id
                    AND tram_id NOT IN (SELECT tramites_tram_id FROM listas_tramites)
                GROUP BY 
                    tram_id, pers_cedula, pers_nombres, pers_apellidos, muni_descripcion,
                    parr_descripcion, tram_monto, stat_descripcion, pers_direccion, 
                    depe_nombre, monto_aprobado, nro_tramite, depe_id
            ) q1
            INNER JOIN (
                SELECT 
                    DISTINCT ON (tramites_tram_id) tramites_tram_id AS tram_id,
                    depe_id, 
                    serv_descripcion, 
                    area_descripcion
                FROM 
                    tramites
                INNER JOIN depen_serv_requi_tramites ON tram_id = tramites_tram_id
                INNER JOIN dependencias ON depe_serv_depe_id = depe_id
                INNER JOIN servicios ON depe_serv_id = serv_id
                INNER JOIN areas ON servicios_area_id = area_id
                ORDER BY tramites_tram_id, depe_id
            ) q2
            ON q1.tram_id = q2.tram_id
            ORDER BY q1.max_fecha DESC
            LIMIT ${pageSize} OFFSET ${offset};
        `;

        const [data] = await this.sequelize.query(query);
        return data;
    }
}