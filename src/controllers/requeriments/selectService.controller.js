import { GetRequeriments } from "../../repository/getRequerimentsRepository.js";
import { decodeEntities } from "../../utils/decodeEntitis.js";

const getR = new GetRequeriments()

export const selectService = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const { id_area } = req.body;
        const { dependencia_id } = req.User;
        const services = await getR.selectServicio(dependencia_id, id_area);
        const decodedService = services.map(serv => ({
            ...serv,
            serv_descripcion: decodeEntities(serv.serv_descripcion)
        }));
        return res.status(200).json(decodedService);
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
};