import { changeProcess } from "../../services/changeStatus.services.js";

export const changeStatusController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const { id_process, id_new_status, status_observation, tram_monto } = req.body;
        const {cedula} = req.User
        await changeProcess({ id_process, id_new_status, cedula, status_observation, tram_monto });
        return res.status(200).json("Status updated successfully");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}