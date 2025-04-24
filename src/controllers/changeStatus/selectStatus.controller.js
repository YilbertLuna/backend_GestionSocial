import { selectNewStatus } from "../../services/changeStatus.services.js";

export const selectStatusController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const selectStatus = await selectNewStatus();
        return res.status(200).json(selectStatus);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}