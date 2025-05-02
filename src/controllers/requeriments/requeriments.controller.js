import { GetRequeriments } from "../../repository/getRequerimentsRepository.js";
import { decodeEntities } from "../../utils/decodeEntitis.js";

const getR = new GetRequeriments();

export const requeriments = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const { id_area, id_ayuda } = req.body;
        const { dependencia_id } = req.User;
        const requeriments = await getR.requeriments(dependencia_id, id_area, id_ayuda);
        
        // Decodificar las descripciones
        const decodedRequeriments = requeriments.map(req => ({
            ...req,
            requ_descripcion: decodeEntities(req.requ_descripcion)
        }));
        return res.status(200).json(decodedRequeriments);
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
};