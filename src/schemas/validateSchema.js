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
    description: z.string({
      required_error: "description is required"
    }),
    monto: z.number({
      required_error: "monto is required"
    }),
    referido: z.string({
      required_error: "referido is required"
    })
  }),
  beneficiaryData: z.object({
    benf_apellidos: z.string({
      required_error: "benf_apellidos is required"
    }),
    benf_cedula: z.string({
      required_error: "benf_cedula is required"
    }),
    benf_direccion: z.string({
      required_error: "benf_direccion is required"
    }),
    benf_document: z.string({
      required_error: "benf_document is required"
    }),
    benf_estado: z.number({
      required_error: "benf_estado is required"
    }),
    benf_fec_nac: z.string({
      required_error: "benf_fec_nac is required"
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "pers_fec_nac must be a valid date (YYYY-MM-DD)"),
    benf_municipio: z.number({
      required_error: "benf_municipio is required"
    }),
    benf_nombres: z.string({
      required_error: "benf_nombres is required"
    }),
    benf_parroquia: z.number({
      required_error: "benf_parroquia is required"
    })
  }).partial().optional().nullable(),
  dataAplicant: z.object({
    pers_apellidos: z.string({
      required_error: "pers_apellidos is required"
    }),
    pers_cedula: z.string({
      required_error: "pers_cedula is required"
    }),
    pers_document: z.string({
      required_error: "pers_document is required"
    }),
    pers_fec_nac: z.string({
      required_error: "pers_fec_nac is required"
    }).regex(/^\d{4}-\d{2}-\d{2}$/, "pers_fec_nac must be a valid date (YYYY-MM-DD)"),
    pers_nombres: z.string({
      required_error: "pers_nombres is required"
    })
  }),
  dataLocation: z.object({
    Correo: z.string().email().optional(),
    Direccion: z.string({
      required_error: "direccion is required"
    }),
    TelefonoCelular: z.string().optional(),
    TelefonoFijo: z.string().optional(),
    estado_id: z.number({
      required_error: "estado is required"
    }),
    municipio_id: z.number({
      required_error: "municipio is required"
    }),
    parroquia_id: z.number({
      required_error: "parroquia is required"
    })
  }),
  isAplicantBeneficiary: z.enum(["SI", "NO"], "isAplicantBeneficiary must be 'SI' or 'NO'"),
  requeriments: z.array(z.object({
    depe_id: z.number({
      required_error: "depe_id is required"
    }),
    estatus: z.string({
      required_error: "estatus is required"
    }),
    id_area: z.string({
      required_error: "area is required"
    }),
    id_ayuda: z.string({
      required_error: "ayuda is required"
    }),
    requ_descripcion: z.string({
      required_error: "requ_descripcion is required"
    }),
    requ_id: z.number({
      required_error: "requi_id is required"
    }),
    requi_cantidad: z.number({
      required_error: "requi_cantidad is required"
    }),
    requi_obligatorio: z.boolean()
  }))
});