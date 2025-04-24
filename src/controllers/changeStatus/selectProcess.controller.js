import { NotFound } from "../../middleware/errorHandler.middleware.js";
import { selectProcess } from "../../services/changeStatus.services.js";

export const selectProcessController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const {nro_tramite} = req.body
        const {dependencia_id} = req.User
        const data = await selectProcess(nro_tramite, dependencia_id)
        return res.status(200).json(data)
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(400).json({message: error.message})
        }else{
            return res.status(500).json({error: error.message});
        }
    }
}