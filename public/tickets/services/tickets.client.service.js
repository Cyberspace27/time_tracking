//Invocar modo JavaScript 'strict'

'use strict';
//Crear el service 'tickets'
angular.module('tickets').factory('Tickets', ['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' ticket
	return $resource('api/tickets/:ticketId', {
		articleId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);