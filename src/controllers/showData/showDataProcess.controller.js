import { showDataProcess } from "../../services/showData.services.js";

export const showDataProcessController = async (req, res) => {
    try {
        const { id_tram } = req.params
        const data = await showDataProcess(id_tram)
        return res.status(200).json(data)
    } catch (error) {
    return res.status(500).json({message: `internal server error: ${error.message}`})
    }
}