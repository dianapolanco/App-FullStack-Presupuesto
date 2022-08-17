# App-FullStack-Presupuesto

### Objetivo principal: ###
Desarrollar una aplicación para administración de presupuesto personal.
Permite crear, editar ingresos/egresos y eliminar transacciones y muestra un balance resultante de las operaciones registradas.

### Tecnologías utilizadas: ###
- NodeJS
- Express
- Sequelize
- MySQL
- ReactJS
- CSS
- HTML

### Para utilizar la aplicación ###
1. Descargar los archivos "client" y "server"

2. Instalar las dependencias en ambos con: **npm install**

3. Iniciar el proyecto en modo de desarrollo: Para esto, desde el lado del servidor, es necesario crear un archivo **.env** e ingresar la configuración de su MySQL

**DB_USER=Usuario, DB_HOST=Host, DB_PASSWORD=Contraseña, DB_NAME=NombreBD**

4. Correr el proyecto con **npm start**
Corre la aplicación desde el lado del servidor: Ingresar a http://localhost:5000/api/data para ver los registros en el navegador 
Corre la aplicación desde el lado del cliente: Ingresar a http://localhost:3000/ para verlo en el navegador
