import { UserRepository } from "../repository/userRepository.js"
import { validateUserLogin } from "../middleware/validateErrors.middleware.js";

const User = new UserRepository()

export const getDataUser = async (usualogin) => {
    validateUserLogin(usualogin);
    const data = await User.findUser(usualogin);
    // validar si el usualogin existe o no, como hacerlo? data.length===0
    return data
}

export const getDependenceUser = async (userId) => {
    validateUserLogin(userId)
    const data = await User.findDependence(userId)
    return data
}