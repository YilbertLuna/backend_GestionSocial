import { SearchTramite } from "../repository/searchTramiteRepository.js";
import { searchNotFound } from "../middleware/validateErrorHanlder.middleware.js";

const searchTramite = new SearchTramite()


export const searchTramites = async (search) => {
    const data = await searchTramite.searchTramite(search)
    searchNotFound(data)
    return data
}