//Invocar modo JavaScript 'strict'

'use strict';
//Crear el controller 'ticket'
angular.module('tickets').filter('filtroDate', function($filter) 
  {
       return function(input)
     {
     	//Se creauna variable 'diaActual' y se inicicializa con el valor de la fecha actual en una zona horaria adecuada 
        var diaActual = $filter('date')(new Date(), 'yyyy-MM-dd');
  
        var salida = [];

        //se inicia el siglo para recorrer el array de tiquetes 
        for( var i=0; i<input.length; i++) {
        	//se crea una variable 'dataArray' y se le carga el valor del objeto 'tiquete' con sus datos individuales
          	var dataArray = input[i];
          	//se crear una variable 'creado' y se le inicializa con el valor de la fecha en la que el tiquete se creo
        	var creado = dataArray.creado;	
        	//Se crea una vaiable 'diaTickete' y se inicializa con la fecha del tiquete con un formato de zona horaria adecuado
        	var diaTickete = $filter('date')(new Date(creado), 'yyyy-MM-dd');	

        	//console.log("ID Tickete : ", dataArray.ticketId);
            //Se crea una condicion para validar si el ticket es del dia actual
        	if (diaActual == diaTickete ) {   
        		//si el ticket es del dia actual lo agrega  
        	        salida.push(dataArray);
              }

         }

          return salida;
        }
    })
.controller('TicketsController', ['$scope', '$filter', '$routeParams', '$interval', '$location', 'Authentication', 'Tickets',
	function($scope, $filter , $routeParams, $interval, $location, Authentication, Tickets){
      	
		//Exponer el service Authencation
		
		$scope.authentication = Authentication;

        //Se creauna variable 'diaActual' y se inicicializa con el valor de la fecha actual en una zona horaria adecuada 
        var diaActualReporte = $filter('date')(new Date(), 'yyyy-MM-dd');

        $scope.tipo = "Tipo";
        $scope.dia = new Date();
        $scope.sendto = "Sendto";
      
        
        $scope.sumatime = 0;
       $scope.numTickDia = 0;
        

     ////Crear un uevo metodo controller para sumar los tipos de tiquetes metodo en DESARROLLO
		$scope.sumaType = function(){
			 //Iniciar variables 'fixed, heald, crear' con valor de 0  para llevar cuenta de los tiquetes
				$scope.fixedCant=0;
				$scope.healdCant=0;
				$scope.createCant=0;
				$scope.totalTicketCant= 0;
				
			//Iniciar variables 'fixed, heald, crear' con valor de 0  para llevar los promedios de los tiquetes	
				$scope.fixedProm=0;
				$scope.healdProm=0;
				$scope.createProm=0;
				$scope.totalTicketProm= 0;


		 angular.forEach($scope.tickets,function(value){
				 $scope.creadoDia = value.creado;
				 $scope.creadoDia = $filter('date')(new Date($scope.creadoDia), 'yyyy-MM-dd');	
				 	//console.log(" Fecha del tiquete a comparar : ", $scope.creadoDia);	
              
              if($scope.creadoDia == diaActualReporte){
              	$scope.totalTicket +=1;
              //	console.log(" Variable totalTicket : ", $scope.totalTicket);	
                 switch(value.tipo)
	   		{
 
			case "create":
			  	$scope.createCant = $scope.createCant+1;
			  	$scope.createProm += value.tiempo;

			  	//console.log(" create", $scope.create);	
			  break;
			case "heald":
				$scope.healdCant= $scope.healdCant+1;
			  $scope.healdProm += value.tiempo;	
			 break;
			case "fix":
				$scope.fixedCant= $scope.fixedCant+1;
				$scope.fixedProm += value.tiempo;	
			 break;
		  
			}

		}


            });
		 	//se crea los porcentajes en base a la suma de cada tipo de tiquete
		   $scope.createProm = $scope.createProm / $scope.createCant;
			//console.log("createProm : ",$scope.createProm );

			$scope.healdProm = $scope.healdProm / $scope.healdCant;
			//console.log("healdProm : ",$scope.healdProm );

			$scope.fixedProm = $scope.fixedProm / $scope.fixedCant;
			//var creado = $scope.tickets.creado =  pais.diaAnt.replace(/^\"(.*)\"/,"$1");

			//$scope.fixedProm = $scope.fixedProm.replace(/^\s*(\d+\s*\.\d{2})/,"$1");
			console.log("fixedProm : ",$scope.fixedProm );

		};


	//Crear metodo para ordenar lo tiquetes INCOMPLETO
	 $scope.ordenarPor = function(orden){
	 	$scope.ordenSeleccionado = orden;
	 };	






	//Crear un uevo metodo controller para crear nuevos tickets
		$scope.create = function(){
			$scope.sumatime = 0 ;
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
			$scope.sumaType();
			$scope.contadorDiaActual++;

	};


		//Crear un nuevo metodo usando el modulo $interval para actualizar la fecha actual cada 3 segundos
		$interval(
					function incrementB() {

						$scope.dia = new Date();

					},
					( 3 * 1000 )
				);

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

			var sumatiempo=0;
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


    }]);