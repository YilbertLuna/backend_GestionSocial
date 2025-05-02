import { GetRequeriments } from "../../repository/getRequerimentsRepository.js";
import { decodeEntities } from "../../utils/decodeEntitis.js";

const getR = new GetRequeriments();

export const selectArea = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const {dependencia_id} = req.User          
        const area = await getR.selectArea(dependencia_id)
        const decodeArea = area.map(area => ({
            ...area,
            area_descripcion: decodeEntities(area.area_descripcion)
        }));
        return res.status(200).json(decodeArea)
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}