import { listProcessApproved } from "../../../services/reportes/createListProcessApprove.Services.js";

export const listProcessApprovedController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const { dependencia_id } = req.User
        const { page = 1, pageSize = 10 } = req.query;
        const data = await listProcessApproved(dependencia_id, parseInt(page), parseInt(pageSize));
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}