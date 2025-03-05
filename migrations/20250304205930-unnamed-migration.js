'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
        CREATE TABLE public.areas (
          area_id int4 NOT NULL,
          area_descripcion varchar(45) NULL,
          CONSTRAINT areas_pkey PRIMARY KEY (area_id)
        );
        CREATE INDEX index_area_desc ON public.areas USING btree (area_descripcion);

        CREATE TABLE public.areas_bck (
          area_id int4 NULL,
          area_descripcion varchar(45) NULL
        );

        CREATE TABLE public.bitacora (
          bita_id serial4 NOT NULL,
          bita_fecha timestamp NOT NULL,
          bita_consulta text NOT NULL,
          bita_descripcion varchar(250) NOT NULL,
          bita_clave varchar(16) NOT NULL,
          bita_ip varchar(15) NULL,
          usuarios_usua_cedula varchar(12) NULL,
          CONSTRAINT bitacora_pkey PRIMARY KEY (bita_id)
        );
        CREATE INDEX bitacora_fk_bitacora_usuarios1 ON public.bitacora USING btree (usuarios_usua_cedula);

        CREATE TABLE public.caracteristica_vivienda (
          cara_vivi_id serial4 NOT NULL,
          cara_vivi_descripcion varchar(30) NOT NULL,
          CONSTRAINT caracteristica_vivienda_pkey PRIMARY KEY (cara_vivi_id)
        );

        CREATE TABLE public.carrera (
          carr_id serial4 NOT NULL,
          carr_descripcion varchar(80) NOT NULL,
          CONSTRAINT carrera_pkey PRIMARY KEY (carr_id)
        );

        CREATE TABLE public.contacto_dependencia (
          cont_id int4 NOT NULL,
          cont_descripcion varchar(100) NULL,
          dependencias_depe_id int4 NOT NULL,
          tipos_contacto_tipo_id int4 NOT NULL,
          CONSTRAINT contacto_dependencia_pkey PRIMARY KEY (cont_id, tipos_contacto_tipo_id)
        );
        CREATE INDEX contacto_dependencia_fk_contacto_tipos_contacto1 ON public.contacto_dependencia USING btree (tipos_contacto_tipo_id);
        CREATE INDEX "contacto_dependencia_fk_telefonos_Dependencias" ON public.contacto_dependencia USING btree (dependencias_depe_id);

        CREATE TABLE public.contacto_persona (
          cont_id int4 NOT NULL,
          cont_descripcion varchar(100) NULL,
          tipos_contacto_tipo_id int4 NOT NULL,
          personas_pers_id varchar(10) NOT NULL,
          CONSTRAINT contacto_persona_pkey PRIMARY KEY (cont_id, tipos_contacto_tipo_id)
        );
        CREATE INDEX contacto_persona_fk_contacto_tipos_contacto1 ON public.contacto_persona USING btree (tipos_contacto_tipo_id);

        CREATE TABLE public.depen_serv_requi (
          requisitos_requ_id int4 NOT NULL,
          depe_serv_depe_id int4 NOT NULL,
          depe_serv_id int4 NOT NULL,
          depe_servicios_area_id int4 NOT NULL,
          requi_cantidad int4 NOT NULL,
          requi_obligatorio bool NOT NULL,
          requi_estatus bpchar(1) NULL
        );
        CREATE INDEX depen_serv_requi_fk_depen_serv_requi_re1 ON public.depen_serv_requi USING btree (requisitos_requ_id);

        CREATE TABLE public.dependencias (
          depe_id int4 NOT NULL,
          depe_nombre varchar(250) NULL,
          depe_direccion text NULL,
          depe_pagina_web varchar(80) NULL,
          depe_imagen varchar(80) NULL,
          depe_responsable varchar(45) NULL,
          depe_director varchar NULL,
          CONSTRAINT pk_depe_id PRIMARY KEY (depe_id)
        );
        CREATE UNIQUE INDEX dependencias_depe_id_key ON public.dependencias USING btree (depe_id);
        CREATE INDEX index_nombre ON public.dependencias USING btree (depe_nombre);

        CREATE TABLE public.dependencias_servicios (
          dependencias_depe_id int4 NOT NULL,
          servicios_serv_id int4 NULL,
          servicios_areas_area_id int4 NOT NULL,
          depe_serv_id int4 NOT NULL
        );
        CREATE INDEX dependencias_servicios_fk_depen_servi_depe1 ON public.dependencias_servicios USING btree (dependencias_depe_id);

        CREATE TABLE public.estado (
          estado_id serial4 NOT NULL,
          estado_descripcion varchar(45) NOT NULL,
          CONSTRAINT estado_pkey PRIMARY KEY (estado_id)
        );

        CREATE TABLE public.grado_instruccion (
          gra_ins_id serial4 NOT NULL,
          gra_ins_descripcion varchar(45) NOT NULL,
          CONSTRAINT grado_instruccion_pkey PRIMARY KEY (gra_ins_id)
        );

        CREATE TABLE public.grupo_familiar (
          grup_fami_id serial4 NOT NULL,
          grup_fami_nombre varchar(90) NOT NULL,
          grup_fami_edad int4 NULL,
          grup_fami_ingreso float8 NULL,
          parentesco_pare_id int4 NOT NULL,
          ocupacion_ocup_id int4 NULL,
          CONSTRAINT grupo_familiar_pkey PRIMARY KEY (grup_fami_id, parentesco_pare_id)
        );
        CREATE INDEX grupo_familiar_fk_grupo_familiar_parentesco ON public.grupo_familiar USING btree (parentesco_pare_id);
        CREATE INDEX index_grup_fami ON public.grupo_familiar USING btree (grup_fami_id);
        CREATE INDEX index_parentesco ON public.grupo_familiar USING btree (parentesco_pare_id);

        CREATE TABLE public.grupo_familiar_ficha (
          ficha_ficha_id int4 NULL,
          grupo_familiar_grup_fami_id int4 NOT NULL,
          CONSTRAINT grupo_familiar_ficha_pkey PRIMARY KEY (grupo_familiar_grup_fami_id)
        );
        CREATE INDEX grupo_familiar_ficha_fk_grupo_familiar_ficha_ficha1 ON public.grupo_familiar_ficha USING btree (ficha_ficha_id);
        CREATE INDEX grupo_familiar_ficha_fk_grupo_familiar_ficha_grupo_familiar1 ON public.grupo_familiar_ficha USING btree (grupo_familiar_grup_fami_id);
        CREATE INDEX index_ficha ON public.grupo_familiar_ficha USING btree (ficha_ficha_id);
        CREATE INDEX index_grupo_familiar_grup_fami_id ON public.grupo_familiar_ficha USING btree (grupo_familiar_grup_fami_id);

        CREATE TABLE public.institucion (
          inst_id serial4 NOT NULL,
          inst_descripcion varchar(80) NOT NULL,
          CONSTRAINT institucion_pkey PRIMARY KEY (inst_id)
        );

        CREATE TABLE public.materiales (
          mate_id serial4 NOT NULL,
          mate_unidad varchar(40) NULL,
          mate_descripcion varchar(250) NULL,
          mate_precio numeric(14, 2) DEFAULT 0 NOT NULL,
          CONSTRAINT materiales_idx PRIMARY KEY (mate_id)
        );

        CREATE TABLE public.migrations (
          "name" varchar(255) NOT NULL,
          CONSTRAINT migrations_pkey PRIMARY KEY (name)
        );

        CREATE TABLE public.modulos (
          modu_id serial4 NOT NULL,
          modu_nombre varchar(80) NOT NULL,
          modu_pagina varchar(150) NOT NULL,
          modu_estatus varchar(1) DEFAULT '1'::character varying NOT NULL,
          modu_grupo int4 NULL,
          modu_desc_grupo varchar(50) NULL,
          CONSTRAINT modulos_pkey PRIMARY KEY (modu_id)
        );

        CREATE TABLE public.municipio (
          muni_id serial4 NOT NULL,
          muni_descripcion varchar(70) NOT NULL,
          estado_estado_id int4 NOT NULL,
          CONSTRAINT municipio_pkey PRIMARY KEY (muni_id, estado_estado_id)
        );
        CREATE INDEX municipio_fk_municipio_estado1 ON public.municipio USING btree (estado_estado_id);

        CREATE TABLE public.ocupacion (
          ocup_id serial4 NOT NULL,
          ocup_descripcion varchar(60) NOT NULL,
          CONSTRAINT ocupacion_pkey PRIMARY KEY (ocup_id)
        );

        CREATE TABLE public.parentesco (
          pare_id serial4 NOT NULL,
          pare_descripcion varchar(45) NOT NULL,
          CONSTRAINT parentesco_pkey PRIMARY KEY (pare_id)
        );

        CREATE TABLE public.parroquia (
          parr_id serial4 NOT NULL,
          parr_descripcion varchar(70) NOT NULL,
          municipio_muni_id int4 NOT NULL,
          municipio_estado_estado_id int4 NOT NULL,
          CONSTRAINT parroquia_pkey PRIMARY KEY (parr_id, municipio_muni_id, municipio_estado_estado_id)
        );
        CREATE INDEX parroquia_fk_parroquia_municipio1 ON public.parroquia USING btree (municipio_muni_id, municipio_estado_estado_id);

        CREATE TABLE public.parroquia_old (
          parr_id int4 NULL,
          parr_descripcion varchar(70) NULL,
          municipio_muni_id int4 NULL,
          municipio_estado_estado_id int4 NULL
        );

        CREATE TABLE public.permisos (
          permi_id serial4 NOT NULL,
          modulos_modu_id int4 NOT NULL,
          usuarios_usua_cedula varchar(12) NOT NULL,
          estatus bpchar(1) NULL,
          CONSTRAINT permisos_pkey PRIMARY KEY (permi_id, modulos_modu_id, usuarios_usua_cedula)
        );
        CREATE INDEX permisos_fk_permisos_modulos1 ON public.permisos USING btree (modulos_modu_id);
        CREATE INDEX permisos_fk_permisos_usuarios1 ON public.permisos USING btree (usuarios_usua_cedula);

        CREATE TABLE public.personas (
          pers_id serial4 NOT NULL,
          pers_apellidos varchar(45) NOT NULL,
          pers_nombres varchar(350) NOT NULL,
          pers_cedula varchar(12) NOT NULL,
          pers_direccion varchar(200) NOT NULL,
          pers_foto varchar(100) NULL,
          parroquia_parr_id int4 NOT NULL,
          parroquia_municipio_muni_id int4 NOT NULL,
          parroquia_municipio_estado_estado_id int4 NOT NULL,
          tipo_persona_tipo_pers_id int4 NOT NULL,
          pers_fec_nac date NULL,
          institucion_inst_id int4 NULL,
          carrera_carr_id int4 NULL,
          ocupacion_ocup_id int4 NULL,
          grado_instruccion_gra_ins_id int4 NULL,
          pers_sexo varchar(1) NULL,
          pers_esta_civil varchar(1) NULL,
          pers_lugar_nac varchar(150) NULL,
          pers_nacionalidad varchar(1) NULL,
          pers_ingreso numeric(14, 2) NULL,
          CONSTRAINT personas_pers_id_key UNIQUE (pers_id),
          CONSTRAINT personas_pkey PRIMARY KEY (pers_id, parroquia_parr_id, parroquia_municipio_muni_id, parroquia_municipio_estado_estado_id, tipo_persona_tipo_pers_id)
        );
        CREATE INDEX index_carrera ON public.personas USING btree (carrera_carr_id);
        CREATE INDEX index_grado_inst ON public.personas USING btree (grado_instruccion_gra_ins_id);
        CREATE INDEX index_institucion ON public.personas USING btree (institucion_inst_id);
        CREATE INDEX index_ocupacion ON public.personas USING btree (ocupacion_ocup_id);
        CREATE INDEX index_pers_cedula ON public.personas USING btree (pers_cedula);
        CREATE INDEX "personas_fk_Personas_parroquia1" ON public.personas USING btree (parroquia_parr_id, parroquia_municipio_muni_id, parroquia_municipio_estado_estado_id);
        CREATE INDEX personas_fk_personas_tipo_persona1 ON public.personas USING btree (tipo_persona_tipo_pers_id);

        CREATE TABLE public.personas_tramites (
          personas_pers_id int4 NOT NULL,
          persona_tipo_pers_id int4 NOT NULL,
          tramites_tram_id int4 NOT NULL,
          personas_parroquia_parr_id int4 NOT NULL,
          personas_parr_muni_id int4 NOT NULL,
          personas_parr_muni_estado_id int4 NOT NULL,
          CONSTRAINT personas_tramites_pkey PRIMARY KEY (personas_pers_id, personas_parroquia_parr_id, personas_parr_muni_id, personas_parr_muni_estado_id, persona_tipo_pers_id, tramites_tram_id)
        );
        CREATE INDEX personas_tramites_fk_personas_tramites_personas1 ON public.personas_tramites USING btree (personas_pers_id, personas_parroquia_parr_id, personas_parr_muni_id, personas_parr_muni_estado_id, persona_tipo_pers_id);
        CREATE INDEX personas_tramites_fk_personas_tramites_tramites1 ON public.personas_tramites USING btree (tramites_tram_id);

        CREATE TABLE public.personas_tramites_new (
          personas_pers_id int4 NOT NULL,
          persona_tipo_pers_id int4 NOT NULL,
          tramites_tram_id int4 NOT NULL,
          CONSTRAINT personas_tramites_new_pkey PRIMARY KEY (personas_pers_id, persona_tipo_pers_id, tramites_tram_id)
        );
        CREATE INDEX personas_tramites_new_fk_personas_tramites_personas1 ON public.personas_tramites_new USING btree (personas_pers_id, persona_tipo_pers_id);
        CREATE INDEX personas_tramites_new_fk_personas_tramites_tramites1 ON public.personas_tramites_new USING btree (tramites_tram_id);

        CREATE TABLE public.procedencia (
          id_procedencia serial4 NOT NULL,
          procedencia varchar(300) NOT NULL
        );

        CREATE TABLE public.rangos (
          id_dependencia int4 NOT NULL,
          rango_inicial varchar(13) NOT NULL,
          rango_final varchar(13) NOT NULL,
          CONSTRAINT id_dependencia_pk PRIMARY KEY (id_dependencia)
        );

        CREATE TABLE public.rangos_actas (
          id_rango_acta serial4 NOT NULL,
          rango_minimo int4 NOT NULL,
          rango_maximo int4 NOT NULL,
          tipo_acta bpchar(1) NOT NULL,
          CONSTRAINT rangos_actas_pkey PRIMARY KEY (id_rango_acta)
        );

        CREATE TABLE public.requisitos (
          requ_id int4 NOT NULL,
          requ_descripcion varchar(1000) NULL,
          CONSTRAINT requisitos_pkey PRIMARY KEY (requ_id)
        );

        CREATE TABLE public.requisitos_bck (
          requ_id int4 NULL,
          requ_descripcion varchar(1000) NULL
        );

        CREATE TABLE public.resp_grupo_familiar (
          grup_fami_id int4 NULL,
          grup_fami_nombre varchar(90) NULL,
          grup_fami_edad int4 NULL,
          grup_fami_ingreso float8 NULL,
          parentesco_pare_id int4 NULL,
          ocupacion_ocup_id int4 NULL
        );

        CREATE TABLE public.servicios (
          serv_id int4 NOT NULL,
          serv_descripcion varchar(400) NULL,
          areas_area_id int4 NOT NULL,
          serv_recurrencia bool DEFAULT false NOT NULL,
          CONSTRAINT servicios_pkey PRIMARY KEY (serv_id, areas_area_id)
        );
        CREATE INDEX index_serv_desc ON public.servicios USING btree (serv_descripcion);
        CREATE INDEX servicios_fk_servicios_areas1 ON public.servicios USING btree (areas_area_id);
        CREATE UNIQUE INDEX servicios_serv_id_key ON public.servicios USING btree (serv_id);

        CREATE TABLE public.servicios_bck (
          serv_id int4 NULL,
          serv_descripcion varchar(45) NULL,
          areas_area_id int4 NULL
        );

        CREATE TABLE public.statdep (
          depe_serv_depe_id int4 NULL,
          tramites_tram_id int4 NULL
        );

        CREATE TABLE public.status (
          stat_id int4 NOT NULL,
          stat_descripcion varchar(45) NOT NULL,
          stat_id_ids varchar(20) NULL,
          CONSTRAINT status_pkey PRIMARY KEY (stat_id)
        );

        CREATE TABLE public.status_tramites (
          tramites_tram_id int4 NOT NULL,
          fecha timestamp NULL,
          status_stat_id int4 NOT NULL,
          usuarios_usua_cedula varchar(12) NOT NULL,
          status_observacion text NULL,
          monto_aprobado numeric(16, 2) DEFAULT 0 NULL,
          CONSTRAINT status_tramites_pkey PRIMARY KEY (tramites_tram_id, status_stat_id)
        );
        CREATE INDEX fk_status_tramites_usuarios1 ON public.status_tramites USING btree (usuarios_usua_cedula);
        CREATE INDEX "status_tramites_fk_Status_has_tramites_tramites1" ON public.status_tramites USING btree (tramites_tram_id);
        CREATE INDEX status_tramites_fk_status_tramites_status1 ON public.status_tramites USING btree (status_stat_id);

        CREATE TABLE public.status_tramites_2014 (
          tramites_tram_id int4 NULL,
          fecha timestamp NULL,
          status_stat_id int4 NULL,
          usuarios_usua_cedula varchar(12) NULL,
          status_observacion text NULL,
          monto_aprobado numeric(16, 2) NULL
        );

        CREATE TABLE public.tablas (
          tab_id serial4 NOT NULL,
          tab_nom varchar(255) NOT NULL,
          tab_precio numeric(14, 2) DEFAULT 0 NULL,
          tab_unidad_medida varchar(25) NULL,
          CONSTRAINT pk_tablas PRIMARY KEY (tab_id)
        );

        CREATE TABLE public.tipo_acceso (
          tipo_acce_id serial4 NOT NULL,
          tipo_acce_descripcion varchar(45) NOT NULL,
          CONSTRAINT tipo_acceso_pkey PRIMARY KEY (tipo_acce_id)
        );

        CREATE TABLE public.tipo_gasto (
          gasto_id serial4 NOT NULL,
          gasto_descripcion varchar(150) NOT NULL,
          CONSTRAINT tipo_gasto_gasto_descripcion_key UNIQUE (gasto_descripcion),
          CONSTRAINT tipo_gasto_pkey PRIMARY KEY (gasto_id)
        );

        CREATE TABLE public.tipo_ingreso (
          tip_ing_id serial4 NOT NULL,
          tip_ing_descripcion varchar(20) NOT NULL,
          CONSTRAINT tipo_ingreso_pkey PRIMARY KEY (tip_ing_id),
          CONSTRAINT tipo_ingreso_tip_ing_descripcion_key UNIQUE (tip_ing_descripcion)
        );

        CREATE TABLE public.tipo_persona (
          tipo_pers_id serial4 NOT NULL,
          tipo_pers_desc varchar(45) NOT NULL,
          CONSTRAINT tipo_persona_pkey PRIMARY KEY (tipo_pers_id)
        );

        CREATE TABLE public.tipo_servicio (
          tipo_serv_id serial4 NOT NULL,
          tipo_serv_descripcion varchar(25) NOT NULL,
          CONSTRAINT tipo_servicio_pkey PRIMARY KEY (tipo_serv_id)
        );

        CREATE TABLE public.tipo_tenencia (
          tipo_tene_id serial4 NOT NULL,
          tipo_tene_decripcion varchar(30) NOT NULL,
          CONSTRAINT tipo_tenencia_pkey PRIMARY KEY (tipo_tene_id)
        );

        CREATE TABLE public.tipo_vivienda (
          tip_vivi_id serial4 NOT NULL,
          tip_vivi_descripcion varchar(30) NOT NULL,
          CONSTRAINT tipo_vivienda_pkey PRIMARY KEY (tip_vivi_id)
        );

        CREATE TABLE public.tipos_contacto (
          tipo_id int4 NOT NULL,
          tipo_descripcion varchar(45) NULL,
          CONSTRAINT tipos_contacto_pkey PRIMARY KEY (tipo_id)
        );

        CREATE TABLE public.tramite_procedencia (
          id_tram_proc serial4 NOT NULL,
          tram_id int4 NOT NULL,
          id_procedencia int4 NOT NULL
        );

        CREATE TABLE public.tramite_rangos (
          id_tramite int4 NOT NULL,
          nro_tramite varchar(13) NOT NULL,
          id_dependencia int4 NOT NULL,
          id_romulo serial4 NOT NULL,
          CONSTRAINT pk_id_romulo PRIMARY KEY (id_romulo)
        );
        CREATE INDEX index_id_dependencia ON public.tramite_rangos USING btree (id_dependencia);
        CREATE UNIQUE INDEX index_id_tramite ON public.tramite_rangos USING btree (id_tramite);
        CREATE INDEX index_nro_tramite ON public.tramite_rangos USING btree (nro_tramite);

        CREATE TABLE public.tramite_rangos_180724 (
          id_tramite int4 NULL,
          nro_tramite varchar(13) NULL,
          id_dependencia int4 NULL,
          id_romulo int4 NULL
        );

        CREATE TABLE public.tramite_rangos_2014 (
          id_tramite int4 NULL,
          nro_tramite varchar(13) NULL,
          id_dependencia int4 NULL,
          id_romulo int4 NULL
        );

        CREATE TABLE public.tramite_rangos_bk (
          id_tramite int4 NULL,
          nro_tramite varchar(13) NULL,
          id_dependencia int4 NULL,
          id_romulo int4 NULL
        );

        CREATE TABLE public.tramites (
          tram_id serial4 NOT NULL,
          tram_fecha_inicio timestamp(0) NULL,
          tram_monto numeric(16, 2) NOT NULL,
          tram_descripcion text NULL,
          usua_cedula varchar(12) NULL,
          CONSTRAINT tramites_pkey PRIMARY KEY (tram_id)
        );

        CREATE TABLE public.usuarios (
          usua_cedula varchar(12) NOT NULL,
          usua_nombre varchar(60) NOT NULL,
          usua_login varchar(20) NOT NULL,
          usua_password varchar(40) NOT NULL,
          dependencias_depe_id int4 NOT NULL,
          usua_cts varchar(6) NULL,
          status bpchar(1) DEFAULT 'A'::bpchar NULL,
          CONSTRAINT usuarios_pkey PRIMARY KEY (usua_cedula, dependencias_depe_id)
        );
        CREATE INDEX usuarios_fk_usuarios_dependencias1 ON public.usuarios USING btree (dependencias_depe_id);
        CREATE UNIQUE INDEX usuarios_usua_cedula_key ON public.usuarios USING btree (usua_cedula);

        CREATE TABLE public.verf (
          spd varchar(50) NOT NULL,
          spdtip_solic varchar(100) NOT NULL,
          spdfirm_ing varchar(3) NOT NULL,
          spdsello_despa varchar(3) NOT NULL,
          spdfirm_sello varchar(3) NULL,
          spdfirm_bene varchar(3) NOT NULL,
          spdfech varchar(3) NOT NULL,
          spdcoin_ff varchar(3) NOT NULL,
          pos_fac varchar(3) NOT NULL,
          pos_exp_mot varchar(3) NULL,
          slfech varchar(3) NOT NULL,
          slced_rep varchar(3) NOT NULL,
          slsolven varchar(3) NOT NULL,
          pos_act_cons varchar(3) NOT NULL,
          ccfech date NULL,
          ccresp varchar(3) NOT NULL,
          nro_exp varchar(30) NOT NULL,
          adfech varchar(3) NOT NULL,
          adfirm_ing varchar(3) NOT NULL,
          adfirm_conf varchar(3) NOT NULL,
          adhue varchar(3) NOT NULL,
          aufech varchar(3) NOT NULL,
          aufirm_ing varchar(3) NOT NULL,
          aufirm_trabaj varchar(3) NOT NULL,
          aumont numeric(20, 2) NOT NULL,
          crdfech varchar(3) NOT NULL,
          crdfirm_sol varchar(3) NOT NULL,
          crdfirm_func varchar(3) NOT NULL,
          csfech varchar(3) NOT NULL,
          cs_dhnro_cas varchar(3) NOT NULL,
          cs_dhav_call_ver varchar(3) NOT NULL,
          cs_dhsect varchar(3) NOT NULL,
          cs_dhparroq varchar(3) NOT NULL,
          cs_dhmunicp varchar(3) NOT NULL,
          cspos_telf varchar(3) NOT NULL,
          csfirm varchar(3) NOT NULL,
          cshue varchar(3) NOT NULL,
          cedsol varchar(3) NOT NULL,
          cedbenef varchar(3) NOT NULL,
          cedpart_nac varchar(3) NOT NULL,
          iffech varchar(3) NOT NULL,
          iffirm_sello varchar(3) NOT NULL,
          ifnomb varchar(3) NOT NULL,
          ifsello_inst varchar(3) NOT NULL,
          imfech varchar(3) NOT NULL,
          imfirm_sello varchar(3) NOT NULL,
          imsello_inst varchar(3) NOT NULL,
          imnomb varchar(3) NOT NULL,
          present_inform varchar(3) NOT NULL,
          cipfech varchar(3) NOT NULL,
          cipfirm varchar(3) NOT NULL,
          cipmemb_rif varchar(3) NOT NULL,
          p1fech varchar(3) NOT NULL,
          p1firm varchar(3) NOT NULL,
          p1memb varchar(3) NOT NULL,
          p2fech varchar(3) NOT NULL,
          p2firm varchar(3) NOT NULL,
          p2memb varchar(3) NOT NULL,
          p3fech varchar(3) NOT NULL,
          p3firm varchar(3) NOT NULL,
          p3memb varchar(3) NOT NULL,
          cdpfech varchar(3) NOT NULL,
          cdpfirm_sell varchar(3) NOT NULL,
          cdpmemb_rif varchar(3) NOT NULL,
          gfpos_lag varchar(3) NOT NULL,
          gfpos_act_defun varchar(3) NOT NULL,
          gfdict_leg varchar(3) NOT NULL,
          inst_revi varchar(3) NOT NULL,
          foli_exp varchar(3) NOT NULL,
          num_exp_auto varchar(3) NOT NULL,
          fecha_actual date NOT NULL,
          id serial4 NOT NULL
        );

        CREATE TABLE public.celdas (
          x int4 NOT NULL,
          y int4 NOT NULL,
          tab_id int4 NOT NULL,
          valor varchar(255) NULL,
          CONSTRAINT pk_celdas PRIMARY KEY (tab_id, x, y),
          CONSTRAINT fk_tablas_celdas FOREIGN KEY (tab_id) REFERENCES public.tablas(tab_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE public.depen_serv_requi_tramites (
          requisitos_requ_id int4 NOT NULL,
          depe_serv_depe_id int4 NOT NULL,
          depe_serv_id int4 NOT NULL,
          servicios_area_id int4 NOT NULL,
          tramites_tram_id int4 NOT NULL,
          CONSTRAINT depen_serv_requi_tramites_temp_pk PRIMARY KEY (tramites_tram_id, requisitos_requ_id, depe_serv_depe_id, depe_serv_id, servicios_area_id),
          CONSTRAINT depen_serv_requi_tramites_temp_fk FOREIGN KEY (requisitos_requ_id) REFERENCES public.requisitos(requ_id),
          CONSTRAINT depen_serv_requi_tramites_temp_fk1 FOREIGN KEY (depe_serv_depe_id) REFERENCES public.dependencias(depe_id) DEFERRABLE,
          CONSTRAINT depen_serv_requi_tramites_temp_fk2 FOREIGN KEY (depe_serv_id) REFERENCES public.servicios(serv_id),
          CONSTRAINT depen_serv_requi_tramites_temp_fk3 FOREIGN KEY (servicios_area_id) REFERENCES public.areas(area_id)
        );

        CREATE TABLE public.depen_serv_requi_tramites_old (
          requisitos_requ_id int4 NOT NULL,
          depe_serv_depe_id int4 NOT NULL,
          depe_serv_id int4 NOT NULL,
          servicios_area_id int4 NOT NULL,
          tramites_tram_id int4 NOT NULL,
          CONSTRAINT depen_serv_requi_tramites_fk_depen_serv_requi_tramites1 PRIMARY KEY (tramites_tram_id, requisitos_requ_id, depe_serv_depe_id, depe_serv_id, servicios_area_id),
          CONSTRAINT depen_serv_requi_tramites_fk FOREIGN KEY (requisitos_requ_id) REFERENCES public.requisitos(requ_id),
          CONSTRAINT depen_serv_requi_tramites_fk1 FOREIGN KEY (depe_serv_depe_id) REFERENCES public.dependencias(depe_id) DEFERRABLE,
          CONSTRAINT depen_serv_requi_tramites_fk2 FOREIGN KEY (depe_serv_id) REFERENCES public.servicios(serv_id),
          CONSTRAINT depen_serv_requi_tramites_fk3 FOREIGN KEY (servicios_area_id) REFERENCES public.areas(area_id)
        );

        CREATE TABLE public.directores (
          id_director serial4 NOT NULL,
          dir_nombre varchar(80) NOT NULL,
          dir_cargo varchar(120) NOT NULL,
          id_depen int4 NOT NULL,
          dir_nivel int4 NOT NULL,
          estatus bpchar(1) NOT NULL,
          CONSTRAINT directores_pkey PRIMARY KEY (id_director),
          CONSTRAINT directores_fk FOREIGN KEY (id_depen) REFERENCES public.dependencias(depe_id)
        );

        CREATE TABLE public.division (
          div_id int4 NOT NULL,
          div_descripcion varchar(300) NOT NULL,
          depe_id int4 NOT NULL,
          CONSTRAINT division_pkey PRIMARY KEY (div_id),
          CONSTRAINT division_fk FOREIGN KEY (depe_id) REFERENCES public.dependencias(depe_id)
        );

        CREATE TABLE public.ficha (
          ficha_id serial4 NOT NULL,
          ficha_plano_socio text NULL,
          ficha_situacion text NULL,
          ficha_recomendaciones text NULL,
          ficha_fecha date NOT NULL,
          ficha_lugar varchar(45) NOT NULL,
          alqui_monto float8 NULL,
          tipo_vivienda_tip_vivi_id int4 NOT NULL,
          tipo_tenencia_tipo_tene_id int4 NOT NULL,
          tipo_acceso_tipo_acce_id int4 NOT NULL,
          tramite_tram_id int4 NOT NULL,
          foto_1 varchar(250) NULL,
          foto_2 varchar(250) NULL,
          usua_cedula varchar(12) NULL,
          CONSTRAINT ficha_pkey PRIMARY KEY (ficha_id, tipo_vivienda_tip_vivi_id, tipo_tenencia_tipo_tene_id, tipo_acceso_tipo_acce_id, tramite_tram_id),
          CONSTRAINT ficha_fk FOREIGN KEY (tramite_tram_id) REFERENCES public.tramites(tram_id)
        );
        CREATE UNIQUE INDEX ficha_ficha_id_key ON public.ficha USING btree (ficha_id);
        CREATE INDEX ficha_fk_ficha_tipo_acceso1 ON public.ficha USING btree (tipo_acceso_tipo_acce_id);
        CREATE INDEX ficha_fk_ficha_tipo_tenencia1 ON public.ficha USING btree (tipo_tenencia_tipo_tene_id);
        CREATE INDEX ficha_fk_ficha_tipo_vivienda1 ON public.ficha USING btree (tipo_vivienda_tip_vivi_id);
        CREATE UNIQUE INDEX ficha_fk_ficha_tram_id1 ON public.ficha USING btree (tramite_tram_id);
        CREATE INDEX index_ficha_id ON public.ficha USING btree (ficha_id);
        CREATE INDEX index_tenencia ON public.ficha USING btree (tipo_tenencia_tipo_tene_id);
        CREATE INDEX index_tipo_acceso ON public.ficha USING btree (tipo_acceso_tipo_acce_id);
        CREATE INDEX index_tipo_vivienda ON public.ficha USING btree (tipo_vivienda_tip_vivi_id);
        CREATE INDEX index_tram_id ON public.ficha USING btree (tramite_tram_id);

        CREATE TABLE public.ficha_caracteristica_vivienda (
          ficha_ficha_id int4 NOT NULL,
          caract_vivie_cara_vivi_id int4 NOT NULL,
          descripcion varchar(45) NULL,
          CONSTRAINT ficha_caracteristica_vivienda_fk FOREIGN KEY (ficha_ficha_id) REFERENCES public.ficha(ficha_id),
          CONSTRAINT ficha_caracteristica_vivienda_fk1 FOREIGN KEY (caract_vivie_cara_vivi_id) REFERENCES public.caracteristica_vivienda(cara_vivi_id)
        );
        CREATE INDEX ficha_caracteristica_vivienda_fk_ficha_carac_vivi_carac_vivi1 ON public.ficha_caracteristica_vivienda USING btree (caract_vivie_cara_vivi_id);
        CREATE INDEX ficha_caracteristica_vivienda_fk_ficha_carac_vivi_ficha1 ON public.ficha_caracteristica_vivienda USING btree (ficha_ficha_id);
        CREATE INDEX index_descripcion ON public.ficha_caracteristica_vivienda USING btree (descripcion);

        CREATE TABLE public.ficha_ingreso (
          ficha_ing_id serial4 NOT NULL,
          tip_ing_id int4 NOT NULL,
          ficha_ficha_id int4 NOT NULL,
          ficha_ing_monto numeric(16, 2) DEFAULT 0 NOT NULL,
          pers_persona_id int4 NOT NULL,
          CONSTRAINT ficha_ingreso_pkey PRIMARY KEY (ficha_ing_id),
          CONSTRAINT ficha_ingreso_fk FOREIGN KEY (tip_ing_id) REFERENCES public.tipo_ingreso(tip_ing_id),
          CONSTRAINT ficha_ingreso_fk1 FOREIGN KEY (ficha_ficha_id) REFERENCES public.ficha(ficha_id)
        );

        CREATE TABLE public.ficha_tipo_gasto (
          ficha_ficha_id int4 NOT NULL,
          tipo_gasto_gasto_id int4 NOT NULL,
          monto varchar(10) NULL,
          CONSTRAINT ficha_tipo_gasto_pkey PRIMARY KEY (ficha_ficha_id, tipo_gasto_gasto_id),
          CONSTRAINT ficha_tipo_gasto_fk FOREIGN KEY (ficha_ficha_id) REFERENCES public.ficha(ficha_id)
        );

        CREATE TABLE public.ficha_tipo_servicio (
          ficha_ficha_id int4 NOT NULL,
          tipo_servicio_tipo_serv_id int4 NOT NULL,
          CONSTRAINT ficha_tipo_servicio_pkey PRIMARY KEY (ficha_ficha_id, tipo_servicio_tipo_serv_id),
          CONSTRAINT ficha_tipo_servicio_fk FOREIGN KEY (ficha_ficha_id) REFERENCES public.ficha(ficha_id)
        );
        CREATE INDEX ficha_tipo_servicio_fk_ficha_has_tipo_servicio_ficha1 ON public.ficha_tipo_servicio USING btree (ficha_ficha_id);
        CREATE INDEX ficha_tipo_servicio_fk_ficha_has_tipo_servicio_tipo_servicio1 ON public.ficha_tipo_servicio USING btree (tipo_servicio_tipo_serv_id);

        CREATE TABLE public.fundesta_acta (
          id_acta_fun serial4 NOT NULL,
          id_tramite int4 NOT NULL,
          tipo_credito varchar(60) NOT NULL,
          finaciado varchar(60) NOT NULL,
          actividad varchar(250) NOT NULL,
          nro_acta varchar(10) NOT NULL,
          fecha date NOT NULL,
          monto_recom numeric(10, 2) NULL,
          capital_tra_bs numeric(10, 2) NULL,
          capital_plazo varchar(10) NULL,
          capital_cuotas int4 NULL,
          capital_pago varchar(20) NULL,
          capital_interes varchar(5) NULL,
          equipo_bs numeric(10, 2) NULL,
          equipo_plazo varchar(10) NULL,
          equipo_cuotas int4 NULL,
          equipo_pago varchar(20) NULL,
          equipo_interes varchar(5) NULL,
          infra_bs numeric(10, 2) NULL,
          infra_plazo varchar(10) NULL,
          infra_cuotas int4 NULL,
          infra_pago varchar(20) NULL,
          infra_interes varchar(5) NULL,
          fianza text NULL,
          fianza_ci varchar(12) NULL,
          hipoteca text NULL,
          valor_hipo numeric(10, 2) NULL,
          observacion text NULL,
          usua_cedula varchar(12) NULL,
          periodoa varchar(40) NULL,
          periodob varchar(40) NULL,
          periodoc varchar(40) NULL,
          tipo_acta bpchar(1) NULL,
          resolucion varchar(10) NULL,
          CONSTRAINT fundesta_acta_pkey PRIMARY KEY (id_acta_fun),
          CONSTRAINT fundesta_acta_fk FOREIGN KEY (id_tramite) REFERENCES public.tramites(tram_id)
        );

        CREATE TABLE public.inspector (
          insp_cedula varchar(12) NOT NULL,
          insp_nombre varchar(40) NULL,
          insp_apellido varchar(40) NULL,
          insp_telf varchar(14) NULL,
          depe_id int4 NULL,
          insp_id int4 NULL,
          mate_id int4 NULL,
          cantidad float4 NULL,
          CONSTRAINT inspector_insp_cedula_key PRIMARY KEY (insp_cedula),
          CONSTRAINT inspector_fk FOREIGN KEY (depe_id) REFERENCES public.dependencias(depe_id)
        );

        CREATE TABLE public.listas (
          lista_id serial4 NOT NULL,
          lista_fecha timestamp NULL,
          dependencia_depe_id int4 NULL,
          aprobado varchar(15) NULL,
          CONSTRAINT listas_idx PRIMARY KEY (lista_id),
          CONSTRAINT listas_fk FOREIGN KEY (dependencia_depe_id) REFERENCES public.dependencias(depe_id)
        );

        CREATE TABLE public.listas_tramites (
          lista_lista_id int4 NOT NULL,
          tramites_tram_id int4 NOT NULL,
          lista_id int4 NULL,
          lista_fecha varchar(50) NULL,
          dependencia_depe_id int4 NULL,
          aprobado int4 NULL,
          CONSTRAINT listas_tramites_idx PRIMARY KEY (lista_lista_id, tramites_tram_id),
          CONSTRAINT listas_tramites_fk FOREIGN KEY (lista_lista_id) REFERENCES public.listas(lista_id),
          CONSTRAINT listas_tramites_fk1 FOREIGN KEY (tramites_tram_id) REFERENCES public.tramites(tram_id)
        );

        CREATE TABLE public.supervision (
          sup_id int4 NOT NULL,
          foto1 varchar(200) NULL,
          foto2 varchar(200) NULL,
          foto3 varchar(200) NULL,
          foto4 varchar(200) NULL,
          observaciones text NULL,
          recomendaciones text NULL,
          sup_fecha date NOT NULL,
          porcentaje varchar(100) NOT NULL,
          tramite_id int4 NOT NULL,
          insp_cedula varchar(12) NOT NULL,
          CONSTRAINT pk_supervision PRIMARY KEY (sup_id),
          CONSTRAINT fk_inspector_supervicion FOREIGN KEY (insp_cedula) REFERENCES public.inspector(insp_cedula) ON DELETE RESTRICT ON UPDATE CASCADE,
          CONSTRAINT fk_tramite_supervision FOREIGN KEY (tramite_id) REFERENCES public.tramites(tram_id) ON DELETE RESTRICT ON UPDATE CASCADE
        );

        CREATE TABLE public.tramite_acta (
          id_tramite_acta serial4 NOT NULL,
          id_tramite int4 NOT NULL,
          num_acta int4 NULL,
          tipo_acta bpchar(1) NOT NULL,
          usua_cedula varchar(12) NOT NULL,
          monto numeric(16, 2) NULL,
          cheque_carta varchar(10) NULL,
          fecha date NOT NULL,
          nombre_autorizado varchar(60) NULL,
          cedula_autorizado varchar(12) NULL,
          direccion_autorizado text NULL,
          num_acta_aprobacion varchar(20) NULL,
          banco varchar(60) NULL,
          fecha_cheque date NULL,
          cantidad int4 NULL,
          fecha_acta_aprobacion date NULL,
          observacion text NULL,
          tiempo varchar(3) NULL,
          CONSTRAINT tramite_acta_pkey PRIMARY KEY (id_tramite_acta),
          CONSTRAINT tramite_acta_fk FOREIGN KEY (id_tramite) REFERENCES public.tramites(tram_id)
        );
        CREATE INDEX tramite_acta_num_acta_key ON public.tramite_acta USING btree (num_acta);

        CREATE TABLE public.ubicacion_tramite (
          ubi_id int4 NOT NULL,
          ubi_fecha timestamp NOT NULL,
          ubi_observacion text NULL,
          id_tramite int4 NOT NULL,
          depe_id int4 NOT NULL,
          id_usuario varchar(12) NOT NULL,
          id_division int4 NOT NULL,
          id_usua_emisor varchar(12) NULL,
          CONSTRAINT ubicacion_tramite_pkey PRIMARY KEY (ubi_id),
          CONSTRAINT ubicacion_tramite_fk FOREIGN KEY (id_tramite) REFERENCES public.tramites(tram_id),
          CONSTRAINT ubicacion_tramite_fk1 FOREIGN KEY (depe_id) REFERENCES public.dependencias(depe_id),
          CONSTRAINT ubicacion_tramite_fk2 FOREIGN KEY (id_usuario) REFERENCES public.usuarios(usua_cedula),
          CONSTRAINT ubicacion_tramite_fk3 FOREIGN KEY (id_division) REFERENCES public.division(div_id)
        );

        CREATE TABLE public.fun_acta_dir (
          id_dir_fun serial4 NOT NULL,
          id_acta_fun int4 NOT NULL,
          id_director int4 NOT NULL,
          CONSTRAINT fun_acta_dir_pkey PRIMARY KEY (id_dir_fun),
          CONSTRAINT fun_acta_dir_fk FOREIGN KEY (id_acta_fun) REFERENCES public.fundesta_acta(id_acta_fun),
          CONSTRAINT fun_acta_dir_fk1 FOREIGN KEY (id_director) REFERENCES public.directores(id_director)
        );

        CREATE TABLE public.inspeccion (
          insp_id int4 DEFAULT nextval('inspeccion_insp_id'::regclass) NOT NULL,
          insp_fecha date NULL,
          insp_tipo_obra varchar(40) NULL,
          insp_foto_1 varchar(100) NULL,
          insp_foto_2 varchar(100) NULL,
          insp_complementaria text NULL,
          insp_problematica text NULL,
          tramite_id int4 NOT NULL,
          insp_cedula varchar(12) NOT NULL,
          insp_eliminado int4 DEFAULT 1 NOT NULL,
          insp_foto_3 varchar(100) NULL,
          insp_foto_4 varchar(100) NULL,
          insp_foto_5 varchar(100) NULL,
          insp_foto_6 varchar(100) NULL,
          CONSTRAINT inspeccion_idx PRIMARY KEY (insp_id),
          CONSTRAINT inspeccion_fk FOREIGN KEY (tramite_id) REFERENCES public.tramites(tram_id),
          CONSTRAINT inspeccion_fk1 FOREIGN KEY (insp_cedula) REFERENCES public.inspector(insp_cedula)
        );

        CREATE TABLE public.inspeccion_material (
          insp_id int4 NOT NULL,
          mate_id int4 NOT NULL,
          cantidad float8 NOT NULL,
          CONSTRAINT inspeccion_material_idx PRIMARY KEY (insp_id, mate_id),
          CONSTRAINT inspeccion_material_fk FOREIGN KEY (insp_id) REFERENCES public.inspeccion(insp_id),
          CONSTRAINT inspeccion_material_fk1 FOREIGN KEY (mate_id) REFERENCES public.materiales(mate_id)
        );

        CREATE TABLE public.calculos (
          insp_id int4 NOT NULL,
          valor varchar(255) NULL,
          tab_id int4 NOT NULL,
          x int4 NOT NULL,
          y int4 NOT NULL,
          CONSTRAINT pk_calculos PRIMARY KEY (insp_id, tab_id, x, y),
          CONSTRAINT fk_calculos_inspeccion FOREIGN KEY (insp_id) REFERENCES public.inspeccion(insp_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT fk_celdas_calculos FOREIGN KEY (tab_id,x,y) REFERENCES public.celdas(tab_id,x,y) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
  },

  async down (queryInterface, Sequelize) {
    // drop table
   await queryInterface.sequelize.query()
  }
};
