import CryptoJS from "crypto-js";
import { IncorretUserPasswordError } from "./errors.middleware.js";

export function compareUserPassword(userPassword, usua_password) {
    const hashPasword = CryptoJS.MD5(userPassword).toString()
    
    if(hashPasword !== usua_password[0]) {
        throw new IncorretUserPasswordError()
    }
}