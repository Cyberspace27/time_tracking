//Invocar modo JavaScript 'strict'

'use strict';
//Crear el controller 'ticket'
angular.module('tickets').controller('TicketsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Tickets',
	function($scope, $routeParams, $location, Authentication, Tickets){
      	
		//Exponer el service Authencation
		
		$scope.authentication = Authentication;

        //Se iniciaiza las Variables 'tiempo, tipo y dia'
        var tiempo;

        $scope.tipo = "Tipo";
        $scope.dia = new Date();

	//Crear un uevo metodo controller para sumar e tiempo
		$scope.sumaTiempo = function(){
				var sumatiempo = 0 ;
		      angular.forEach($scope.tickets, function(eachtime){
		        sumatiempo=eachtime.tiempo+sumatiempo;
		          console.log(sumatiempo);
		      });
		    
		};


	//Crear un uevo metodo controller para crear nuevos tickets
		$scope.create = function(){
			//Usar los campos para crear nuevos tickets
			var ticket = new Tickets({
				ticketId: this.ticketId,
				tiempo: this.tiempo,
				//numTicket: this.numTicket,
				tipo: this.tipo,
				estado: this.estado
			});
            
			ticket.$save(function(response){			
				console.log(response);
				$location.path('tickets/create');	
				$scope.ticketId = "";
				$scope.estado = "";
				$scope.tipo = "Tipo";
				$scope.tiempo = "";
				$scope.tickets = Tickets.query();

			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});
			
			//se aumenta el contador de tiquetes del dia en 1
			this.numTicket ++;
			//Se reinicia el valor del tipo de tiquete a el valor por defecto
		//metodo para refrescar la pagina 
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
			$location.path('/tickets');
			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});	
		};
	
	//Crear un nuevo metodo controller para borrar un unico ticket
		$scope.delete = function(ticket){
			console.log("articulo desde el controlador cliente "   + ticket)
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


	}

	]);


