import { searchTramites } from "../../services/searchTramites.services.js"
import { NotFound } from "../../middleware/errorHandler.middleware.js"

export const searchTramiteController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { tramite } = req.body

        const data = await searchTramites(tramite)

        return res.status(200).json(data)
    } catch (error) {
        if(error instanceof NotFound) {
            return res.status(400).json({message: error.message})
        }
        else {
            return res.status(500).json({message: `internal server error`})
        }
    }
}