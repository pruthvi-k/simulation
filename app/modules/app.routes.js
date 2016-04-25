/**
 * Created by pruthvi on 22/4/16.
 */
'use scrict';
angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/simulation', {
            templateUrl: 'views/simulation.tpl.html',
            controller: 'SimulationController'
        })
        .when('/simulation', {
            templateUrl: 'views/calculate.tpl.html',
            controller: 'CalculationsController'
        })
        //.when('/customer-retention', {
        //    templateUrl: 'views/simulation.tpl.html',
        //    controller: 'SimulationController'
        //})
        //.when('/productivity', {
        //    templateUrl: 'views/simulation.tpl.html',
        //    controller: 'SimulationController'
        //})
        //.when('/upselling', {
        //    templateUrl: 'views/simulation.tpl.html',
        //    controller: 'SimulationController'
        //})
        //.when('/body-shop', {
        //    templateUrl: 'views/simulation.tpl.html',
        //    controller: 'SimulationController'
        //})
        .otherwise({
            redirectTo: '/'
        });
}