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

### **Notas:**
- Algunos endpoints tienen paginación.
- Se usa JSON para las peticiones POST y DELETE cuando se requiere enviar datos.
- Las fechas deben estar en formato `"YYYY-MM-DD"`.
- Las horas deben estar en formato `"HH:mm:ss"`.

# TAREAS QUE HAY QUE REALIZAR

crud completo reservas, mirar el controlador reservas y mirar el TO-DO Crud de usuarios tambien, como MIS-RESERVAS.
