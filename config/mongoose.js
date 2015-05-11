//Invocar el modo JavaScript 'strict'
'use strict';

//Carga las dependencias del modulo
var config = require('./config'),
	mongoose = require('mongoose');
//Defenir el metodo de configuracion de mongoose
module.exports = function(){
	//Usar mongoose para conectar a MongoDB
	var db = mongoose.connect(config.db);

	//Cargar el modelo "User"
	require('../app/models/user.server.model');
	//Devolver la Instancia de conexion a Mongoose
	return db;

}