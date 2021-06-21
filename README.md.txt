# Personal budget

Personal budget is a website where users keep track of their expenses and incomes. This applicaction is only avaiable in spanish for now.

*Read this in other languages: [Español](README.es.md)*

This website was developed in MERN Stack:
* MongoDB database
* NodeJS + Express backend, with a full JSON Rest API
* ReactJS frontend

## Installation

Node JS and MongoDB is required to deploy both servers (Express API REST and React development server). You have to execute "npm install" in both folders (personal-budget-back and personal-budget-back front).   
Then you can edit this configuration files:
* personal-budget-back/bin/mongodb: you have to set up a valid mongoDB connection. Default configuration is setted in mongoDB localhost. You can set a remote connection like MongoAtlas if you want in this file.
* personal-budget-back/bin/www: you can change the express application port in this file. It is setted as 4000 by default.
* personal-budget-front/src/services/apirest: if you have changed the port in previous item, you need to edit it here as well. You can change the value "simulationRequestDelay", who is 200 in default. This simulates a delay of a tranmission from a remote Rest API in localhost. You must set this value in 0 if you want to deploy this application.


## Usage

When you enter the application, login form will be displayed. You can create a new user by using the link next to it.  
When the user is logged in, he will be able to access all the functions. The users are verified by JSON Web Token (JWT).