//Invocar modo JavaScript 'strict'

'use strict';
//Cargar las dependencias del modulo
var users = require('../../app/controllers/users.server.controller'),
    tickets = require('../../app/controllers/tickets.server.controller');

//Definir el metodo routers de module
module.exports = function(app){
	//Configurar la rutas 'tickets' parametrizadas
  app.route('/api/tickets')
	.get(tickets.list)
	.post(users.requiresLogin, tickets.create);
	//Configurar las rutas 'ticket' parametrizadas
  app.route('/api/tickets/:ticketId')
	.get(tickets.read)
	.put(users.requiresLogin, tickets.hasAuthorization, tickets.update)
	.delete(users.requiresLogin, tickets.hasAuthorization, tickets.delete);

	//Configurar el parametro middleware 'ticketId'   
	app.param('ticketId', tickets.ticketByID);
};