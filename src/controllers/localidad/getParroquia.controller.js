import { GetLocation } from "../../repository/getLocationRepository.js"

const getLocation = new GetLocation()

export const getParroquia = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const { id_municipio, id_estado } = req.body;
        const parroquias = await getLocation.getParroquia(id_municipio, id_estado)
        return res.status(200).json(parroquias)
        
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}