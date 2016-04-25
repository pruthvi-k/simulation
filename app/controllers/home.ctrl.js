/**
 * Created by pruthvi on 22/4/16.
 */
'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, PageValues){
        //Set page title and description
        PageValues.title = "HOME";
        PageValues.description = "Simulation project for TATA";
        console.log("i am inside home ctrl ");
        $scope.message = "welcome";
    });