import { Reportes } from "../../repository/reportesRepository.js";

const reportes = new Reportes();

export async function listProcessApproved(depe_id, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize; // Calcula el desplazamiento
    const data = await reportes.ListProcessApproved(depe_id, pageSize, offset);

    // Obtén el total de registros desde el primer registro (siempre será el mismo para todos los registros)
    const total = data.length > 0 ? data[0].total_records : await getTotalRecords(depe_id);

    // Calcula el número total de páginas
    const totalPages = Math.ceil(total / pageSize);

    // Devuelve los datos junto con la información de paginación
    return {
        data,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            pageSize
        }
    };
}

// Función auxiliar para obtener el total de registros si no hay datos en la página solicitada
async function getTotalRecords(depe_id) {
    const data = await reportes.ListProcessApproved(depe_id, 1, 0); // Consulta con un límite de 1 para obtener el total
    return data.length > 0 ? data[0].total_records : 0;
}