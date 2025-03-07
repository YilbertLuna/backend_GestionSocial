import { getDataUser, getDependenceUser } from "../services/getDataUser.services.js";
import {
    UndefinedUserLoginError,
    TypeUserLoginError,
    UndefinedUserPasswordError,
    TypeUserPasswordError, 
    IncorretUserPasswordError,
    UndefinedLoginPassword
} from "../middleware/errors.middleware.js";
import { validateInputDataUser, validateUserPassword } from "../middleware/validateErrors.middleware.js";
import { compareUserPassword } from "../middleware/comparePassword.middeware.js";
import { AccessToken } from "../libs/jwt.js";

export const loginController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const {userLogin, userPassword} = req.body;
        validateInputDataUser(userLogin, userPassword)
        validateUserPassword(userPassword)

        const data = await getDataUser(userLogin);
        const password = data?.map(({usua_password}) => usua_password)
        compareUserPassword(userPassword, password)

        const userId = data?.map(({usua_cedula}) => usua_cedula)
        const dataDependenceUser = await getDependenceUser(userId[0])
        

        const payload = {
            userName: data[0].usua_nombre,
            depeId: data[0].dependencias_depe_id,
            cedula: data[0].usua_cedula,
        }

        const token = new AccessToken().createdAccesToken(payload)

        res.cookie('token', token)
        res.status(200).json({message: "login susccesfuly", data: data, dependenciaUser: dataDependenceUser})

    } catch (error) {
        if(error instanceof UndefinedUserLoginError || error instanceof TypeUserLoginError){
            res.status(400).json({message: error.message});
        }
        if(error instanceof UndefinedUserPasswordError || error instanceof TypeUserPasswordError || error instanceof IncorretUserPasswordError){
            res.status(400).json({message: error.message})
        }
        if(error instanceof UndefinedLoginPassword){
            res.status(400).json({message: error.message})
        }
        else {
            res.status(500).json({message: 'internal server error'})
        }
    }
};