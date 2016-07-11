//Invocar el modo JavaScript 'strict'
'use strict';

//Carga las dependencias del modulo
var config = require('./config'),
	mongoose = require('mongoose');
//Defenir el metodo de configuracion de mongoose
module.exports = function(){
	//Usar mongoose para conectar a MongoDB
	
	//Esta es la linea original
	//var db = mongoose.connect(config.db);
    //linea sustituta
    var db = mongoose.connect('mongodb://cyberspace27:1712aajj@ds027628.mlab.com:27628/time_tracking');
	//Cargar el modelo "User"
	require('../app/models/user.server.model');
	//Cargar el modelo "Tickets"
	require('../app/models/tickets.server.model');
	//Devolver la Instancia de conexion a Mongoose
	return db;

}