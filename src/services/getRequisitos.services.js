import { DataForPdf } from "../repository/getDataForCreatePdf.Repository.js";
import { decodeEntities } from "../utils/decodeEntitis.js";

const data = new DataForPdf();

export async function getRequisitosNoConsignados(id) {
    const req = await  data.getRequisitosNoConsignados(id);
    const decodeReq = req.map(req => ({
            ...req,
            requ_descripcion: decodeEntities(req.requ_descripcion)
        }));
    return decodeReq
}

export async function getRequisitosConsignados(id) {
    const req = await data.getRequisitosConsignados(id);
    const decodeReq = req.map(req => ({
            ...req,
            requ_descripcion: decodeEntities(req.requ_descripcion)
        }));
    return decodeReq
}