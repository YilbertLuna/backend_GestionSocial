import { GetRequeriments } from "../../repository/getRqueriments.Repository.js";

const getR = new GetRequeriments()

export const selectService = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const { id_area } = req.body;
        const { dependencia_id } = req.User;
        const services = await getR.selectServicio(dependencia_id, id_area);
        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
};