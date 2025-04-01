import { GetLocation } from "../../repository/getLocation.Repository.js"

const getLocation = new GetLocation()

export const getEstado = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const estados = await getLocation.getEstado()
        return res.status(200).json(estados)
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}