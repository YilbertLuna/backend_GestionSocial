import { newRegisterService } from "../../services/newRegister.services.js";
import { PersonIsExist, InvalidCode, VerifyInitialLettersInRange } from "../../middleware/errorHandler.middleware.js";

export const newRregisterController = async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const {
            monto,
            descripcionAyuda,
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
            referido,
            numeroTelefono,
            numeroTelefonoFijo,
            correo,
            requisitos,
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
        } = req.body 

        const { cedula, dependencia_id } = req.User
        await newRegisterService (
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
            correo,
            referido,
            dependencia_id,
            pers_cedula,
            cedula,
            monto,
            descripcionAyuda,
            pers_apellidos,
            pers_nombres,
            pers_direccion,
            pers_foto,
            parroquia_parr_id,
            parroquia_municipio_muni_id,
            parroquia_municipio_estado_estado_id,
            pers_fec_nac,
            pers_nacionalidad
        )

        res.status(200).json('register completed')

    } catch (error) {
        if(error instanceof PersonIsExist) {
            return res.status(400).json({message: error.message})
        }
        if(error instanceof InvalidCode) {
            return res.status(400).json({message: error.message})
        }
        if(error instanceof VerifyInitialLettersInRange) {
            return res.status(400).json({message: error.message})
        }
        else {
            return res.status(500).json({message: 'internal server error'})
        }
    }
}