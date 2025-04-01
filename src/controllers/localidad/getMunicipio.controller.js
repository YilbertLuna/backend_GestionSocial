import { GetLocation } from "../../repository/getLocation.Repository.js"

const getLocation = new GetLocation()

export const getMunicipions = async (req, res) =>{
    try {
        res.set("Content-Type", "application/json")
        const { id_estado } = req.body;
        const municipios = await getLocation.getMunicipio(id_estado)
        return res.status(200).json(municipios)
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}