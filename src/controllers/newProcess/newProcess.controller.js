import { newProcess } from "../../services/newRegister.services.js";
import { PersonIsExist, InvalidCode, VerifyInitialLettersInRange } from "../../middleware/errorHandler.middleware.js";

export const newProcessController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const {
            aplicationData,
            beneficiaryData,
            dataAplicant,
            dataLocation,
            isAplicantBeneficiary,
            requeriments
        } = req.body;
        const { cedula, dependencia_id } = req.User

        await newProcess(
                aplicationData,
                beneficiaryData,
                dataAplicant,
                dataLocation,
                isAplicantBeneficiary,
                requeriments,
                dependencia_id,
                cedula
            )

        return res.status(200).json({message: "New process created successfully"});
    } catch (error) {
        if(error instanceof PersonIsExist) {
            return res.status(400).json({message: error.message})
        }
        if(error instanceof InvalidCode) {
            return res.status(400).json({message: error.message})
        }
        if(error instanceof VerifyInitialLettersInRange) {
            return res.status(400).json({message: error.message})
        }
        else {
            return res.status(500).json({message: `internal server error: ${error.message}`})
        }
    }
}