import { userRepository } from "../repository/userRepository.js"

export class UndefinedUserLoginError extends Error {
    constructor() {
        super("user login is required")
        this.name = "UndefinedUserLoginError"
    }
}

export class TypeUserLoginError extends Error {
    constructor() {
        super("user login must be a string")
        this.name = "TypeUserLoginError"
    }
}

function validate (userLogin) {
    if(!userLogin) {
        throw new UndefinedUserLoginError();
    }
    if(typeof userLogin !== "string") {
        throw new TypeUserLoginError()
    }
}

export const login = async (usualogin) => {
    validate(usualogin);
    const data = await new userRepository().findUser(usualogin);
    return data
}