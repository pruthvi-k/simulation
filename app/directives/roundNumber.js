/**
 * Created by pruthvi on 25/4/16.
 */
angular.module('app.core')
.directive('roundNumber', roundNumber);

function roundNumber($filter) {
    var filterPrecisionFunc = function (number, precision) {
        precision = Math.abs(parseInt(precision)) || 0;
        var multiplier = Math.pow(10, precision);
        return (Math.round(number * multiplier) / multiplier);
    };
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {
            modelCtrl.$formatters.push(function(value){
                if(attrs.precision) {
                    return filterPrecisionFunc(value, attrs.precision);
                } else {
                    return Math.round(value);
                }
            });
        }
    };
}