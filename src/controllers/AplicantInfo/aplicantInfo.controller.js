import { vewDataPersonAndProcess } from "../../services/vewDataPersonAndProcess.services.js";

export const AplicantInfoController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const {person} = req.params
        const dataPerson = await vewDataPersonAndProcess(person)
        res.status(200).json(dataPerson)
    } catch (error) {
        return res.status(500).json({message: `internal server error: ${error.message}`})
    }
}

