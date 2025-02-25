# Endpoints de la API         |

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
  - `POST /api/mis-reservas`: Crear o actualizar una nueva reserva.
  - `DELETE /api/mis-reservas/{id}`: Eliminar una reserva.
  - `api/mis-reservas/horario/instalacion/{id}/fecha/{fecha}`: Endpoint que utiliza el front para traer los horarios disponibles de la aplicación.

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


### **4. Swagger-api **

Implementamos swagger-api para la documentación de todos los endpoints y modelos de la aplicación.

## **Instrucciones de **USUARIO**

1. Acceder a la siguiente url http://localhost:8080/swagger-ui
2. Buscar el endpoint para iniciar sesión en este caso /login
3. Iniciar sesión con uno de los usuarios de prueba
   - Usuario: `admin`
   - Contraseña: `Secreto_123`
4. En la petición copiar el jwt que se manda
5. En la parte superior de la página de swagger clickar en `Authorize`, pegar el token y validar

Con esto ya podrás probrar todos los endpoints que ofrece la aplicación 