import { NotFound } from "../../middleware/errorHandler.middleware.js"
import { searchPersons } from "../../services/searchPerson.services.js"

export const searchPersonsController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")

        const {person} = req.body
        const data = await searchPersons(person)

        return res.status(200).json(data)
    } catch (error) {
        if(error instanceof NotFound) {
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: `internal server error: ${error.message}`})
    }
}