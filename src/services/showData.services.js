import { ShowData } from "../repository/showDataRerpository.js";
import { decodeEntities } from "../utils/decodeEntitis.js";

const show = new ShowData()

export const showDataProcess = async (id_tram) => {
    const data = await show.showProcess(id_tram)
    return data
}

export const showDataProcessBeforeUpdate = async (id_tram) => {
    const data = await show.showProcessBeforeUpdate(id_tram)
    if(!data[0].serv_descripcion) {
        return data;
    } else {
        const decode = validateAndDecodeData(data)
        return decode
    }
}

const validateAndDecodeData = (data) => {
    const decodedService = data.map(serv => ({
        ...serv,
        serv_descripcion: decodeEntities(serv.serv_descripcion)
    }));
    return decodedService;
};
