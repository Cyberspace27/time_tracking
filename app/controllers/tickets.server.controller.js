//Invocar modo Javascript 'strict'
'use strict';

//Cargar las dependecians del modulo
var mongoose = require('mongoose'),
     Ticket = mongoose.model('Ticket');

//Crear un nuevo metodo controller para el manejo de errores

var getErrorMessage = function(err){
	if(err.errors){
		for(var errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else{
		return 'Error de servidor desconocido';
	}
};

//Crear un nuevo metodo controller para crear nuevos tickets
exports.create = function(req, res){
	//Crear un nuevo objeto ticket
	var ticket = new Ticket(req.body);

	//Configurar la propiedad 'creador' del ticket
	ticket.creador = req.user;

	//Intentar savar e ticketl
	ticket.save(function(err){
		if(err){
			//Si ocurre algun error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			//Enviar una respresentacion JSON del ticket
			res.json(ticket);
		}
	});
};
//Crear un nuevo metodo controller que recupera una lista de tickets
exports.list = function(req, res){
	//Usar el metodo model 'find' para optener una lista de tickets
	Ticket.find().sort('-created').populate('creador', 'firstName ').exec(function(err, tickets){
		if(err){
			//Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del ticket POSIBLE ERROR
			res.json(tickets);
		}
	});
};

exports.read = function(req, res){
	res.json(req.ticket);
};

//Crear un nuevo metodo controller que actualiza un ticket existente
exports.update = function(req, res){
	// Obtener el ticket usando el objeto 'request'
	var ticket = req.ticket;
	//Actualizar los campos ticket
	ticket.ticketId = req.body.ticketId;
	ticket.tiempo = req.body.tiempo;
	ticket.tipo = req.body.tipo;
	ticket.sendto = req.body.sendto; 

	// Intentar salvar el ticket actualizado
	ticket.save(function(err){
		if(err){
			//si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del ticket
			res.json(ticket);
		}
	});
};

//Crear un nuevo metodo controller que borre un ticket existente
exports.delete = function(req, res){
	
	// Obtener el ticket usando el objeto 'request'
	var ticket = req.ticket;
	console.log("articulo desde el controlador del servidor" + ticket)
	// Usar el metodo model 'remove' para borrar el ticket
	ticket.remove(function(err){
		if(err){
			//si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representacion JSON del ticket
			res.json(ticket);
		}
	});

};

//Crear un nuevo controller middkeware que recupera un unico ticket existente
exports.ticketByID = function(req, res, next, id){
	//usar el metodo 'findById' para encontrar un unico ticket
	Ticket.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, ticket){
		if(err)return next(err);
		if(!ticket) return next(new Error('Fallo al cargar el articulo' + id));
		//Si se un articulo es enconntrado usar el objeto 'request' para pasarlo al siguiente middleware
		req.ticket = ticket;
		//llamar al siguiente middleware
		next();
	});
};
//Crear un nuevo controller middleware que es usado para autorizar una operacion ticket
exports.hasAuthorization = function(req, res, next){
	//si el usuario actual no es el creador del articulo, enviar el mensaje de errror apropiado
	if (req.ticket.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no esta autorizado'
		});
	}
	//llamar al siguiente middleware
	next();
};
