import { validateCode, validateLettersRange, validatePersonIsExist } from "../middleware/validateErrorHanlder.middleware.js"
import { NewRegisterRepository } from "../repository/newRegisterRepository.js"
const newRegister = new NewRegisterRepository()

export const newRegisterService = async (
    aplicationData,
    beneficiaryData,
    dataAplicant,
    dataLocation,
    isAplicantBeneficiary,
    requeriments,
    dependencia_id,
    cedula
    ) => {
    await validatePerson( dataAplicant );
    await validatePerson( beneficiaryData )
    const newNumberProcess = await generateCodeProcess(dependencia_id)
    const originProcess = await idOriginProcess(aplicationData)
    const contact = await contactPerson(dataLocation)
    const [req, [processStatus]] = reque(requeriments)
    const [beneficiario] = benef(isAplicantBeneficiary, dataAplicant, beneficiaryData, dataLocation)

    await newRegister.register({ 
        beneficiario, 
        req, 
        processStatus, 
        contact, 
        originProcess, 
        newNumberProcess, 
        aplicationData,
        dataAplicant,
        dataLocation,
        dependencia_id,
        cedula
    });
}

export const newProcess = async (
    aplicationData,
    beneficiaryData,
    dataAplicant,
    dataLocation,
    isAplicantBeneficiary,
    requeriments,
    dependencia_id,
    cedula
    ) => {
    if (isAplicantBeneficiary === 'NO') {
        await validatePerson( beneficiaryData )
    }
    const newNumberProcess = await generateCodeProcess(dependencia_id)
    const originProcess = await idOriginProcess(aplicationData)
    const [req, [processStatus]] = reque(requeriments)
    const [beneficiario] = benef(isAplicantBeneficiary, dataAplicant, beneficiaryData, dataLocation)

    await newRegister.newProcessToPerson({
        req,
        originProcess,
        processStatus,
        aplicationData,
        cedula,
        dataAplicant,
        newNumberProcess,
        dependencia_id,
        beneficiario,
        isAplicantBeneficiary
    });
}

const validatePerson = async( dataPerson ) => {
    const person = await newRegister.findPerson(dataPerson.pers_cedula);
    const personBeneficiary = await newRegister.findPerson(dataPerson.benf_cedula);
    validatePersonIsExist(person)
    validatePersonIsExist(personBeneficiary)
}

const generateCodeProcess = async (dependencia_id) => {
    // Obtener el último código de trámite de la dependencia
    const lastNumberProcess = await newRegister.lastCodeProcess(dependencia_id);
    const range = await newRegister.rangeDependence(dependencia_id);
    const code = lastNumberProcess.nro_tramite;

    // Extraer las letras iniciales y los números del rango inicial y final
    const initialsDependencyLetters = range.rango_inicial.match(/^[A-Za-z]+/)[0];
    const numInitial = parseInt(range.rango_inicial.match(/\d+/)[0], 10);
    const lastDependencesLetters = range.max.match(/^[A-Za-z]+/)[0];
    const lastNumber = parseInt(range.max.match(/\d+/)[0], 10);

    // Extraer las letras iniciales y los números del código actual
    const currentLetters = code.match(/^[A-Za-z]+/)[0];
    const currentNumber = parseInt(code.match(/\d+/)[0], 10);

    // Validar que las letras iniciales coincidan con el rango
    validateLettersRange(currentLetters, initialsDependencyLetters, lastDependencesLetters)

    // Incrementar el número actual
    const newNumber = currentNumber + 1;

    // Validar que el nuevo número esté dentro del rango permitido
    validateCode(newNumber, numInitial, lastNumber);

    const length = range.rango_inicial.match(/\d+/)[0].length;
    const codeNumberProcess = String(newNumber).padStart(length, '0');

    const year = new Date().getFullYear();
    const formatedYear = String(year).slice(-2);

    const newCodeProcess = `${currentLetters}${codeNumberProcess}-${formatedYear}`;
    return newCodeProcess;
}

const idOriginProcess = async (aplicationData) => {
    const id = await newRegister.FindIdProcedencia(aplicationData.referido)
    return id
}

const contactPerson = async (dataLocation) => {
    // obtener el maximo id
    const maxId = await newRegister.lastIdContactPersons()
    const newId = maxId + 1

    let contactType
    let contactPerson;

    // Validar si no se recibe el teléfono
    if (!dataLocation.TelefonoCelular || dataLocation.TelefonoCelular === '') {
        if (dataLocation.TelefonoFijo && dataLocation.TelefonoFijo !== '') {
            contactPerson = dataLocation.TelefonoFijo;
            contactType = 2 // Tipo 2 para teléfono fijo
        } else if (dataLocation.Correo && dataLocation.Correo !== '') {
            contactPerson = dataLocation.Correo;
            contactType = 3; // Tipo 3 para correo electrónico
        }
    } else {
        contactType = 1; // Por defecto, tipo 1 (telefono)
        contactPerson = dataLocation.TelefonoCelular; // Por defecto, el contacto es el teléfono
    }

    const object = { newId, contactType, contactPerson };
    return object;
}

export const reque = (requeriments) => {
    const i = requeriments.length;
    let reqfaltante = 0;
    let processStatus;
    const statedRequirements = [];
    
    for (let index = 0; index < i; index++) {
        if(requeriments[index].estatus === 'C'){
            statedRequirements.push(requeriments[index]);
        } else if(requeriments[index].estatus === 'U') {
            reqfaltante++
        }
    }

    if(reqfaltante === 0 || reqfaltante.length === 0) {
        processStatus = 2 // todos los requisitos estan completos
    } else {
        processStatus = 1 // faltan requistos
    }

    const object = [statedRequirements, [{status: processStatus}]]
    return object;
}

const benef = (isAplicantBeneficiary, dataAplicant, beneficiaryData, dataLocation) => {

    const beneficiarioData = []

    if(isAplicantBeneficiary === 'SI') {
        beneficiarioData.push({
            "benf_apellidos": dataAplicant.pers_apellidos,
            "benf_nombres": dataAplicant.pers_nombres,
            "benf_cedula": dataAplicant.pers_cedula,
            "benf_direccion": dataLocation.Direccion || null,
            "benf_parroquia_id": dataLocation.parroquia_id || null,
            "benf_municipio_id": dataLocation.municipio_id || null,
            "benf_estado_id": dataLocation.estado_id || null,
            "benf_fec_nac": dataAplicant.pers_fec_nac,
            "benf_document": dataAplicant.pers_document || null
        })
    } else if(isAplicantBeneficiary === 'NO') {
        beneficiarioData.push({
            "benf_apellidos": beneficiaryData.benf_apellidos,
            "benf_nombres": beneficiaryData.benf_nombres,
            "benf_cedula": beneficiaryData.benf_cedula,
            "benf_direccion": beneficiaryData.benf_direccion,
            "benf_parroquia_id": beneficiaryData.benf_parroquia || null,
            "benf_municipio_id": beneficiaryData.benf_municipio || null,
            "benf_estado_id": beneficiaryData.benf_estado || null,
            "benf_fec_nac": beneficiaryData.benf_fec_nac,
            "benf_document": beneficiaryData.benf_document || null
        });
    }

    return beneficiarioData;
}