import { sequelize } from "../connection/connection.js";

export class UpdateProcessRepository {
    constructor() {
        this.sequelize = sequelize;
    }

    async uptadeProcessInsertRequeriments({req, processStatus, id_tramite}) {
        let requisitosValues = '';
        if (req && req.length > 0) {
            req.forEach((requisito, index) => {
                requisitosValues += `( ${requisito.requ_id}, '${requisito.depe_id}', '${requisito.serv_id}', '${requisito.id_area}', ${id_tramite})`;
                if (index < req.length - 1) {
                    requisitosValues += ', ';
                }
            });
        }
        const requisitosInsert = req && req.length > 0 ? `INSERT INTO depen_serv_requi_tramites (
                requisitos_requ_id,
                depe_serv_depe_id,
                depe_serv_id,
                servicios_area_id,
                tramites_tram_id
            ) VALUES ${requisitosValues}
            RETURNING *
        ` : '';
        const query = `
            WITH a AS (
                ${requisitosInsert}
            ), b As (
                UPDATE status_tramites SET status_stat_id = ${processStatus.status} WHERE tramites_tram_id = ${id_tramite}
                RETURNING *
            )
            SELECT * FROM b;
        `
        const data = await this.sequelize.query(query)
        return data;
    }
}