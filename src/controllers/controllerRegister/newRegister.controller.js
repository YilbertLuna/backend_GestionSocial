import { newRegisterService } from "../../services/newRegister.services.js";
import { PersonIsExist, InvalidCode, VerifyInitialLettersInRange } from "../../middleware/errorHandler.middleware.js";

export const newRregisterController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const {
            aplicationData,
            beneficiaryData,
            dataAplicant,
            dataLocation,
            isAplicantBeneficiary,
            requeriments
        } = req.body

        const { cedula, dependencia_id } = req.User
        await newRegisterService (
            aplicationData,
            beneficiaryData,
            dataAplicant,
            dataLocation,
            isAplicantBeneficiary,
            requeriments,
            dependencia_id,
            cedula
        )

        res.status(200).json('register completed')

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