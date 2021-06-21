# Mi presupuesto

Mi presupuesto es una aplicación web sencilla dónde el usuario puede llevar un seguimiento de sus ingresos y egresos personales de dinero. Por el momento solo se encuentra disponible en español.

*Lea este archivo en otros idiomas: [English](README.md)*

La misma está desarrollada en el stack MERN:
* MongoDB para la base de datos
* Express para la infraestructura de backend, presentando un API Rest completo con la base de datros Node.
* ReactJS para la aplicación Single Page Application de frontend.

## Instalación

Es requerida la instalación previa de NodeJS en el sistema para poder desplegar ambos servidores (Express API REST y React development server). 
Debe situarse en ambas carpetas, y ejecutar el comando npm install.  
Luego debe dirigirse a dos archivos de configuración:
* personal-budget-back/bin/mongodb: aquí debe configurar una conexión de mongoDB válida. La configuración por defecto se refiere a una instalación estándar en un servidor de mongo, pero puede colocar las credenciales necesarias si existen, o la configuración de un servidor remoto.
* personal-budget-back/bin/www: aquí puede cambiar si lo desea el puerto donde correrá la aplicación de backend. Por defecto se colocó el puerto 4000.
* personal-budget-front/src/services/apirest: aquí puede configurar la dirección del ApiRest si fue modificada en el item anterior. 

  También puede alterar la constante "simulationRequestDelay", que está por defecto en 200. La misma retrasa en el número ingresado en milisegundos a la actualización de la tabla de operaciones, para simular el retraso de un servidor remoto al realizar pruebas en local. 
  
  Debe colocarse en cero si el backend no coexiste de forma local con la aplicación React.


## Uso

Al iniciar la aplicación, se encontrará directamente con el login. Si es la primera vez en utilizarla, puede crear un usuario utilizando el enlace que se encuentra después del formulario.
Una vez ingresado, podrá acceder a las funciones de presupuesto personal. La verificación de usuario se realiza mediante JSON Web Token (JWT).
