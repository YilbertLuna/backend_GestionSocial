import { getRequisitosNoConsignados } from "../../services/getRequisitos.services.js";

export const requequimentsNoConsignadosController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const { tramiteId } = req.params;
        const data = await getRequisitosNoConsignados(tramiteId)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}