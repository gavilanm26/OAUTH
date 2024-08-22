<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Microservicio de Autenticación

## Características

- Registro de usuarios con `customerKey`.
- Generación de tokens JWT para autenticación.
- Consulta, actualización y eliminación de usuarios.
- Uso de arquitectura hexagonal para la separación de responsabilidades.
- Integración con MongoDB para la persistencia de usuarios.
- Configuración lista para desplegarse en un contenedor Docker.

## Requisitos Previos

- Node.js (última versión recomendada)
- MongoDB
- Docker (opcional para despliegue en contenedores)

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz y copia las variables del archivo .env.example del proyecto

   Nota: Si estás usando Docker, no necesitas configurar el archivo `.env` manualmente, ya que las variables de entorno se configuran en el `docker-compose.yml`.

## Uso

### 1. Ejecutar el microservicio localmente

Para iniciar el microservicio en un entorno local:

```bash
npm run start:dev
```

El servicio estará disponible en `http://localhost:3000`.

### 2. Despliegue con Docker

Si prefieres ejecutar el microservicio dentro de un contenedor Docker, puedes usar el archivo `docker-compose.yml` proporcionado.

Para desplegar el microservicio utilizando Docker:

```bash
docker-compose up -d
```

El servicio estará disponible en `http://localhost:3000` y MongoDB en `mongodb://localhost:27019`.

### 3. Pruebas

#### Registro

- **URL**: `http://localhost:3000/auth/register`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "type": "CC",
    "documentNumber": "123456788",
    "firstName": "Juan",
    "secondName": "Carlos",
    "lastName": "Pérez",
    "secondLastName": "Gómez",
    "password": "MySecurePassword123"
  }
  ```
  **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login

- **URL**: `http://localhost:3000/auth/login`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "type": "CC",
    "documentNumber": "123456788",
    "password": "MySecurePassword123"
  }
  ```
  **Response**:
  ```json
  {
    "token": "token"
  }
  ```

#### Buscar todos los usuarios

- **URL**: `http://localhost:3000/auth/users`
- **Método**: `GET`
- **Response**:
  ```json
  {
    "[]"
  }
  ```

#### Actualizar Usuario

- **URL**: `http://localhost:3000/auth/users/CC123456788`
- **Método**: `PUT`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "password": "newpassword123"
  }
  ```
  **Response**:
  ```json
  {
    "[]"
  }
  ```

#### Eliminar Usuario

- **URL**: `http://localhost:3000/auth/users/CC123456788`
- **Método**: `DELETE`
  **Response**:
  ```json
  {
    "success": true
  }
  ```

## Estructura del Proyecto

El proyecto sigue una arquitectura hexagonal, organizada de la siguiente manera:

- **src/auth/domain**: Entidades y lógica de negocio.
- **src/auth/application**: Casos de uso, DTOs.
- **src/auth/infrastructure**: Implementaciones de infraestructura (repositorios, esquemas, Controladores).

## Despliegue y Uso con Docker

1. **Construir y ejecutar el contenedor**:

   ```bash
   docker-compose up -d
   ```

2. **Verificar los contenedores en ejecución**:

   ```bash
   docker ps
   ```

   Esto mostrará los contenedores `auth-service` y `auth-mongo` en ejecución.
