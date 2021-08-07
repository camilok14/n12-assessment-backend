## Descripción
Servicio REST que administra el recurso `rides` en la solución del desafío técnico de nextchallenge

## Instalar dependencias
Este software funciona con node en su versión `v14.17.4`, para instalar las dependencias se debe ejecutar:
```bash
$ npm install
```

## Base de datos
Este servicio requiere conectarse a una base de datos `mongodb` cuyo string de conexión debe estar configurado en la variable de entorno `MONGODB_URI`. Una forma fácil de levantar mongodb y exponerlo en el puerto `27017` de forma local es a través de un contenedor docker, con la instrucción:
```bash
$ docker run -it -p 27017:27017 mongo
```

## Configuración de variables de entorno
Por defecto, este repositorio ignora los archivos con extensión `.env`. Para levantar el servicio de forma local, es buena idea crear un archivo con las variables de entorno. Por ejemplo, el archivo `local.env` puede tener el siguiente contenido:
```
PORT=3000
MONGODB_URI='mongodb://localhost:27017/n12-assessment-database'
```

## Ejecutar la aplicación
Luego de tener la base de datos disponible y haber configurado las variables de entorno en el archivo `local.env`, se puede levantar el servicio ejecutando:
```bash
$ npm run start:local
```

## Tests unitarios
Luego de haber instalado las dependencias, se pueden ejecutar los tests unitarios con el comando:
```bash
$ npm run test:unit
```
Para ver un reporte de cobertura de código de los tests unitarios se puede ejecutar:
```bash
$ npm run test:cov
```

## Test funcionales
Los test funcionales levantan el servicio y realizan peticiones POST y GET contra el mismo. Para poder ejecutarlos es necesario tener disponible una base de datos como la descrita anteriormente que debe estar limpia (sin datos previos, para que los resultados de las peticiones GET no sean distintos a los esperados) y además se deben definir las variables de entorno descritas en los el parrafos anteriores en el archivo `local.env`. Para ejecutarlos se debe usar el comando:
```bash
$ npm run test:functional
 ```

 ## Imagen docker
 Se ha publicado la imagen docker `camilok14/n12-assessment-backend` se puede ejecutar configurando sus variables y otorgando acceso a la correspondiente base de datos, por ejemplo, con la instrucción:
 ```bash
 $ docker run -it --network host -e MONGODB_URI='mongodb://localhost:27017/n12-assessment-database' camilok14/n12-assessment-backend
 ```
