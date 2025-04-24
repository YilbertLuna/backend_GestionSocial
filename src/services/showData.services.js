import { ShowData } from "../repository/showDataRerpository.js";

const show = new ShowData()

export const showDataProcess = async (id_tram) => {
    const data = await show.showProcess(id_tram)
    return data
}

export const showDataProcessBeforeUpdate = async (id_tram) => {
    const data = await show.showProcessBeforeUpdate(id_tram)
    return data
}