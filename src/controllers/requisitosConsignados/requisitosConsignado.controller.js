import { getRequisitosConsignados } from "../../services/getRequisitos.services.js";

export const requequimentsConsignadosController = async (req, res) => {
    try {
        const { tramiteId } = req.params;
        const data = await getRequisitosConsignados(tramiteId)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}