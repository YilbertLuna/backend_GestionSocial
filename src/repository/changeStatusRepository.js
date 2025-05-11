import { sequelize } from "../connection/connection.js"

export class ChangeStatus {
    constructor() {
        this.sequelize = sequelize
    }

    async selectStatus() {
        const query = `SELECT stat_id, stat_descripcion FROM status ORDER BY stat_id;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async changeStatus({ id_process, id_new_status, cedula, status_observation, tram_monto }) {
        const columns = ['tramites_tram_id', 'fecha', 'status_stat_id', 'usuarios_usua_cedula', 'status_observacion'];
        const values = [`${id_process}`, 'now()', `${id_new_status}`, `'${cedula}'`, `'${status_observation}'`];
    
        if (tram_monto) {
            columns.push('monto_aprobado');
            values.push(`${tram_monto}`);
        }
    
        const query = `
            INSERT INTO status_tramites (${columns.join(', ')})
            VALUES (${values.join(', ')});
        `;
    
        const [data, ] = await this.sequelize.query(query);
        return data;
    }
}