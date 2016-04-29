/**
 * Created by pruthvi on 22/4/16.
 */
'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, PageValues, ngDialog){
        //Set page title and description
        PageValues.title = "HOME";
        PageValues.description = "Simulation project for TATA";
        console.log("i am inside home ctrl ");
        $scope.message = "welcome";
        $scope.pageClass = 'page-home';
        $scope.showSimulationPopup = function (tpl) {
            ngDialog.open({
                template: 'views/partial/'+tpl+'.tpl.html',
                controller: 'CalculationsController',
                className: 'ngdialog-theme-default ngdialog-theme-custom',
                windowClass: "modal slide"
            });
            //ngDialog.open({ template: 'customerTmpl.html' });
        };
    });