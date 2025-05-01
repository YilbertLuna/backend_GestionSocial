import { newProcess } from "../../services/newRegister.services.js";

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
            return res.status(500).json({message: `internal server error: ${error.message}`})
    }
}