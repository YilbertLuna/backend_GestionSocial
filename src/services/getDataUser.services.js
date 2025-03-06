import { userRepository } from "../repository/userRepository.js"
import { validateUserLogin } from "../middleware/validateErrors.middleware.js";

export const getDataUser = async (usualogin) => {
    validateUserLogin(usualogin);
    const data = await new userRepository().findUser(usualogin);
    return data
}