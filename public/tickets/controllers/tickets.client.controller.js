//Invocar modo JavaScript 'strict'

'use strict';
//Crear el controller 'ticket'
angular.module('tickets').controller('TicketsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Tickets','ngGrid',
	function($scope, $routeParams, $location, Authentication, Tickets, ngGrid){
		//Exponer el service Authencation
		$scope.authentication = Authentication;
        //Variable 'tiempo' para guardar el dato del tiempo
        var tiempo;
	//Crear un uevo metodo controller para crear nuevos tickets
		$scope.create = function(){
			//Usar los campos para crear nuevos tickets
			var ticket = new Tickets({
				ticketId: this.ticketId,
				tiempo: this.tiempo,
				numTicket: this.numTicket,
				tipo: this.tipo,
				estado: this.estado
			});
			//usar el metodo '$Save' de ticket para enviar una peticion POST apropiada
			ticket.$save(function(response){
				//si un ticket fue creado de modo correcto, redireccionar al usuario a la pagina de ticket
				//linea original de la pagina articulos del tuto angularJS
				//$location.path('tickets/' + response._id);

				//Lineas sustituta para la prueba
				$location.path('tickets/create');	
				$scope.ticketId = "";
				$scope.numTicket = "";
				$scope.tiempo = "";
				$scope.tipo = "Tipo";		
				$scope.estado = "";

			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});
		};

		//Crear un nuevo metodo controller para recuperar una lista de tickets
		$scope.find = function(){
			//usar el metodo 'query' de ticket ´para enviar una peticion GET apropiada
			$scope.tickets = Tickets.query();
		};
		// Crear un nuevo metodo controller para recuperar un unico ticket
		$scope.findOne = function(){
			//Usar el metodo 'get' de ticket para enviar una peticion GET apropiada
			$scope.ticket = Tickets.get({
				ticketId: $routeParams.ticketId
			});
		};

	//Crear un nuevo metodo controller para actualizar un unico ticket
		$scope.update = function() {
			//Usar el metodo '$update' de ticket para enviar una peticion Put apropiada
			$scope.ticket.$update(function() {
				//si un ticket fue actualizado de modo correcto, redirijir el user a la pagina del ticket
			$location.path('tickets/' + $scope.ticket._id);
			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});	
		};
	
	//Crear un nuevo metodo controller para borrar un unico ticket
		$scope.delete = function(ticket){
			//Si un ticket fue enviado al metodo, borrarlo
			if(ticket){
				//Usar el metodo '$remove' del ticket para borrar el ticket
				ticket.$remove(function(){
					//Eliminar el ticket de la lista de tickets
					for(var i in $scope.tickets){
						if($scope.tickets[i] === ticket){
							$scope.tickets.splice(i, 1);
						}
					}
				});
			} else {
				//En otro caso, usar el metodo '$remove' de ticket para borrar el ticket
				$scope.ticket.$remove(function(){
					$location.path('tickets');
				});
			}

		};

//Borrar los datos del ticket 
$scope.borrarTicket = function(){
$scope.numTicket = "";
}


//Crear un nuevo metodo controller para configurar la tabla
$scope.tabla = function(){
$scope.tickets = Tickets.query();
$scope.gridOptions = {
   	data: $scope.tickets,
   	showGroupPanel:true,
   	enableCellSelection:true,
   	enableRowSelection: false,
   	enableCellEdit:true,

   	columnDefs:[
   		{field:'$scope.numTicket', displayName:'$scope.numTicket'},
   		{field:'$scope.ticketId', displayName:'$scope.ticketId'},
   		{field:'$scope.tiempo', displayName:'$scope.tiempo'},
   		{field:'$scope.tipo', displayName:'$scope.tipo'},
   		{field:'$scope.estado', displayName:'$scope.estado'}]

   };
}

/*
		//Creamos un cronometro para llevar el tiempo invertido en el ticket
		$scope.cronometro = function(){
			contador_s = 0;
		contador_m = 0;
		s= document.getElementById("segundos");
		m= document.getElementById("minutos");

	tiempo = setInterval(
		function(){
			if(contador_s==60){
				contador_s=0;
				contador_m++;
			m.innerHTML = contador_m;
			}
			s.innerHTML = contador_s;
			contador_s++;
	}
	,1000);
	   };

	   $scope.detenerse= function(){
		clearInterval(tiempo);
       }
*/	


	}
	]);


