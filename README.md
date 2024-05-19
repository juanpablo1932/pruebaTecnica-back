## Descripción

Prueba tecnica de backend.
Comprende CRUD de usuarios y roles, más servicio de autenticación.
No se abordaron pruebas unitarias por motivos de tiempo.

- app.listen(3000)

## Anexar variables de entorno

- Editar el nombre del archivo **.env.example** por **.env**
- Agregar los valores a las variables de entorno en el archivo **.env**. Estos valores se encuentran en el archivo **credenciales.txt** que se envía por correo electronico mediante respuesta al e-mail de la prueba tecnica enviada por Inlaze.
- Por un problema con el **process.env** en el archivo de **orm.config.ts** no se pudieron dejar puestas las variables de entorno, por ende, se deben poner las credenciales de la DB (host, username y password) directamente en el archivo **orm.config.ts**

## Inicio Docker

Ir a la raiz del proyecto por consola y ejecutar los siguientes comandos

```bash
$ npm i
$ docker-compose up -d
```

Luego de iniciar el contenedor ejecutamos el siguiente comando

```bash
$ docker-compose ps
```

copiamos el valor del parametro **NAME**

## Docker Compose

Abrimos el archivo **docker-compose.yml**.
Justo debajo de:

```yaml
ports:
  - ${PORT}
```

Pondremos lo siguiente y reemplazaremos el valor del parametro **NAME**:

```yaml
app:
  image: valor-del-parametro-NAME
  restart: always
  ports:
    - 3000:3000
  depends_on:
    - db
```

Tendríamos al final algo similar a esto:

```yaml
version: '3.1'

services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - ${PORT}
  app:
    image: inlaze-back-db-1
    restart: always
    ports:
      - 3000:3000
    depends_on:
      - db
```

## Migraciones TypeORM

En la ruta **/src** encontraremos una carpeta llamada **migrations**, esta contiene el archivo de migraciones que se encargara de crear las tablas **usuarios** y **roles**, además, poblará con algunos datos iniciales a la tabla **roles**

Para realizar la migración ejecutaremos el siguiente comando

```bash
$ npm run typeorm:migration:run
```

## Correr app

```bash
$ npm start
```

## Documentación y prueba de endpoints

- Swagger - [Documentación](http://localhost:3000/docs#/)
- Para poder consumir los servicios se debe en primer lugar hacer un proceso de registro por medio del endpoint **/users/register**
- Luego de estar registrados debemos hacer el proceso de login por medio del endpoint **/auth/login** . Esto con el fin de poder obtener el Token JWT y autorizar el Swagger para el correcto funcionamiento de los demás endpoints.
- Por ultimo, se podrá disponer del resto de endpoints los cuales se encuentran protegidos por el **jwt** , estos servicios comprenden el CRUD de usuarios y roles.
