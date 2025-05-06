import { reque } from "./newRegister.services.js";
import { UpdateProcessRepository } from "../repository/updateProcessRepository.js";

const update = new UpdateProcessRepository()

export async function updateProcessServices (requeriments, id_tramite) {
    const [req, [processStatus]] = reque(requeriments)
    const data = update.uptadeProcessInsertRequeriments({req, processStatus, id_tramite})
    return data
}