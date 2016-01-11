angular.module('example').controller('ExampleController', ['$scope', 'Authentication',
	function($scope, Authentication){
		$scope.authentication = Authentication;
		//Crear una variable 'dia' con el dia actual
		 $scope.dia = new Date();
	 }
	]);