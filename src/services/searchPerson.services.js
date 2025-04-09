import { personIsNotExist } from "../middleware/validateErrorHanlder.middleware.js"
import { SearchPersons } from "../repository/searchPersonsRepository.js"

const search = new SearchPersons()

export const searchPersons = async (person) => {
    const data = await search.search(person)
    personIsNotExist(data)
    return data
}