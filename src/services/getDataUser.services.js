import { UserRepository } from "../repository/userRepository.js"
import { validateData, validateUserLogin } from "../middleware/validateErrorHanlder.middleware.js";
import { compareUserPassword } from "./comparePassword.middeware.js";
import { AccessToken } from "../libs/jwt.js";
import { createPayload } from "../libs/createPayload.js";

const User = new UserRepository()

const getDataUser = async (username) => {
    validateUserLogin(username);
    const data = await User.getData(username);
    validateData(data)
    return data
}

export const loginUser = async (username, password) => {
    const data = await getDataUser(username);
    const passwrd = data[0].usua_password
    compareUserPassword(password, passwrd)

    const payload = createPayload(data)

    const token = new AccessToken().created(payload)

    return token
}