import { sequelize } from "../connection/connection.js";

export class GetRequeriments {
    constructor() {
        this.sequelize = sequelize
    }

    async requeriments(id_depencendia, id_area, id_servicio) {
        const query = `
            SELECT DISTINCT requ_id, requ_descripcion, requi_cantidad, requi_obligatorio 
            FROM depen_serv_requi
            JOIN requisitos ON requisitos_requ_id = requ_id
            WHERE depe_serv_depe_id =  ${id_depencendia} 
                AND depe_serv_id = ${id_servicio} 
                AND depe_servicios_area_id = ${id_area}
                AND requi_estatus = 'A';
        `
        const [data, ] = await this.sequelize.query(query)
        return data
    }
    
    async selectArea (id_depencendia) {
        const query = `SELECT DISTINCT(area_id), area_descripcion FROM areas, dependencias_servicios WHERE dependencias_depe_id = ${id_depencendia} AND servicios_areas_area_id = area_id ORDER BY area_descripcion;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async selectServicio (id_depencendia, id_area) {
        const query = `select serv_id, serv_descripcion from servicios, dependencias_servicios where dependencias_depe_id = ${id_depencendia} and servicios_areas_area_id = ${id_area} and servicios_serv_id = serv_id group by serv_id, serv_descripcion order by serv_descripcion;`
        const [data, ] = await this.sequelize.query(query)
        return data
    }

    async getReferidos() {
        const query = `SELECT * FROM procedencia`
        const [data, ] = await this.sequelize.query(query)
        return data
    }
}