import CryptoJS from "crypto-js";
import { IncorretUserPasswordError } from "../middleware/errorHandler.middleware.js";

export function compareUserPassword(userPassword, usua_password) {
    const hashPasword = CryptoJS.MD5(userPassword).toString()
    
    if(hashPasword !== usua_password) {
        throw new IncorretUserPasswordError()
    }
}