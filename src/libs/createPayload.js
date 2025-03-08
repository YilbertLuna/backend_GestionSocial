export function createPayload(payload) {
    const dataPayload = {
        nombre: payload[0].usua_nombre,
        cedula: payload[0].usua_cedula,
        dependencia_id: payload[0].dependencias_depe_id,
        dependencia_nombre: payload[0].depe_nombre,
        cts: payload[0].usua_cts,
        permisos: payload.map(({permi_id}) => permi_id),
        modulos: payload.map(({modulos_modu_id}) => modulos_modu_id)
    }
    
    return dataPayload
}