//Invocar modo JavaScript 'strict'

'use strict';
//Crear el controller 'ticket'
angular.module('tickets').controller('TicketsController', ['$scope', '$filter', '$routeParams', '$interval', '$location', 'Authentication', 'Tickets',
	function($scope, $filter , $routeParams, $interval, $location, Authentication, Tickets){
      	
		//Exponer el service Authencation
		
		$scope.authentication = Authentication;

        //Se iniciaiza las Variables 'tiempo, tipo y dia'
        var tiempo;

        $scope.tipo = "Tipo";
        $scope.dia = new Date();
        var sumatiempo ;
        var  hoy;
        var contadorDiaActual = 0;
        $scope.hoy = $filter('date')(new Date(), 'yyyy-MM-dd');
        

        

	//Crear un uevo metodo controller para crear nuevos tickets
		$scope.create = function(){
			//Usar los campos para crear nuevos tickets
			var ticket = new Tickets({
				ticketId: this.ticketId,
				tiempo: this.tiempo,
				//numTicket: this.numTicket,
				tipo: this.tipo,
				sendto: this.sendto
			});
            
			ticket.$save(function(response){			
				console.log(response);
				$location.path('tickets/create');	
				$scope.ticketId = "";
				$scope.tipo = "Tipo";
				$scope.tiempo = "";
				$scope.sendto = "Sendto";
				$scope.tickets = Tickets.query();

			}, function(errorResponse){
				//En otro caso, presentar al usuario el mensaje de error
				$scope.error = errorResponse.data.message;
			});
			//se llama al metodo 'sumaTiempo' del dia	actual		
			$scope.sumaTiempo();
			$scope.contadorDiaActual++;

	};

		//Crear un nuevo metodo usando el modulo $interval para actualizar la fecha actual cada 3 segundos
		$interval(
					function incrementB() {

						$scope.dia = new Date();

					},
					( 3 * 1000 )
				);
		//Crear un uevo metodo controller para sumar e tiempo
		$scope.sumaTiempo = function(){
			 //Iniciar la variable 'sumatiempo' con valor de 0  
				sumatiempo=0;
			//Siglo agular for each para accesar a cada uno de los valores de array tickets	
		      angular.forEach($scope.tickets, function(eachtime){
		      	//se suma el dato 'tiempo' de cada tiket dentro del array tickets
		        sumatiempo=eachtime.tiempo+sumatiempo;
		      });
		      //Se le suma el nuevo dato y se carga a el $scope.sumatiempo
		      $scope.sumatiempo = sumatiempo + parseInt($scope.tiempo);
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
	
	//Crear un nuevo metodo controller para borrar un unico ticket "ESTE METODO SE DEBE DE LIMPIAR"
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

		// crear un nuevo metodo controller invocando el metodo init para sumar los tiempos de los tickest
		var init = function(){
			//$scope.tickets = Tickets.query();
		 //Iniciar la variable 'sumatiempo' con valor de 0 

			sumatiempo=0;
		//Siglo agular for each para accesar a cada uno de los valores de array tickets 
			angular.forEach($scope.tickets, function(eachtime){
			//se suma el dato 'tiempo' de cada tiket dentro del array tickets
				sumatiempo=eachtime.tiempo+sumatiempo;
				console.log("No paso");
			});
		//Se le suma el nuevo dato y se carga a el $scope.sumatiempo
			$scope.sumatiempo = sumatiempo + parseInt($scope.tiempo);
			console.log("No paso nada "+$scope.sumatiempo);

			console.log("No paso nada "+ $scope.tickets);
		}
		//We init the app
		init();

	}

	]);


