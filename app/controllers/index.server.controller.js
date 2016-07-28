// Invocar el modo 'strict' 
'use strict';

//Crear un nuevo metodo controller 'render'
exports.render = function(req, res){
	//Usar el objeto 'response' para renderizar la  view index
	
	res.render('index', {
		title: 'Timer Tracking',
		user: JSON.stringify(req.user)
	});
};