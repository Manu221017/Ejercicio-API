API de Gestión de Incidentes
Esta es una API sencilla para gestionar incidentes, utilizando Express.js y SQLite. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre incidentes.

Requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

Node.js: Asegúrate de tener una versión de Node.js instalada en tu sistema. Puedes verificarlo con el siguiente comando:

bash
Copiar
Editar
node -v
npm: El gestor de paquetes de Node.js. Verifica su instalación con:

bash
Copiar
Editar
npm -v
Instalación
Clona este repositorio o descarga los archivos.

bash
Copiar
Editar
git clone <URL-del-repositorio>
cd <nombre-del-directorio>
Instala las dependencias del proyecto.

bash
Copiar
Editar
npm install
Esto instalará las dependencias necesarias, que incluyen:

express: Framework para construir aplicaciones web.

sqlite3: Para interactuar con bases de datos SQLite.

sqlite: Librería para manejar la base de datos SQLite.

joi: Para la validación de datos.

Uso
Inicia el servidor:

Una vez que hayas instalado todas las dependencias, puedes iniciar el servidor con el siguiente comando:

bash
Copiar
Editar
npm start
El servidor se ejecutará en el puerto 3000. Puedes acceder a él en la siguiente URL:

arduino
Copiar
Editar
http://localhost:3000
Operaciones CRUD disponibles:

La API tiene las siguientes rutas:

🔹 POST /incidents
Crea un nuevo incidente.

Body:

json
Copiar
Editar
{
  "reporter": "Nombre del reportante",
  "description": "Descripción del incidente"
}
Respuesta (éxito):

json
Copiar
Editar
{
  "id": 1,
  "reporter": "Nombre del reportante",
  "description": "Descripción del incidente",
  "status": "pendiente",
  "created_at": "2025-04-01T00:00:00Z"
}
🔹 GET /incidents
Obtiene todos los incidentes.

Respuesta:

json
Copiar
Editar
[
  {
    "id": 1,
    "reporter": "Nombre del reportante",
    "description": "Descripción del incidente",
    "status": "pendiente",
    "created_at": "2025-04-01T00:00:00Z"
  }
]
🔹 GET /incidents/:id
Obtiene un incidente específico por su ID.

Respuesta (si existe):

json
Copiar
Editar
{
  "id": 1,
  "reporter": "Nombre del reportante",
  "description": "Descripción del incidente",
  "status": "pendiente",
  "created_at": "2025-04-01T00:00:00Z"
}
Respuesta (si no existe):

json
Copiar
Editar
{
  "error": "Incidente no encontrado"
}
🔹 PUT /incidents/:id
Actualiza el estado de un incidente.

Body:

json
Copiar
Editar
{
  "status": "en proceso"
}
Respuesta (éxito):

json
Copiar
Editar
{
  "message": "Estado actualizado correctamente",
  "id": 1,
  "new_status": "en proceso"
}
Respuesta (estado inválido):

json
Copiar
Editar
{
  "error": "Estado inválido, usa: pendiente, en proceso, resuelto"
}
Respuesta (incidente no encontrado):

json
Copiar
Editar
{
  "error": "Incidente no encontrado"
}
🔹 DELETE /incidents/:id
Elimina un incidente por su ID.

Respuesta (éxito):

json
Copiar
Editar
{
  "message": "Incidente eliminado correctamente"
}
Respuesta (incidente no encontrado):

json
Copiar
Editar
{
  "error": "Incidente no encontrado"
}
Base de Datos
La base de datos se maneja a través de SQLite, y el archivo de la base de datos se guarda como incidents.db. No es necesario crear la base de datos manualmente, ya que se crea automáticamente cuando se ejecuta la aplicación.

Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor realiza un fork del repositorio, realiza tus cambios y envía un pull request.