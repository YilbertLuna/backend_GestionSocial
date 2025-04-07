import { SearchPersons } from "../repository/searchPersonsRepository.js"

const search = new SearchPersons()

export const searchPersons = async (person) => {
    var cedula = null
    var nombre = null

    if (typeof person === "number") {
        cedula = person
    } else if (typeof person === "string") {
        nombre = person
    }
    const data = await search.search({ cedula, nombre })
    return data
}