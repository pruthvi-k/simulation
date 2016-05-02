'use strict';
angular.module('app',['ngRoute','app.routes','app.core','app.config', 'chart.js','ngAnimate'])

    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            "colours": [
                { // default
                    "fillColor": "rgba(144, 195, 212, 1)",
                    "strokeColor": "rgba(68,118,137,1)",
                    "pointColor": "rgba(68,118,137,1)",
                    "pointStrokeColor": "#90C3D4",
                    "pointHighlightFill": "#90C3D4",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                },
                { // default
                    "fillColor": "rgba(246, 253, 45, 1)",
                    "strokeColor": "rgba(255,227,81,1)",
                    "pointColor": "rgba(255,227,81,1)",
                    "pointStrokeColor": "#F6FD2D",
                    "pointHighlightFill": "#F6FD2D",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                }
                ,
                { // default
                    "fillColor": "rgba(255,102,102)",
                    "strokeColor": "rgba(151,0,0,1)",
                    "pointColor": "rgba(151,0,0,1)",
                    "pointStrokeColor": "#FF6666",
                    "pointHighlightFill": "#FF6666",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                }
            ]
            //colours: ['#90C3D4', '#ffff00']
        });
    }]);
