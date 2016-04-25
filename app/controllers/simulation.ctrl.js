/**
 * Created by pruthvi on 22/4/16.
 */
angular.module('app.core',[]).controller('SimulationController', function($scope, PageValues) {
    //Set page title and description
    PageValues.title = "Simulation";
    PageValues.description = "Calculate simulation";
})