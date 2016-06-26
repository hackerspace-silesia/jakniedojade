angular.module('app', ['Tracks','ui.bootstrap','ngRoute','ngAnimate']).
config(function ($routeProvider) 
{
	$routeProvider.when('/trasy', {
		templateUrl: 'views/trackView.html', controller: 'TracksController'});
	$routeProvider.otherwise({
	redirectTo: '/trasy'
	});
});
angular.module('Tracks', []);