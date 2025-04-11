import { sequelize } from "../connection/connection.js";

export class ShowData {
    constructor() {
        this.sequelize = sequelize
    }

    async showProcess (id_process) {
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
                p.pers_cedula,
                d.depe_nombre, 
                t.tram_fecha_inicio,
                t.tram_monto,
                t.tram_descripcion,
                st_stat.fecha AS status_fecha,
                st_stat.stat_descripcion AS status_descripcion,
                st_stat.status_observacion
            FROM 
                tramite_rangos tr
                JOIN personas_tramites pt ON tr.id_tramite = pt.tramites_tram_id
                JOIN personas p ON pt.personas_pers_id = p.pers_id
                JOIN dependencias d ON d.depe_id = tr.id_dependencia
                JOIN tramites t ON tr.id_tramite = t.tram_id
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
                    WHERE 
                        st.tramites_tram_id = '${id_process}'
                ) st_stat ON tr.id_tramite = st_stat.tramites_tram_id AND st_stat.rn = 1
            WHERE 
                tr.id_tramite = '${id_process}'
            ORDER BY 
                pt.persona_tipo_pers_id;
        `
        const [data, ] = await sequelize.query(query)
        return data
    }
}