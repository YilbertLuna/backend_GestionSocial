import {
    UndefinedUserLoginError,
    TypeUserLoginError,
    UndefinedUserPasswordError,
    TypeUserPasswordError, 
    IncorretUserPasswordError,
    UndefinedData
} from "../../middleware/errorHandler.middleware.js";
import { loginUser } from "../../services/getDataUser.services.js";


export const loginController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        const {username, password} = req.body;

        const data = await loginUser(username, password)
        res.cookie('token', data)

        return res.status(200).json({message: "login susccesfuly"})

    } catch (error) {
        if(error instanceof UndefinedData) {
            res.status(400).json({message: error.message})
        }
        if(error instanceof UndefinedUserLoginError || error instanceof TypeUserLoginError){
            res.status(400).json({message: error.message});
        }
        if(error instanceof UndefinedUserPasswordError || error instanceof TypeUserPasswordError || error instanceof IncorretUserPasswordError){
            res.status(400).json({message: error.message})
        }
        else {
            res.status(500).json({message: `internal server error ${error}`})
            console.log(error.message)
        }
    }
};