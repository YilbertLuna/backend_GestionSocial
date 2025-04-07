import { GetRequeriments } from "../../repository/getRequerimentsRepository.js";

const getR = new GetRequeriments();

export const selectArea = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const {dependencia_id} = req.User          
        const area = await getR.selectArea(dependencia_id)
        return res.status(200).json(area)
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}