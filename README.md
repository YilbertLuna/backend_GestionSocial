# Gestión Social Web Server

Este proyecto es un servidor web para la gestión social, desarrollado con Node.js, Express y Sequelize. Proporciona una API REST para manejar procesos, usuarios, estados, municipios, parroquias, y más.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Endpoints](#endpoints)
  - [Autenticación](#autenticación)
  - [Registro de Procesos](#registro-de-procesos)
  - [Requerimientos](#requerimientos)
  - [Localidad](#localidad)
  - [Búsqueda](#búsqueda)
  - [Mostrar Datos](#mostrar-datos)
  - [Cambio de Estado](#cambio-de-estado)
  - [Generación de PDF](#generación-de-pdf)
  - [Datos de Persona para Nuevo Proceso](#datos-de-persona-para-nuevo-proceso)
  - [Edición de Proceso](#edición-de-proceso)
  - [Reportes](#reportes)
- [Base de Datos](#base-de-datos)
- [Docker](#docker)
- [Contribuciones](#contribuciones)
- [Autor](#autor)

---

## Requisitos

- Node.js v22.14.0 o superior
- Docker y Docker Compose
- PostgreSQL (version 16.0 soportadas)

---

## Estructura del Proyecto

```plaintext
.env
.gitignore
.sequelizerc
Dockerfile
migrations/
  config/
    config.js
  20250304205930-unnamed-migration.js
src/
  index.js
  connection/
    connection.js
  controllers/
    ...
  libs/
    ...
  middleware/
    ...
  repository/
    ...
  router/
    router.js
  schemas/
    validateSchema.js
  server/
    server.js
  services/
    ...
```

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular basada en capas, lo que facilita la escalabilidad y el mantenimiento del código. A continuación, se describen las principales capas y patrones utilizados:

### 1. **Capa de Controladores**

- Los controladores se encargan de manejar las solicitudes HTTP entrantes y devolver las respuestas correspondientes.
- Validan los datos de entrada y delegan la lógica de negocio a la capa de servicios.
- Ubicación: `src/controllers/`

### 2. **Capa de Servicios**

- Contiene la lógica de negocio de la aplicación.
- Se encarga de procesar los datos y coordinar las operaciones entre los controladores y los repositorios.
- Ubicación: `src/services/`

### 3. **Capa de Repositorios**

- Implementa el **Patrón Repositorio** para interactuar con la base de datos.
- Proporciona una abstracción sobre las operaciones CRUD, utilizando Sequelize como ORM.
- Ubicación: `src/repository/`

### 4. **Capa de Middleware**

- Contiene funciones intermedias que se ejecutan antes de llegar a los controladores.
- Ejemplo: autenticación, validación de esquemas, manejo de errores.
- Ubicación: `src/middleware/`

### 5. **Capa de Rutas**

- Define los endpoints de la API y los asocia con los controladores correspondientes.
- Utiliza Express Router para organizar las rutas.
- Ubicación: `src/router/`

### 6. **Capa de Esquemas**

- Define las validaciones de entrada utilizando herramientas como `Joi`.
- Garantiza que los datos enviados por los clientes cumplan con los requisitos esperados.
- Ubicación: `src/schemas/`

### 7. **Conexión a la Base de Datos**

- Configura y gestiona la conexión con PostgreSQL utilizando Sequelize.
- Ubicación: `src/connection/`

### 8. **Servidor**

- Configura y arranca el servidor Express.
- Define middlewares globales y maneja errores no controlados.
- Ubicación: `src/server/`

---

## Configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura las variables de entorno:
   Copia el archivo `.env.example` a `.env` y completa los valores necesarios:

   ```plaintext
   PORT=3030
   DB_USERNAME=admin
   DB_PASSWORD=admin
   DB_DATABASE=postgres-dev
   DB_PORT=5432
   HOST=localhost
   DBIALECT=postgres
   TOKEN_SECRET=your-secret-key
   ```

3. Inicia los contenedores de Docker:
   ```bash
   docker compose up
   ```

---

## Comandos Disponibles

- **Iniciar el servidor en modo desarrollo:**

  ```bash
  npm run start:dev
  ```

  Este comando ejecuta las migraciones y arranca el servidor.

- **Generar una nueva migración:**

  ```bash
  npm run migration:generate --name=migration-name
  ```

- **Ejecutar migraciones:**
  ```bash
  npm run migration:run
  ```

---

## Endpoints

### Autenticación

- **POST /api/login**  
  Inicia sesión y genera un token de acceso.

- **POST /api/logout**  
  Cierra sesión eliminando el token.

- **GET /api/home**  
  Obtiene información del usuario autenticado.

### Registro de Procesos

- **POST /api/newRegister**  
  Registra un nuevo proceso.

### Requerimientos

- **GET /api/selectArea**  
  Obtiene las áreas disponibles.

- **POST /api/selectService**  
  Obtiene los servicios disponibles para un área.

- **POST /api/requeriments**  
  Obtiene los requerimientos para un servicio.

- **GET /api/referido**  
  Obtiene las referencias disponibles.

### Localidad

- **GET /api/estado**  
  Obtiene todos los estados.

- **POST /api/municipio**  
  Obtiene los municipios de un estado.

- **POST /api/parroquia**  
  Obtiene las parroquias de un municipio.

### Búsqueda

- **POST /api/searchPersons**  
  Busca personas por nombre o cédula.

- **POST /api/searchTramite**  
  Busca trámites por número o datos de la persona.

### Mostrar Datos

- **GET /api/showDataProcess/:id_tram**  
  Muestra los datos de un proceso específico.

- **GET /api/aplicantDataInfo/:person**  
  Muestra la información del solicitante.

### Cambio de Estado

- **POST /api/selectProcess**  
  Selecciona un proceso para actualizar su estado.

- **GET /api/dataProcess/:id_tram**  
  Muestra los datos de un proceso antes de actualizarlo.

- **GET /api/selectStatus**  
  Obtiene los estados disponibles para un proceso.

- **PUT /api/changeStatus**  
  Cambia el estado de un proceso.

### Generación de PDF

- **GET /api/generatePdf/:personId/:tramiteId**  
  Genera un archivo PDF con los datos proporcionados.

### Datos de Persona para Nuevo Proceso

- **GET /api/getDataPerson/:personId**  
  Obtiene los datos de una persona para iniciar un nuevo proceso.

- **POST /api/newProcess**  
  Registra un nuevo proceso para una persona existente.

### Edición de Proceso

- **GET /api/requisitosNoConsignados/:tramiteId**  
  Obtiene los requisitos no consignados de un proceso.

- **GET /api/requisitosConsignados/:tramiteId**  
  Obtiene los requisitos consignados de un proceso.

- **PUT /api/updateProcess**  
  Actualiza un proceso existente.

### Reportes

- **GET /api/listProcessApproved/**  
  Genera una lista de procesos con estado "aprobado".

---

## Base de Datos

El proyecto utiliza PostgreSQL como base de datos. Las migraciones están definidas en el directorio `migrations/`.

Para ejecutar las migraciones:

```bash
npm run migration:run
```

---

## Docker

El proyecto incluye un archivo `compose.yaml` para configurar los servicios de PostgreSQL y el servidor web.

- **Iniciar los servicios:**

  ```bash
  docker compose up
  ```

- **Servicios disponibles:**
  - `postgresql-dev-16.0`: Base de datos de desarrollo.
  - `webserver`: Servidor web.

---

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

---

## Autor

Desarrollado por [Yilbert Luna](https://github.com/YilbertLuna).
