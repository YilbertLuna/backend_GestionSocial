import { sequelize } from "../connection/connection.js";

export class DataForPdf {
    constructor() {
        this.sequelize = sequelize
    }

    async getData(personId, tramiteId) {
        const query = `
            WITH tramites_persona AS (
                SELECT DISTINCT tr.id_tramite
                FROM tramite_rangos tr
                JOIN personas_tramites pt ON tr.id_tramite = pt.tramites_tram_id
                JOIN personas p ON pt.personas_pers_id = p.pers_id
                WHERE p.pers_id = '${personId}'  -- Parámetro ID persona
                AND tr.id_tramite = '${tramiteId}'  -- Parámetro ID trámite
            ),
            servicios_tramite AS (
                SELECT DISTINCT
                    dsrt.tramites_tram_id,
                    dsrt.depe_serv_depe_id,
                    s.serv_descripcion,
                    a.area_descripcion,
                    s.serv_recurrencia,
                    a.area_id AS areas_area_id,
                    s.serv_id
                FROM 
                    depen_serv_requi_tramites dsrt
                    JOIN servicios s ON dsrt.depe_serv_id = s.serv_id
                    JOIN areas a ON s.areas_area_id = a.area_id
            )
            SELECT
                tr.id_tramite,
                tr.nro_tramite,
                tr.id_dependencia,
                d.depe_nombre,
                pt.personas_pers_id,
                p.pers_id,
                p.pers_apellidos,
                p.pers_nombres,
                p.pers_cedula,
                p.pers_nacionalidad,
                p.tipo_persona_tipo_pers_id,
                t.tram_fecha_inicio,
                t.tram_monto,
                t.tram_descripcion,
                st_stat.fecha AS status_fecha,
                st_stat.stat_descripcion AS status_descripcion,
                st_stat.status_observacion,
                st.serv_id,
                st.serv_descripcion,
                st.areas_area_id,
                st.area_descripcion,
                st.serv_recurrencia
            FROM 
                tramites_persona tp
                JOIN tramite_rangos tr ON tp.id_tramite = tr.id_tramite
                JOIN personas_tramites pt ON tr.id_tramite = pt.tramites_tram_id
                JOIN personas p ON pt.personas_pers_id = p.pers_id
                JOIN dependencias d ON d.depe_id = tr.id_dependencia
                JOIN tramites t ON tr.id_tramite = t.tram_id
                LEFT JOIN servicios_tramite st ON t.tram_id = st.tramites_tram_id
                LEFT JOIN (
                    SELECT 
                        st.tramites_tram_id,
                        st.fecha,
                        s.stat_descripcion,
                        st.status_observacion,
                        ROW_NUMBER() OVER (PARTITION BY st.tramites_tram_id ORDER BY st.status_stat_id DESC) AS rn
                    FROM
                        status_tramites st
                        JOIN status s ON st.status_stat_id = s.stat_id
                ) st_stat ON tr.id_tramite = st_stat.tramites_tram_id AND st_stat.rn = 1
            ORDER BY 
                p.tipo_persona_tipo_pers_id;
        `
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getRequisitosConsignados(tramiteId) {
        const query = `
            SELECT
                * 
            FROM
                depen_serv_requi_tramites a,
                requisitos b 
            WHERE
                requisitos_requ_id=requ_id and tramites_tram_id=${tramiteId}
            ORDER BY requisitos_requ_id;
        `

        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getRequisitosNoConsignados(tramiteId) {
        const query = `
            WITH requisitos_consignados AS (
                SELECT DISTINCT requisitos_requ_id 
                FROM depen_serv_requi_tramites 
                WHERE tramites_tram_id = ${tramiteId}
            ),
            configuracion_tramite AS (
                SELECT DISTINCT
                    depe_serv_depe_id,
                    depe_serv_id,
                    servicios_area_id
                FROM depen_serv_requi_tramites
                WHERE tramites_tram_id = ${tramiteId}
            )
            SELECT DISTINCT
                r.requ_id,
                r.requ_descripcion,
                dsr.requi_obligatorio,
                dsr.requi_cantidad
            FROM 
                configuracion_tramite ct
            JOIN 
                depen_serv_requi dsr ON 
                    dsr.depe_serv_depe_id = ct.depe_serv_depe_id AND
                    dsr.depe_serv_id = ct.depe_serv_id AND
                    dsr.depe_servicios_area_id = ct.servicios_area_id
            JOIN 
                requisitos r ON dsr.requisitos_requ_id = r.requ_id
            WHERE 
                dsr.requi_estatus = 'A'
                AND NOT EXISTS (
                    SELECT 1 FROM requisitos_consignados rc 
                    WHERE rc.requisitos_requ_id = r.requ_id
                )
            ORDER BY 
                r.requ_id
        `
        const [data, ] = await this.sequelize.query(query)
        return data
    }
}