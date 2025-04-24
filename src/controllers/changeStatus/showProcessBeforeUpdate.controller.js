import { showDataProcessBeforeUpdate } from "../../services/showData.services.js";

export const showProcessBeforeUpdateController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const { id_tram } = req.params
        const data = await showDataProcessBeforeUpdate(id_tram);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}