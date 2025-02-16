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
| POST    | `/api/admin/usuario`                      | Crear usuario                         | 201 Created   | ```json { "username": "string", "email": "string", "password": "string", "tipo": "ADMIN/OPERARIO/USUARIO", "enabled": true/false } ``` |
| PUT     | `/api/admin/usuario/{id}`                 | Actualizar un usuario                 | 200 OK        | ```json { "username": "string", "email": "string", "password": "string", "tipo": "ADMIN/OPERARIO/USUARIO", "enabled": true/false } ``` |
| DELETE  | `/api/admin/usuario/{id}`                 | Eliminar un usuario                   | 204 No Content | -                        |

## **USUARIO**
| Método  | Endpoint                                       | Descripción                              | Respuesta HTTP | Cuerpo (JSON) requerido |
|---------|-----------------------------------------------|------------------------------------------|---------------|--------------------------|
| GET     | `/api/instalacion`                            | Obtener instalaciones (Opcional)        | 200 OK        | -                        |
| GET     | `/api/horario`                                | Obtener horarios                        | 200 OK        | -                        |
| GET     | `/api/mis-reservas`                           | Obtener reservas del usuario (orden inverso) | 200 OK        | -                        |
| GET     | `/api/reservar/instalacion/{id}/{fecha}/{fecha}` | Lista de horarios disponibles          | 200 OK        | -                        |
| POST    | `/api/reservar`                               | Crear una reserva                       | 201 Created   | ```json { "horario": { "id": 1 }, "fecha": "YYYY-MM-DD" } ``` |
| PUT     | `/api/mis-reservas/{id}`                      | Actualizar una reserva                  | 200 OK        | ```json { "horario": { "id": 1 }, "fecha": "YYYY-MM-DD" } ``` |
| DELETE  | `/api/mis-reservas/{id}`                      | Eliminar una reserva                    | 204 No Content | -                        |

## **AUTENTICACIÓN**
| Método  | Endpoint                                       | Descripción                              | Respuesta HTTP | Cuerpo (JSON) requerido |
|---------|-----------------------------------------------|------------------------------------------|---------------|--------------------------|
| POST    | `/api/auth/login`                             | Iniciar sesión                           | 200 OK        | ```json { "username": "string", "password": "string" } ``` |
| POST    | `/api/auth/logout`                            | Cerrar sesión                            | 200 OK        | -                        |

---

## **Nuevas Funcionalidades Añadidas**

### **1. CRUD de Usuarios**
- **¿Qué hace?**: Permite a los usuarios con rol `ADMIN` gestionar a otros usuarios (crear, editar, eliminar).
- **¿Por qué se añadió?**: Para que el administrador pueda gestionar los usuarios del sistema sin necesidad de acceder directamente a la base de datos.
- **Endpoints nuevos**:
  - `POST /api/admin/usuario`: Crear un nuevo usuario.
  - `PUT /api/admin/usuario/{id}`: Actualizar un usuario existente.
  - `DELETE /api/admin/usuario/{id}`: Eliminar un usuario.

### **2. Mejoras en la Interfaz de Usuario**
- **¿Qué hace?**: Muestra la pestaña "Usuarios" en el NavBar solo si el usuario logueado tiene el rol `ADMIN`.
- **¿Por qué se añadió?**: Para que solo los administradores puedan acceder a la gestión de usuarios, manteniendo la seguridad del sistema.

### **3. Formularios Intuitivos**
- **¿Qué hace?**: Los formularios de creación y edición de usuarios son fáciles de usar y validan los datos ingresados.
- **¿Por qué se añadió?**: Para mejorar la experiencia del usuario y evitar errores al ingresar datos.

---

## **Instrucciones de Uso**

1. **Iniciar Sesión**:
   - Accede a la página de login e inicia sesión con tus credenciales.
   - Si eres un `ADMIN`, verás la pestaña "Usuarios" en el NavBar.

2. **Gestionar Usuarios**:
   - Haz clic en "Usuarios" para ver la lista de usuarios.
   - Usa los botones "Añadir Usuario", "Editar" y "Eliminar" para gestionar los usuarios.

3. **Gestionar Reservas**:
   - Haz clic en "Mis Reservas" para ver, crear, editar o eliminar tus reservas.

4. **Gestionar Instalaciones**:
   - Si eres un `ADMIN`, haz clic en "Instalaciones" para gestionar las instalaciones deportivas.

---

## **Notas Adicionales**
- **Validaciones**: Los formularios validan los datos ingresados para evitar errores.
- **Manejo de Errores**: Se muestran mensajes de error descriptivos en caso de problemas.
- **Seguridad**: Las rutas y funcionalidades están protegidas según el rol del usuario.