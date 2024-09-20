# Proyecto: Microservicio de cotización de viajes

### Descripción

El presente proyecto simula una aplicación de cotización de viajes, teniendo gestión de usuarios, destinos, categorias, vehiculos, provedores, coberturas, precios y cotizaciones.

Este microservicio fue desarrollado en NodeJS usando Express, Sequelize y MySQL.

Para poder probar los endpoints de la app, una vez iniciada en docker, puedes importar en POSTMAN el archivo **TRAVEL-QUOTER.postman_collection.json**

Todos los endpoints tienen seguridad jwt, para poder acceder a ellos es necesario primero logearte con el endpoint **auth/login** con las credenciales **"username": "jeanMB"**, **"password": "123456"**(usuario creado por defecto al iniciar la base de datos).

### Construcción 🛠️
* **Lenguaje:** NodeJS 20
* **Framework:** Express, Sequelize.

## Requerimientos
- Docker instalado

## Instalación y ejecución

- Clona el proyecto.
- Copia el contenido de **.env** (que está en la carpeta **travelquoter**) a **.env** (que esta en la carpeta **travelquoter/travelquoter-service/Docker/app**).

Ejecuta el comando ```docker-compose``` dentro de la carpeta **travelquoter**.

* Construye los contenedores: ```docker-compose build```

* Inicia los servicioos: ```docker-compose up -d```

* Para los servicios: ```docker-compose stop```

Por defecto el microservicio se iniciará en el puerto:
- travelquoter-service: 8000

Revisa el archivo **.env** por si quieres cambiar algun parametro.

#### Nota

La aplicación de NodeJS probablemente lanzará una excepción la primera vez, esto porque intentará conectarse al servicio MySQL pero este aun esta inicializandose, si esto ocurre espera a que el servicio de MySQL este completamente inicializado y ejecuta el comando `docker-compose restart $QUOTER_SERVICE_NAME` en otra terminal para reiniciar el servicio de la aplicación NodeJS.

### Autores ✒️

* **Autor:** Jean Añazco Bolívar **email**: jmanubolivar@gmail.com
