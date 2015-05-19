var mainApplicationModuleName = 'time_tracking';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','users','example', 'tickets']);

mainApplicationModule.config(['$locationProvider' ,
	function($locationProvider){
		$locationProvider.hashPrefix('!')
	}
	]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});