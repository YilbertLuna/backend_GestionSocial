import { updateProcessServices } from "../../services/updateProcess.services.js";

export const updateProcessController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { requeriments, id_tramite } = req.body;

        await updateProcessServices(requeriments, id_tramite);

        res.status(200).json({message: "update process"});
    } catch (error) {
        return res.status(500).json({message: `internal server error: ${error.message}`}) 
    }
}