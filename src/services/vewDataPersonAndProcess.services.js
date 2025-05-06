import { GetAplicantInforData } from "../repository/getAplicantInfoData.js";
import { decodeEntities } from "../utils/decodeEntitis.js";
const getData = new GetAplicantInforData()

export const vewDataPersonAndProcess = async (person) => {
    const dataPerson = await getData.getDataPerson(person)
    const process = await getData.getDataProcress(person)

    const decodeHelpProcess = process.map(data => ({
      ...data,
      serv_descripcion: data.serv_descripcion 
          ? decodeEntities(data.serv_descripcion) 
          : data.serv_descripcion
  }));

  const dataProcess = transformarTramites(decodeHelpProcess);
  const data = {
      dataPerson: dataPerson,
      dataProcess: dataProcess
  };
  return data;
}

function transformarTramites(datosOriginales) {
    // Objeto para agrupar los trámites por id_tramite
    const tramitesAgrupados = {};
  
    // Recorremos todos los registros originales
    datosOriginales.forEach(registro => {
      const idTramite = registro.id_tramite;
  
      // Si el trámite no existe en el objeto, lo creamos
      if (!tramitesAgrupados[idTramite]) {
        tramitesAgrupados[idTramite] = {
            id_tramite: idTramite,
            nro_tramite: registro.nro_tramite,
            id_dependencia: registro.id_dependencia,
            personas_pers_id: registro.personas_pers_id,
            persona_tipo_pers_id: registro.persona_tipo_pers_id,
            pers_apellidos: registro.pers_apellidos,
            pers_nombres: registro.pers_nombres,
            pers_cedula: registro.pers_cedula,
            pers_nacionalidad: registro.pers_nacionalidad,
            tipo_persona_tipo_pers_id: registro.tipo_persona_tipo_pers_id,
            depe_nombre: registro.depe_nombre,
            tram_fecha_inicio: registro.tram_fecha_inicio,
            tram_monto: registro.tram_monto,
            tram_descripcion: registro.tram_descripcion,
            status_fecha: registro.status_fecha,
            status_id: registro.status_id,
            status_descripcion: registro.status_descripcion,
            status_observacion: registro.status_observacion,
            serv_descripcion: registro.serv_descripcion,
            area_descripcion: registro.area_descripcion,
            cronologia: [] // Inicializamos el array de cronología vacío
        };
      }
  
      // Añadimos el registro de cronología al trámite correspondiente
      tramitesAgrupados[idTramite].cronologia.push({
        cronologia_fecha: registro.cronologia_fecha,
        cronologia_status: registro.cronologia_status,
        usuarios_usua_cedula: registro.usuarios_usua_cedula,
        usuario_nombre: registro.usuario_nombre,
        dependencia_nombre: registro.dependencia_nombre        
      });
    });

    // Convertimos el objeto de trámites agrupados a un array
    const tramites = Object.values(tramitesAgrupados);

    // Ordenamos la cronología de cada trámite por fecha (opcional)
    tramites.forEach(tramite => {
      tramite.cronologia.sort((a, b) => 
        new Date(a.cronologia_fecha) - new Date(b.cronologia_fecha)
      );
    });

    return { tramites };
}