import { GetRequeriments } from "../../repository/getRqueriments.Repository.js";

const getR = new GetRequeriments();

export const requeriments = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const { id_area, id_ayuda } = req.body;
        const { dependencia_id } = req.User;
        const requeriments = await getR.requeriments(dependencia_id, id_area, id_ayuda);
        return res.status(200).json(requeriments);
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
};