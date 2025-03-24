import { validateCode, validateLettersRange, validatePersonIsExist } from "../middleware/validateErrorHanlder.middleware.js"
import { NewRegisterRepository } from "../repository/newRegisterRepository.js"

const newRegister = new NewRegisterRepository()

export const newRegisterService = async (
    isBeneficiario,
    benf_apellidos,
    benf_nombres,
    benf_cedula,
    benf_direccion,
    benf_foto,
    benf_parroquia_parr_id,
    benf_parroquia_municipio_muni_id,
    benf_parroquia_municipio_estado_estado_id,
    benf_fec_nac,
    benf_nacionalidad,
    requisitos,
    numeroTelefono,
    numeroTelefonoFijo,
    correo,referido,
    idDependence,
    pers_cedula,
    cedula,
    monto, descripcionAyuda,
    pers_apellidos,
    pers_nombres,
    pers_direccion,
    pers_foto,
    parroquia_parr_id,
    parroquia_municipio_muni_id,
    parroquia_municipio_estado_estado_id,
    pers_fec_nac,
    pers_nacionalidad, 
    ) => {
    await validatePerson({ pers_cedula });
    const newNumberProcess = await generateCodeProcess(idDependence)
    const originProcess = await idOriginProcess(referido)
    const contact = await contactPerson(numeroTelefono, numeroTelefonoFijo, correo)
    const [req, [processStatus]] = requirements(requisitos)
    const [beneficiario] = benef(
        isBeneficiario,
        pers_apellidos,
        pers_nombres,
        pers_cedula,
        pers_direccion,
        pers_foto,
        parroquia_parr_id,
        parroquia_municipio_muni_id,
        parroquia_municipio_estado_estado_id,
        pers_fec_nac,
        pers_nacionalidad,
        benf_apellidos,
        benf_nombres,
        benf_cedula,
        benf_direccion,
        benf_foto,
        benf_parroquia_parr_id,
        benf_parroquia_municipio_muni_id,
        benf_parroquia_municipio_estado_estado_id,
        benf_fec_nac,
        benf_nacionalidad
    )
    await newRegister.register({ beneficiario, req, processStatus, contact, originProcess, newNumberProcess, idDependence, monto, descripcionAyuda, cedula, pers_apellidos,pers_nombres,pers_cedula,pers_direccion,pers_foto,parroquia_parr_id,parroquia_municipio_muni_id,parroquia_municipio_estado_estado_id,pers_fec_nac,pers_nacionalidad });
}

const validatePerson = async({ pers_cedula }) => {
    const person = await newRegister.findPerson(pers_cedula);
    validatePersonIsExist(person)
}

const generateCodeProcess = async (idDependence) => {
    // Obtener el último código de trámite de la dependencia
    const lastNumberProcess = await newRegister.lastCodeProcess(idDependence);
    const range = await newRegister.rangeDependence(idDependence);
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

const idOriginProcess = async (procedencia) => {
    const id = await newRegister.FindIdProcedencia(procedencia)
    return id
}

const contactPerson = async (numeroTelefono, numeroTelefonoFijo, correo) => {
    // obtener el maximo id
    const maxId = await newRegister.lastIdContactPersons()
    const newId = maxId + 1

    let contactType
    let contactPerson;

    // Validar si no se recibe el teléfono
    if (!numeroTelefono || numeroTelefono === '') {
        if (numeroTelefonoFijo && numeroTelefonoFijo !== '') {
            contactPerson = numeroTelefonoFijo;
            contactType = 2 // Tipo 2 para teléfono fijo
        } else if (correo && correo !== '') {
            contactPerson = correo;
            contactType = 3; // Tipo 3 para correo electrónico
        }
    } else {
        contactType = 1; // Por defecto, tipo 1 (telefono)
        contactPerson = numeroTelefono; // Por defecto, el contacto es el teléfono
    }

    const object = { newId, contactType, contactPerson };
    return object;
}

const requirements = (requirements) => {
    const i = requirements.length;
    let reqfaltante = 0;
    let processStatus;
    const statedRequirements = [];
    
    for (let index = 0; index < i; index++) {
        if(requirements[index].status === 'c'){
            statedRequirements.push(requirements[index]);
        } else if(requirements[index].status === 'u') {
            reqfaltante++
        }
    }

    if(reqfaltante === 0) {
        processStatus = 2 // todos los requisitos estan completos
    } else {
        processStatus = 1 // faltan requistos
    }

    const object = [statedRequirements, [{status: processStatus}]]
    return object;
}
const benef = (
    isBeneficiario,
    pers_apellidos,
    pers_nombres,
    pers_cedula,
    pers_direccion,
    pers_foto,
    parroquia_parr_id,
    parroquia_municipio_muni_id,
    parroquia_municipio_estado_estado_id,
    pers_fec_nac,
    pers_nacionalidad,
    benf_apellidos,
    benf_nombres,
    benf_cedula,
    benf_direccion,
    benf_foto,
    benf_parroquia_parr_id,
    benf_parroquia_municipio_muni_id,
    benf_parroquia_municipio_estado_estado_id,
    benf_fec_nac,
    benf_nacionalidad) => {

    const beneficiarioData = []

    if(isBeneficiario === 'si') {
        beneficiarioData.push({
            "benf_apellidos": pers_apellidos,
            "benf_nombres": pers_nombres,
            "benf_cedula":  pers_cedula,
            "benf_direccion": pers_direccion,
            "benf_foto": pers_foto,
            "benf_parroquia_parr_id": parroquia_parr_id,
            "benf_parroquia_municipio_muni_id": parroquia_municipio_muni_id,
            "benf_parroquia_municipio_estado_estado_id": parroquia_municipio_estado_estado_id,
            "benf_fec_nac": pers_fec_nac,
            "benf_nacionalidad": pers_nacionalidad
        })
    } else if(isBeneficiario === 'no') {
        beneficiarioData.push({
            "benf_apellidos" : benf_apellidos,
            "benf_nombres" : benf_nombres,
            "benf_cedula" : benf_cedula,
            "benf_direccion" : benf_direccion,
            "benf_foto" : benf_foto,
            "benf_parroquia_parr_id" : benf_parroquia_parr_id,
            "benf_parroquia_municipio_muni_id" : benf_parroquia_municipio_muni_id,
            "benf_parroquia_municipio_estado_estado_id" : benf_parroquia_municipio_estado_estado_id,
            "benf_fec_nac" : benf_fec_nac,
            "benf_nacionalidad" : benf_nacionalidad
        })
    }

    return beneficiarioData;
}