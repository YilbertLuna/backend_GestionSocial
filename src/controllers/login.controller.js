import { login, TypeUserLoginError, UndefinedUserLoginError } from "../services/login.services.js";

export const loginController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const {usualogin} = req.body;
        const data = await login(usualogin);
        res.status(200).json(data);
    } catch (error) {
        if(error instanceof UndefinedUserLoginError || error instanceof TypeUserLoginError){
            res.status(400).json({message: error.message});
        }
        else {
            res.status(500).json({message: 'internal server error'})
        }
    }
};
