//Invocar el modo javaScript 'strict'
'use strict';

//Configurar el modulo routes de 'tickets'
angular.module('tickets').config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.
		when('/tickets', {
			templateUrl: 'tickets/views/list-tickets.client.view.html'
		}).
		when('/tickets/create', {
			templateUrl: 'tickets/views/create-ticket.client.view.html'
		}).
		when('/tickets/:ticketId', {
			templateUrl: 'tickets/views/view-ticket.client.view.html'
		}).
		when('/tickets/:ticketId/edit', {
			templateUrl: 'tickets/views/create-ticket.client.view.html'
		});
	}
]);
