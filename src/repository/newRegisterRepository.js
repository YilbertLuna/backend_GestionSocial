import { sequelize } from "../connection/connection.js";

export class NewRegisterRepository {
    constructor(){
        this.sequelize = sequelize;
    }

    async register({ beneficiario, req, processStatus, contact, originProcess, newNumberProcess,  aplicationData, dataAplicant, dataLocation, dependencia_id, cedula }) {
        let requisitosValues = '';
        if (req && req.length > 0) {
            req.forEach((requisito, index) => {
                requisitosValues += `( ${requisito.requ_id}, '${requisito.depe_id}', '${requisito.id_ayuda}', '${requisito.id_area}', (SELECT tram_id FROM a))`;
                if (index < req.length - 1) {
                    requisitosValues += ', ';
                }
            });
        }
    
        const requisitosInsert = req && req.length > 0 ? `
            , g AS (
                INSERT INTO depen_serv_requi_tramites (
                    requisitos_requ_id,
                    depe_serv_depe_id,
                    depe_serv_id,
                    servicios_area_id,
                    tramites_tram_id
                ) VALUES ${requisitosValues}
                RETURNING *
            )
        ` : '';

        const sqlStatement = `
            WITH a AS (
                INSERT INTO tramites (
                    tram_fecha_inicio,
                    tram_monto,
                    tram_descripcion,
                    usua_cedula
                ) VALUES (
                    NOW(),
                    ${aplicationData.monto},
                    '${aplicationData.description}',
                    '${cedula}'
                )
                RETURNING *
            ), b AS (
                INSERT INTO personas (
                    pers_apellidos,
                    pers_nombres,
                    pers_cedula,
                    pers_direccion,
                    parroquia_parr_id,
                    parroquia_municipio_muni_id,
                    parroquia_municipio_estado_estado_id,
                    tipo_persona_tipo_pers_id,
                    pers_fec_nac,
                    pers_nacionalidad
                )
                VALUES (
                    '${dataAplicant.pers_apellidos}',
                    '${dataAplicant.pers_nombres}',
                    '${dataAplicant.pers_cedula}',
                    '${dataLocation.Direccion}',
                    ${dataLocation.parroquia_id},
                    ${dataLocation.municipio_id},
                    ${dataLocation.estado_id},
                    1,
                    '${dataAplicant.pers_fec_nac}',
                    '${dataAplicant.pers_document}'
                )
                RETURNING *
            ), c AS (
                INSERT INTO personas_tramites (
                    personas_pers_id,
                    persona_tipo_pers_id,
                    tramites_tram_id,
                    personas_parroquia_parr_id,
                    personas_parr_muni_id,
                    personas_parr_muni_estado_id
                ) VALUES (
                    (SELECT pers_id FROM b), 
                    (SELECT tipo_persona_tipo_pers_id FROM b),
                    (SELECT tram_id FROM a),
                    (SELECT parroquia_parr_id FROM b),
                    (SELECT parroquia_municipio_muni_id FROM b),
                    (SELECT parroquia_municipio_estado_estado_id FROM b)
                )
                RETURNING *
            ), d AS (
                INSERT INTO tramite_procedencia (
                tram_id,
                id_procedencia
                ) VALUES (
                    (SELECT tram_id FROM a),
                    ${originProcess}
                )
            ), e AS (
                INSERT INTO tramite_rangos (
                    id_tramite,
                    nro_tramite,
                    id_dependencia
                ) VALUES (
                    (SELECT tram_id FROM a),
                    '${newNumberProcess}',
                    ${dependencia_id} 
                )
            ), f AS (
                INSERT INTO contacto_persona (
                    cont_id,
                    cont_descripcion,
                    tipos_contacto_tipo_id,
                    personas_pers_id
                ) VALUES (
                    ${contact.newId},
                    '${contact.contactPerson}',
                    ${contact.contactType},
                    (SELECT pers_id FROM b)
                    
                )
                RETURNING *
            ) ${requisitosInsert}
            , h AS (
                INSERT INTO status_tramites VALUES (
                    (SELECT tram_id FROM a),
                    NOW(),
                    ${processStatus.status},
                    '${cedula}',
                    '',
                    0
                )
                RETURNING *
            ), i AS (
                -- beneficiario
                INSERT INTO personas (
                    pers_apellidos,
                    pers_nombres,
                    pers_cedula,
                    pers_direccion,
                    parroquia_parr_id,
                    parroquia_municipio_muni_id,
                    parroquia_municipio_estado_estado_id,
                    tipo_persona_tipo_pers_id,
                    pers_fec_nac,
                    pers_nacionalidad
                ) VALUES (
                    '${beneficiario.benf_apellidos}',
                    '${beneficiario.benf_nombres}',
                    '${beneficiario.benf_cedula}',
                    '${beneficiario.benf_direccion}',
                    ${beneficiario.benf_parroquia_id},
                    ${beneficiario.benf_municipio_id},
                    ${beneficiario.benf_estado_id},
                    2,
                    '${beneficiario.benf_fec_nac}',
                    '${beneficiario.benf_document}'
                )
                RETURNING *
            ), j AS (
                INSERT INTO personas_tramites VALUES (
                    (SELECT pers_id FROM i),
                    2,
                    (SELECT tram_id FROM a),
                    (SELECT parroquia_parr_id FROM i),
                    (SELECT parroquia_municipio_muni_id FROM i),
                    (SELECT parroquia_municipio_estado_estado_id FROM i)
                )
                RETURNING *
            )
            SELECT * FROM j;
        `;
        const [data, ] = await sequelize.query(sqlStatement);
        return data
    }

    async findPerson(pers_cedula) {
        const findPersonQuery = `
        SELECT
            p.pers_cedula,
            p.tipo_persona_tipo_pers_id,
            pt.tramites_tram_id,
            tr.*
        FROM
            personas p
        INNER JOIN
            personas_tramites pt ON p.pers_id = pt.personas_pers_id
        INNER JOIN
            tramite_rangos tr ON pt.tramites_tram_id = tr.id_tramite
        WHERE
            p.pers_cedula = '${pers_cedula}'
        limit 1;`
        const [data, ] = await sequelize.query(findPersonQuery)
        return data
    }

    async lastIdContactPersons () {
        const query = `SELECT MAX(cont_id) FROM contacto_persona;`
        const [[data], ] = await sequelize.query(query)
        return data.max
    }

    async insertRequeriments (array) {
        const query = `INSERT INTO depen_serv_requi_tramites (requisitos_requ_id, depe_serv_depe_id, depe_serv_id, servicios_area_id, tramites_tram_id) VALUES ();`
        const [data, ] = await sequelize.query(query)
        return data
    }

    async rangeDependence (id_dependencia) {
        const query = `
            SELECT max(rango_final),rango_inicial
            FROM rangos WHERE id_dependencia = ${id_dependencia}
            GROUP BY rango_inicial
        `
        const [[data], ] = await sequelize.query(query)
        return data
    }

    async lastCodeProcess(dependenceId){
        // vemos si la dependencia tiene rango
        const dependenceRangeQuery = `
            SELECT tr.nro_tramite
            FROM tramite_rangos tr
            WHERE tr.id_tramite = (
                SELECT MAX(tr2.id_tramite)
                FROM tramite_rangos tr2
                WHERE tr2.id_dependencia = ${dependenceId}
            )
        `;
        
        const [[dataRange], ] = await sequelize.query(dependenceRangeQuery);
        return dataRange
    }

    async FindIdProcedencia(procedencia) {
        const findIdProcedenciaQuery = `SELECT id_procedencia FROM procedencia WHERE procedencia = '${procedencia}'`;
        const [[data, ], ] = await sequelize.query(findIdProcedenciaQuery)
        return data.id_procedencia
    }
}