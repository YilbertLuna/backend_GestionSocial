import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({
    required_error: "username is required"}
  ).max(20,
    {message: "username must be at las 20 characters"}
  ),
  password: z.string({
    required_error: "password is required"
  }).max(40,
    {message: "password must be at las 40 characters"}
  )
})

export const newProcessSchema = z.object({
  aplicationData: z.object({
    description: z.string().min(1, "description is required"),
    monto: z.number().min(0, "monto must be a positive number"),
    referido: z.string().min(1, "referido is required")
  }),
  beneficiaryData: z.object({
    benf_apellidos: z.string().min(1, "benf_apellidos is required"),
    benf_cedula: z.string().min(1, "benf_cedula is required"),
    benf_direccion: z.string().min(1, "benf_direccion is required"),
    benf_document: z.string().min(1, "benf_document is required"),
    benf_estado: z.number().min(1, "benf_estado is required"),
    benf_fec_nac: z.string().optional(),
    benf_municipio: z.number().min(1, "benf_municipio is required"),
    benf_nombres: z.string().min(1, "benf_nombres is required"),
    benf_parroquia: z.number().min(1, "benf_parroquia is required")
  }).partial().optional().nullable(),
  dataAplicant: z.object({
    pers_apellidos: z.string().min(1, "pers_apellidos is required"),
    pers_cedula: z.string().min(1, "pers_cedula is required"),
    pers_document: z.string().min(1, "pers_document is required"),
    pers_fec_nac: z.string()
      .min(1, "pers_fec_nac is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "pers_fec_nac must be a valid date (YYYY-MM-DD)"),
    pers_nombres: z.string().min(1, "pers_nombres is required")
  }),
  dataLocation: z.object({
    Correo: z.string().email().optional().or(z.literal("")),
    Direccion: z.string().min(1, "direccion is required"),
    TelefonoCelular: z.string().optional(),
    TelefonoFijo: z.string().optional(),
    estado_id: z.number().min(1, "estado is required"),
    municipio_id: z.number().min(1, "municipio is required"),
    parroquia_id: z.number().min(1, "parroquia is required")
  }),
  isAplicantBeneficiary: z.enum(["SI", "NO"], {
    required_error: "isAplicantBeneficiary is required",
    invalid_type_error: "isAplicantBeneficiary must be 'SI' or 'NO'"
  }),
  requeriments: z.array(z.object({
    depe_id: z.number().min(1, "depe_id is required"),
    estatus: z.string().min(1, "estatus is required"),
    id_area: z.string().min(1, "area is required"),
    id_ayuda: z.string().min(1, "ayuda is required"),
    requ_descripcion: z.string().min(1, "requ_descripcion is required"),
    requ_id: z.number().min(1, "requi_id is required"),
    requi_cantidad: z.number().min(1, "requi_cantidad is required"),
    requi_obligatorio: z.boolean()
  }).optional())
});

export const anotherProcessSchema = z.object({
  aplicationData: z.object({
    description: z.string().min(1, "description is required"),
    monto: z.number().min(0, "monto must be a positive number"),
    referido: z.string().min(1, "referido is required")
  }),
  beneficiaryData: z.object({
    benf_apellidos: z.string().min(1, "benf_apellidos is required"),
    benf_cedula: z.string().min(1, "benf_cedula is required"),
    benf_direccion: z.string().min(1, "benf_direccion is required"),
    benf_document: z.string().min(1, "benf_document is required"),
    benf_estado: z.number().min(1, "benf_estado is required"),
    benf_fec_nac: z.string().optional(),
    benf_municipio: z.number().min(1, "benf_municipio is required"),
    benf_nombres: z.string().min(1, "benf_nombres is required"),
    benf_parroquia: z.number().min(1, "benf_parroquia is required")
  }).partial().optional().nullable(),
  dataAplicant: z.object({
    pers_apellidos: z.string().min(1, "pers_apellidos is required"),
    pers_cedula: z.string().min(1, "pers_cedula is required"),
    pers_document: z.string().min(1, "pers_document is required"),
    pers_fec_nac: z.string()
      .min(1, "pers_fec_nac is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "pers_fec_nac must be a valid date (YYYY-MM-DD)"),
    pers_nombres: z.string().min(1, "pers_nombres is required")
  }),
  isAplicantBeneficiary: z.enum(["SI", "NO"], {
    required_error: "isAplicantBeneficiary is required",
    invalid_type_error: "isAplicantBeneficiary must be 'SI' or 'NO'"
  }),
  requeriments: z.array(z.object({
    depe_id: z.number().min(1, "depe_id is required"),
    estatus: z.string().min(1, "estatus is required"),
    id_area: z.string().min(1, "area is required"),
    id_ayuda: z.string().min(1, "ayuda is required"),
    requ_descripcion: z.string().min(1, "requ_descripcion is required"),
    requ_id: z.number().min(1, "requi_id is required"),
    requi_cantidad: z.number().min(1, "requi_cantidad is required"),
    requi_obligatorio: z.boolean()
  }).optional())
})

export const updateProcessSchema = z.object({
  id_process: z.number({
    required_error: "id_process is required"
  }),
  id_new_status: z.string({
    required_error: "id_new_status is required"
  }),
  status_observation: z.string({
    required_error: "status_observation is required"
  }),
  totalAmount: z.number().min(0, "monto must be a positive number").optional()
})

export const selectProcessSchema = z.object({
  nro_tramite: z.string({
    required_error: "nro_tramite is required"
  })
})