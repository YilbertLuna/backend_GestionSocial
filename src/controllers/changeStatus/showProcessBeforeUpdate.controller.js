import { showDataProcessBeforeUpdate } from "../../services/showData.services.js";
import { decodeEntities } from "../../utils/decodeEntitis.js";

export const showProcessBeforeUpdateController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const { id_tram } = req.params
        const data = await showDataProcessBeforeUpdate(id_tram);
        const decodedService = data.map(serv => ({
            ...serv,
            serv_descripcion: decodeEntities(serv.serv_descripcion)
        }));
        return res.status(200).json(decodedService)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}