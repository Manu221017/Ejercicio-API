API de Gestión de Incidentes
Esta API permite gestionar incidentes de forma sencilla. Puedes crear, ver y eliminar incidentes mediante peticiones HTTP. A continuación, te mostramos cómo interactuar con la API utilizando curl o Invoke-WebRequest en PowerShell.

Requisitos
Node.js y Express.js instalados.

API corriendo en el puerto 3000 (por defecto).

Herramienta de línea de comandos curl (o Invoke-WebRequest en PowerShell).

Endpoints
1. Crear un incidente
Para crear un nuevo incidente, usa el siguiente comando:

Bash (Linux/macOS)
bash
Copiar
Editar
curl -X POST http://localhost:3000/incidents \
-H "Content-Type: application/json" \
-d '{"reporter":"Karen","description":"Problema con impresora térmica"}'
PowerShell (Windows)
powershell
Copiar
Editar
Invoke-WebRequest -Uri "http://localhost:3000/incidents" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{"reporter":"Karen","description":"Problema con impresora térmica"}'
2. Ver todos los incidentes
Para obtener la lista de todos los incidentes, usa el siguiente comando:

Bash (Linux/macOS)
bash
Copiar
Editar
curl http://localhost:3000/incidents
PowerShell (Windows)
powershell
Copiar
Editar
Invoke-WebRequest -Uri "http://localhost:3000/incidents" `
    -Method GET
3. Eliminar un incidente
Para eliminar un incidente por su ID, usa el siguiente comando:

Bash (Linux/macOS)
bash
Copiar
Editar
curl -X DELETE http://localhost:3000/incidents/{id}
PowerShell (Windows)
powershell
Copiar
Editar
Invoke-WebRequest -Uri "http://localhost:3000/incidents/{id}" `
    -Method DELETE
Reemplaza {id} con el ID del incidente que deseas eliminar. Por ejemplo, si el ID del incidente es 1, la URL sería:

bash
Copiar
Editar
http://localhost:3000/incidents/1
Ejemplo de respuesta al eliminar un incidente:
json
Copiar
Editar
{
  "message": "Incidente eliminado correctamente"
}
Ejemplo de respuesta
Crear un incidente:
json
Copiar
Editar
{
  "id": 1,
  "reporter": "Karen",
  "description": "Problema con impresora térmica",
  "status": "pendiente",
  "created_at": "2025-04-11 02:03:56"
}
Ver todos los incidentes:
json
Copiar
Editar
[
  {
    "id": 1,
    "reporter": "Karen",
    "description": "Problema con impresora térmica",
    "status": "pendiente",
    "created_at": "2025-04-11 02:03:56"
  }
]