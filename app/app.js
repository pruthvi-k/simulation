'use strict';
angular.module('app',['ngRoute','app.routes','app.core','app.config', 'chart.js'])

    .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colours: ['#90C3D4', '#ffff00']
    });
}]);
