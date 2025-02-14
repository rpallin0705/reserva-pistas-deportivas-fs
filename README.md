# Endpoints de la API

## **ADMIN**
| Método  | Endpoint                                     | Descripción                            | Respuesta HTTP | Cuerpo (JSON) requerido |
|---------|---------------------------------------------|----------------------------------------|---------------|--------------------------|
| GET     | `/api/admin/instalacion`                   | Obtener instalaciones                 | 200 OK        | -                        |
| POST    | `/api/admin/instalacion`                   | Crear instalación                     | 201 Created   | ```json { "nombre": "string", "ubicacion": "string" } ``` |
| DELETE  | `/api/admin/instalacion`                   | Eliminar instalación                  | 204 No Content | ```json { "id": 1 } ```  |
| GET     | `/api/admin/horario/instalacion/{id}`      | Obtener horarios de una instalación   | 200 OK        | -                        |
| POST    | `/api/admin/horario/instalacion/{id}`      | Crear horario                         | 201 Created   | ```json { "dia": "string", "hora_inicio": "HH:mm:ss", "hora_fin": "HH:mm:ss" } ``` |
| DELETE  | `/api/admin/horario/instalacion/{id}`      | Eliminar horario                      | 204 No Content | ```json { "id": 1 } ```  |
| GET     | `/api/admin/reserva`                       | Obtener reservas                      | 200 OK        | -                        |
| GET     | `/api/admin/reserva/usuario/{id}`         | Obtener reservas de un usuario        | 200 OK        | -                        |
| GET     | `/api/admin/reserva/instalacion/{id}`     | Obtener reservas de una instalación   | 200 OK        | -                        |
| GET     | `/api/admin/reserva/instalacion/{id}/now` | Obtener reservas actuales             | 200 OK        | -                        |
| GET     | `/api/admin/reserva/instalacion/{id}/today` | Obtener reservas del día              | 200 OK        | -                        |
| GET     | `/api/admin/reserva/from/{fecha-inicio}`  | Obtener reservas desde una fecha      | 200 OK        | -                        |
| GET     | `/api/admin/reserva/to/{fecha-fin}`       | Obtener reservas hasta una fecha      | 200 OK        | -                        |
| GET     | `/api/admin/usuario`                      | Obtener usuarios                      | 200 OK        | -                        |
| POST    | `/api/admin/usuario`                      | Crear usuario                         | 201 Created   | ```json { "nombre": "string", "email": "string", "rol": "string" } ``` |
| DELETE  | `/api/admin/usuario`                      | Eliminar usuario                      | 204 No Content | ```json { "id": 1 } ```  |

## **USUARIO**
| Método  | Endpoint                                       | Descripción                              | Respuesta HTTP | Cuerpo (JSON) requerido |
|---------|-----------------------------------------------|------------------------------------------|---------------|--------------------------|
| GET     | `/api/instalacion`                            | Obtener instalaciones (Opcional)        | 200 OK        | -                        |
| GET     | `/api/horario`                                | Obtener horarios                        | 200 OK        | -                        |
| GET     | `/api/mis-reservas`                           | Obtener reservas del usuario (orden inverso) | 200 OK        | -                        |
| GET     | `/api/reservar/instalacion/{id}/{fecha}/{fecha}` | Lista de horarios disponibles          | 200 OK        | -                        |
| POST    | `/api/reservar`                               | Crear una reserva                       | 201 Created   | ```json { "usuario_id": 1, "instalacion_id": 1, "fecha": "YYYY-MM-DD", "hora": "HH:mm:ss" } ``` |
| PUT     | `/api/mis-reservas/{id}`                      | Actualizar una reserva                  | 200 OK        | ```json { "horario_id": 1, "fecha": "YYYY-MM-DD" } ``` |
| DELETE  | `/api/mis-reservas/{id}`                      | Eliminar una reserva                    | 204 No Content | -                        |
| GET     | `/api/horario/instalacion/{id}/fecha/{fecha}` | Obtener horarios disponibles para una instalación y fecha | 200 OK | -                        |

## **AUTENTICACIÓN**
| Método  | Endpoint                                       | Descripción                              | Respuesta HTTP | Cuerpo (JSON) requerido |
|---------|-----------------------------------------------|------------------------------------------|---------------|--------------------------|
| POST    | `/api/auth/login`                             | Iniciar sesión                          | 200 OK        | ```json { "username": "string", "password": "string" } ``` |
| POST    | `/api/auth/logout`                            | Cerrar sesión                           | 200 OK        | -                        |

### **Notas:**
- Algunos endpoints tienen paginación.
- Se usa JSON para las peticiones POST, PUT y DELETE cuando se requiere enviar datos.
- Las fechas deben estar en formato `"YYYY-MM-DD"`.
- Las horas deben estar en formato `"HH:mm:ss"`.
- Para los endpoints de reservas, el usuario debe estar autenticado.
- Los endpoints de `mis-reservas` solo permiten operaciones sobre las reservas del usuario logueado.

### **Nuevas Funcionalidades Añadidas**

1. **CRUD de Reservas para Usuarios**:
   - Los usuarios ahora pueden **crear, editar y eliminar** sus reservas a través de los siguientes endpoints:
     - `POST /api/reservar`: Crear una nueva reserva.
     - `PUT /api/mis-reservas/{id}`: Actualizar una reserva existente.
     - `DELETE /api/mis-reservas/{id}`: Eliminar una reserva.

2. **Consulta de Horarios Disponibles**:
   - Se ha añadido un endpoint para obtener los horarios disponibles de una instalación en una fecha específica:
     - `GET /api/horario/instalacion/{id}/fecha/{fecha}`.

3. **Autenticación**:
   - Se han integrado los endpoints de autenticación:
     - `POST /api/auth/login`: Para iniciar sesión.
     - `POST /api/auth/logout`: Para cerrar sesión.

4. **Frontend de "Mis Reservas"**:
   - Se ha implementado un frontend en React para que los usuarios puedan:
     - Ver sus reservas (`GET /api/mis-reservas`).
     - Crear, editar y eliminar reservas desde una interfaz amigable.

### **Notas Importantes**
- Los endpoints de `mis-reservas` solo permiten operaciones sobre las reservas del usuario logueado.
- Las fechas deben estar en formato `"YYYY-MM-DD"` y las horas en `"HH:mm:ss"`.
- Se requiere autenticación para acceder a los endpoints relacionados con reservas.