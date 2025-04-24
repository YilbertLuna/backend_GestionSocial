import { searchNotFound } from "../middleware/validateErrorHanlder.middleware.js";
import { ChangeStatus } from "../repository/changeStatusRepository.js";
import { SearchTramite } from "../repository/searchTramiteRepository.js";

const status = new ChangeStatus();
const process = new SearchTramite()

export const changeProcess = async ({id_process, id_new_status, cedula, status_observation, totalAmount}) => {
    const newStatus = await status.changeStatus({id_process, id_new_status, cedula, status_observation, totalAmount});
    return newStatus
}

export const selectNewStatus = async () => {
    const selectStatus = await status.selectStatus()
    return selectStatus
}

export const selectProcess = async (nro_process, dependencia_id) => {
    const dataProcess = await process.searchTramitesForUpdate(nro_process, dependencia_id)
    searchNotFound(dataProcess)
    return dataProcess
}