import { DataPerson } from "../repository/getDataPersonRepository.js";
import { searchNotFound } from "../middleware/validateErrorHanlder.middleware.js";

const dataPerson = new DataPerson();

export const getDataPerson = async (personId) => {
    const data = await dataPerson.getDataPerson(personId)
    searchNotFound(data)
    return data;
}