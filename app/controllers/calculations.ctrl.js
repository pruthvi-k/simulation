/**
 * Created by pruthvi on 22/4/16.
 */
angular.module('app.core')
    .controller('CalculationsController', function($scope, PageValues, $routeParams) {
        //Set page title and description
        PageValues.title = "Simulation";
        PageValues.description = "Calculate simulation";
        $scope.tab = {};
        $scope.tab.customer_retention = true;
        $scope.tab.productivity = true;
        $scope.tab.upselling = true;
        $scope.tab.body_shop = true;
        $scope.chart_shop_profit = {};
        $scope.chart_parts_profit = {};
        $scope.chart_sales_profit = {};
        $scope.chart_gross_profit = {};
        $scope.isStaticSimulationSet = false;

        switch ($routeParams.type) {
            case 'customer-retention':
                $scope.tab.customer_retention = false;
                break;
            case 'productivity':
                $scope.tab.productivity = false;
                break;
            case 'upselling':
                $scope.tab.upselling = false;
                break;
            case 'body-shop':
                $scope.tab.body_shop = false;
                break;
        }

        $scope.static_simulation = {};
        $scope.simulation = {
            vehicle_park: 3500,
            customer_retention_0_4_yrs : 95, //%
            customer_retention_4_8_yrs : 80, //%
            customer_retention_8_12_yrs : 50, //%
            customer_retention_12_yrs : 35, //%
            projected_yearly_load : "",

            service_turn_around_time : 4,
            body_turn_around_time : 10,

            accessory_sales_car : 10000,
            accessory_sales : "",
            ew_sales : "",

            no_of_service_bays : "",
            no_of_bodyshop_bays : "",
            technicians : "",
            service_advisor : "",
            customer_care : "",
            management_staff : 6,
            fixed_cost : "",
            parts_stock : "",
            interest_cost : "",


            service_throughput : "",
            service_labour_vehicle : 10000,
            service_parts_vehicle : 30000,
            total_labour : "",
            total_parts : "",
            profit_on_labour : "",
            profit_on_parts : "",

            body_throughput : "",
            body_labour_vehicle : 25000,
            body_parts_vehicle : 50000,
            body_total_labour : "",
            body_total_parts : "",
            body_profit_on_labour : "",
            body_profit_on_parts : "",

            service_bodyshop_gross_profit : "",
            spare_parts_gross_profit : "",
            after_sales_gross_profit : "",
            overall_profit : 20000000,
            after_sales_gross_profit_age : ""
        };

        //$scope.roundNumber = function (number, precision){
        //    precision = Math.abs(parseInt(precision)) || 0;
        //    var multiplier = Math.pow(10, precision);
        //    return (Math.round(number * multiplier) / multiplier);
        //};

        $scope.get_projected_yearly_load  = function() {
            var val = (($scope.simulation.vehicle_park) * 0.4 * ($scope.simulation.customer_retention_0_4_yrs/100)) * 2.5 +
                ($scope.simulation.vehicle_park * 0.3 * ($scope.simulation.customer_retention_4_8_yrs/100)) * 2 +
                ($scope.simulation.vehicle_park * 0.2 * ($scope.simulation.customer_retention_8_12_yrs/100)) * 2 +
                ($scope.simulation.vehicle_park * 0.1 * ($scope.simulation.customer_retention_12_yrs/100)) * 2
            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }

        }



        $scope.get_no_of_service_bays = function() {
            var val = $scope.simulation.service_throughput / 25 / 2;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_accessory_sales = function() {
            //=(I2+I10)*C23
            var val = ($scope.simulation.service_throughput+$scope.simulation.body_throughput)*$scope.simulation.accessory_sales_car;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_no_of_bodyshop_bays = function() {
            var val = $scope.simulation.body_throughput/10;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_technicians = function() {
            var val = $scope.simulation.service_throughput / 25 / 1.2;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_service_advisor = function() {
            var val = $scope.simulation.service_throughput / 25 / 4;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_customer_care = function() {
            var val = ($scope.simulation.projected_yearly_load / 12 / 25 / 5) +
                (($scope.simulation.service_throughput + $scope.simulation.body_throughput) / 25 / 20);

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_fixed_cost = function() {
            var val = ($scope.simulation.technicians * 20000) +
                ($scope.simulation.service_advisor * 30000) +
                ($scope.simulation.customer_care * 25000) +
                ($scope.simulation.management_staff * 60000) +
                (($scope.simulation.no_of_service_bays + $scope.simulation.no_of_bodyshop_bays) * 5000);

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_parts_stock = function() {
            //=(I6+I14)*1.2
            var val = ($scope.simulation.total_parts + $scope.simulation.body_total_parts) * 1.2;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_interest_cost = function() {
            var val = $scope.simulation.parts_stock * 0.1;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }


        $scope.get_service_throughput = function() {
            var val = ($scope.simulation.projected_yearly_load / 12) * (4 / $scope.simulation.service_turn_around_time);

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_ew_sales = function() {
            var val = $scope.simulation.service_throughput * 0.2 * 40000;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_total_labour = function() {
            var val = $scope.simulation.service_throughput*$scope.simulation.service_labour_vehicle;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_total_parts = function() {
            var val = $scope.simulation.service_parts_vehicle * $scope.simulation.service_throughput;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }

        }

        $scope.get_profit_on_labour = function() {
            var val = $scope.simulation.total_labour * 0.5;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_profit_on_parts = function() {
            var val = $scope.simulation.total_parts * 0.2;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_body_throughput = function() {
            var val = ($scope.simulation.service_throughput * 0.2) * (10 / $scope.simulation.body_turn_around_time);

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_body_total_labour = function() {
            var val = $scope.simulation.body_labour_vehicle * $scope.simulation.body_throughput;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_body_total_parts = function() {
            var val = $scope.simulation.body_parts_vehicle * $scope.simulation.body_throughput;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_body_profit_on_labour = function() {
            var val = $scope.simulation.body_total_labour * 0.5;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_body_profit_on_parts = function() {
            return $scope.simulation.body_total_parts * 0.2;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_service_bodyshop_gross_profit = function() {
            //=(I7+I8+I15+I16)-C18
            var val = ($scope.simulation.profit_on_labour +
                $scope.simulation.profit_on_parts +
                $scope.simulation.body_profit_on_labour +
                $scope.simulation.body_profit_on_parts) -
                $scope.simulation.fixed_cost;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_spare_parts_gross_profit = function() {
            //=(I8+I16)-C21
            var val = ($scope.simulation.profit_on_parts + $scope.simulation.body_profit_on_parts) - $scope.simulation.interest_cost;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_after_sales_gross_profit = function() {
            //(I8+I16)-C21
            var val = $scope.simulation.service_bodyshop_gross_profit + $scope.simulation.spare_parts_gross_profit;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }

        $scope.get_after_sales_gross_profit_age = function() {
            var val = ($scope.simulation.after_sales_gross_profit / $scope.simulation.overall_profit)*100;

            if(isFinite(val)) {
                return val;
            } else {
                return 0;
            }
        }



        //body_turn_around_time depends on two values so added separately
        $scope.$watch('simulation.body_turn_around_time', function() {
            $scope.simulation.body_throughput = $scope.get_body_throughput();
        })

        $scope.$watch('simulation.service_throughput', function() {
            $scope.simulation.body_throughput = $scope.get_body_throughput();
        })

        $scope.$watch('simulation', function() {
            $scope.simulation.projected_yearly_load = $scope.get_projected_yearly_load();
            $scope.simulation.service_throughput = $scope.get_service_throughput();

            $scope.simulation.ew_sales = $scope.get_ew_sales();
            if($scope.isStaticSimulationSet == false) {
                $scope.simulation.body_throughput = $scope.get_body_throughput();
            }

            $scope.simulation.total_parts = $scope.get_total_parts();
            $scope.simulation.body_total_parts = $scope.get_body_total_parts();

            $scope.simulation.body_profit_on_parts = $scope.get_body_profit_on_parts();
            //projected_yearly_load : $scope.get_projected_yearly_load(),
            $scope.simulation.accessory_sales = $scope.get_accessory_sales();
            $scope.simulation.no_of_service_bays = $scope.get_no_of_service_bays();
            $scope.simulation.no_of_bodyshop_bays = $scope.get_no_of_bodyshop_bays();
            $scope.simulation.technicians = $scope.get_technicians();
            $scope.simulation.service_advisor = $scope.get_service_advisor();
            $scope.simulation.customer_care = $scope.get_customer_care();
            $scope.simulation.fixed_cost = $scope.get_fixed_cost();
            $scope.simulation.parts_stock = $scope.get_parts_stock();
            $scope.simulation.interest_cost = $scope.get_interest_cost();

            $scope.simulation.total_labour = $scope.get_total_labour();

            $scope.simulation.profit_on_labour = $scope.get_profit_on_labour();
            $scope.simulation.profit_on_parts = $scope.get_profit_on_parts();

            $scope.simulation.body_total_labour = $scope.get_body_total_labour();

            $scope.simulation.body_profit_on_labour = $scope.get_body_profit_on_labour();

            $scope.simulation.service_bodyshop_gross_profit = $scope.get_service_bodyshop_gross_profit();
            $scope.simulation.spare_parts_gross_profit = $scope.get_spare_parts_gross_profit();
            $scope.simulation.after_sales_gross_profit = $scope.get_after_sales_gross_profit();
            $scope.simulation.after_sales_gross_profit_age = $scope.get_after_sales_gross_profit_age();

            if($scope.isStaticSimulationSet == false) {
                $scope.static_simulation = angular.copy($scope.simulation);
                $scope.isStaticSimulationSet = true;
            }

            $scope.setGraph();
        }, true);


        $scope.setGraph = function() {
            $scope.chart_shop_profit = {
                labels:[],
                series:["Initial", "Changed"],
                data:[
                    [$scope.static_simulation.service_bodyshop_gross_profit],
                    [$scope.simulation.service_bodyshop_gross_profit]
                ]
            };

            $scope.chart_parts_profit = {
                labels:[],
                series:["Initial", "Changed"],
                data:[
                    [$scope.static_simulation.spare_parts_gross_profit],
                    [$scope.simulation.spare_parts_gross_profit]
                ]
            };

            $scope.chart_sales_profit = {
                labels:[],
                series:["Initial", "Changed"],
                data:[
                    [$scope.static_simulation.after_sales_gross_profit],
                    [$scope.simulation.after_sales_gross_profit]
                ]
            };

            $scope.chart_gross_profit = {
                labels:[],
                series:["Initial", "Changed"],
                data:[
                    [$scope.static_simulation.after_sales_gross_profit_age],
                    [$scope.simulation.after_sales_gross_profit_age]
                ]
            };


        }


        $scope.resetForm = function(){
            $scope.simulation = angular.copy($scope.static_simulation);
        }


    });