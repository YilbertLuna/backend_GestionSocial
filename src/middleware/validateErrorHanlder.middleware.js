import {
    UndefinedUserLoginError,
    TypeUserLoginError,
    UndefinedUserPasswordError,
    TypeUserPasswordError,
    UndefinedData
} from "./errorHandler.middleware.js";

export function validateUserLogin (userLogin) {
    if(!userLogin) {
        throw new UndefinedUserLoginError();
    }
    if(typeof userLogin !== "string") {
        throw new TypeUserLoginError()
    }
}

export function validateUserPassword (userPassword){
    if(!userPassword) {
        throw new UndefinedUserPasswordError()
    }
    if(typeof userPassword !== "string") {
        throw new TypeUserPasswordError()
    }
}

export function validateData (data) {
    if(data.length === 0) {
        throw new UndefinedData()
    }
}