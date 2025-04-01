import { GetRequeriments } from "../../repository/getRqueriments.Repository.js";

const getR = new GetRequeriments();

export const referido = async (req, res) => {
    try {
        res.set("Content-Type", "application/json")
        const procedencia = await getR.getReferidos()
        return res.status(200).json(procedencia)
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}