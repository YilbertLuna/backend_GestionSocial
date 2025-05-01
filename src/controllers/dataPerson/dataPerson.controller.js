import { getDataPerson } from "../../services/getDataPerson.services.js";
import { NotFound } from "../../middleware/errorHandler.middleware.js";

export const getDataPersonController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const {personId} = req.params;

        const data = await getDataPerson(personId);

        return res.status(200).json(data)
    } catch (error) {
        if(error instanceof NotFound) {
            return res.status(404).json({error: error.message});
        }else {
            return res.status(500).json({error: error.message});
        }
    }
}