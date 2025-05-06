import { sequelize } from "../connection/connection.js"

export class GetAplicantInforData {
    constructor() {
        this.sequelize = sequelize
    }

    async getDataPerson(aplicant) {
        const query = `
            SELECT
                p.pers_id,
                p.pers_apellidos,
                p.pers_nombres,
                p.pers_fec_nac,
                p.pers_cedula,
                p.pers_nacionalidad,
                p.pers_direccion,
                p.tipo_persona_tipo_pers_id,
                e.estado_id,
                e.estado_descripcion,
                m.muni_id,
                m.muni_descripcion,
                parr.parr_id,
                parr.parr_descripcion
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
                p.pers_cedula = '${aplicant}'
            ORDER BY p.tipo_persona_tipo_pers_id
            LIMIT 1;
        `
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getDataProcress(id_aplicant) {
        const query = `
           WITH tramites_persona AS (
                SELECT DISTINCT tr.id_tramite
                FROM tramite_rangos tr
                JOIN personas_tramites pt ON tr.id_tramite = pt.tramites_tram_id
                JOIN personas p ON pt.personas_pers_id = p.pers_id
                WHERE p.pers_cedula = '${id_aplicant}'
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
            ),
            info_tramites AS (
                SELECT
                    tr.id_tramite,
                    tr.nro_tramite,
                    tr.id_dependencia,
                    pt.personas_pers_id,
                    pt.persona_tipo_pers_id,
                    p.pers_apellidos,
                    p.pers_nombres,
                    p.pers_cedula,
                    p.pers_nacionalidad,
                    p.tipo_persona_tipo_pers_id,
                    d.depe_nombre,
                    t.tram_fecha_inicio,
                    t.tram_monto,
                    t.tram_descripcion,
                    st_stat.fecha AS status_fecha,
                    st_stat.stat_descripcion AS status_descripcion,
                    st_stat.status_stat_id AS status_id,  -- Columna agregada aquí
                    st_stat.status_observacion,
                    st.depe_serv_depe_id AS servicio_depe_id,
                    st.serv_descripcion,
                    st.area_descripcion,
                    st.serv_recurrencia,
                    st.areas_area_id,
                    st.serv_id
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
                            st.status_stat_id,  -- Columna agregada aquí
                            ROW_NUMBER() OVER (PARTITION BY st.tramites_tram_id ORDER BY st.status_stat_id DESC) AS rn
                        FROM
                            status_tramites st
                            JOIN status s ON st.status_stat_id = s.stat_id
                    ) st_stat ON tr.id_tramite = st_stat.tramites_tram_id AND st_stat.rn = 1
                WHERE pt.persona_tipo_pers_id = 2
            )
            SELECT 
                it.*,
                cronologia.fecha AS cronologia_fecha,
                cronologia.stat_descripcion AS cronologia_status,
                cronologia.usuarios_usua_cedula,
                u.usua_nombre AS usuario_nombre,
                dep.depe_nombre AS dependencia_nombre
            FROM 
                info_tramites it
                LEFT JOIN (
                    SELECT 
                        st.tramites_tram_id,
                        st.fecha,
                        s.stat_descripcion,
                        st.usuarios_usua_cedula,
                        st.status_observacion
                    FROM 
                        status_tramites st
                        JOIN status s ON st.status_stat_id = s.stat_id
                ) cronologia ON it.id_tramite = cronologia.tramites_tram_id
                LEFT JOIN usuarios u ON cronologia.usuarios_usua_cedula = u.usua_cedula
                LEFT JOIN dependencias dep ON it.id_dependencia = dep.depe_id
            ORDER BY 
                it.id_tramite, 
                cronologia.fecha;
        `
        const [data, ] = await this.sequelize.query(query)
        return data
    }
}