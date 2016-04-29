/**
 * Created by pruthvi on 22/4/16.
 */
angular.module('app.core')
    .controller('CalculationsController', function($scope, PageValues, $routeParams, calcService, ngDialog,$templateCache) {
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
        $scope.pageClass = 'page-about';
        $scope.simulation = calcService.simulation;

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


        //body_turn_around_time depends on two values so added separately
        $scope.$watch(['simulation.body_turn_around_time', 'simulation.service_throughput'], function() {
            calcService.simulation.body_throughput = calcService.get_body_throughput();
        })

        $scope.$watch('simulation.after_sales_gross_profit_age', function() {
            calcService.simulation.accessory_sales = calcService.get_accessory_sales();
            calcService.simulation.profit_acc_sales = calcService.get_profit_acc_sales();
        })

        $scope.$watch('simulation', function() {
            calcService.simulation.projected_yearly_load = calcService.get_projected_yearly_load();
            calcService.simulation.service_throughput = calcService.get_service_throughput();

            calcService.simulation.ew_sales = calcService.get_ew_sales();

            //if($scope.isStaticSimulationSet == false) {
            //calcService.simulation.body_throughput = calcService.get_body_throughput();
            //}



            calcService.simulation.total_parts = calcService.get_total_parts();
            calcService.simulation.body_total_parts = calcService.get_body_total_parts();

            calcService.simulation.body_profit_on_parts = calcService.get_body_profit_on_parts();
            //projected_yearly_load : $scope.get_projected_yearly_load(),

            calcService.simulation.no_of_service_bays = calcService.get_no_of_service_bays();
            calcService.simulation.no_of_bodyshop_bays = calcService.get_no_of_bodyshop_bays();
            calcService.simulation.technicians = calcService.get_technicians();
            calcService.simulation.service_advisor = calcService.get_service_advisor();
            calcService.simulation.customer_care = calcService.get_customer_care();
            calcService.simulation.fixed_cost = calcService.get_fixed_cost();
            calcService.simulation.parts_stock = calcService.get_parts_stock();
            calcService.simulation.interest_cost = calcService.get_interest_cost();

            calcService.simulation.total_labour = calcService.get_total_labour();

            calcService.simulation.profit_on_labour = calcService.get_profit_on_labour();
            calcService.simulation.profit_on_parts = calcService.get_profit_on_parts();

            calcService.simulation.body_total_labour = calcService.get_body_total_labour();

            calcService.simulation.body_profit_on_labour = calcService.get_body_profit_on_labour();

            calcService.simulation.service_bodyshop_gross_profit = calcService.get_service_bodyshop_gross_profit();
            calcService.simulation.spare_parts_gross_profit = calcService.get_spare_parts_gross_profit();
            calcService.simulation.after_sales_gross_profit = calcService.get_after_sales_gross_profit();
            calcService.simulation.after_sales_gross_profit_age = calcService.get_after_sales_gross_profit_age();

            //calcService.simulation.accessory_sales = calcService.get_accessory_sales();
            //calcService.simulation.profit_acc_sales = calcService.get_profit_acc_sales();

            calcService.simulation.service_pack_sale= calcService.get_service_pack_sale();
            calcService.simulation.profit_service_pack= calcService.get_profit_service_pack();
            calcService.simulation.profit_ew_sale= calcService.get_profit_ew_sale();

            calcService.simulation.overall_profit = calcService.get_overall_profit();

            calcService.simulation.body_throughput = calcService.get_body_throughput();

            var profit = Math.round(calcService.simulation.after_sales_gross_profit_age);
            if(profit >= 53.55 && profit < 55 && calcService.isStaticSimulationSet == false) {
                $scope.static_simulation = angular.copy(calcService.simulation);
                calcService.static_simulation = $scope.static_simulation;
                //calcService.static_simulation.after_sales_gross_profit_age = calcService.simulation.after_sales_gross_profit_age;
                calcService.isStaticSimulationSet = true;
            } else {
                $scope.static_simulation = angular.copy(calcService.static_simulation);
            }

            $scope.setGraph();

        }, true);



        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.setGraph = function() {
            $scope.chart_shop_profit = {};
            $scope.chart_shop_profit = {
                labels:['Service & Body Shop Profit','Spare Parts Profit', 'Gross After Sales Profit', 'Gross Profit %age'],
                series:["Initial", "Changed"],
                data:[
                    [
                        calcService.static_simulation.service_bodyshop_gross_profit,
                        calcService.static_simulation.spare_parts_gross_profit,
                        calcService.static_simulation.after_sales_gross_profit,
                        calcService.static_simulation.after_sales_gross_profit_age
                    ],
                    [
                        $scope.simulation.service_bodyshop_gross_profit,
                        $scope.simulation.spare_parts_gross_profit,
                        $scope.simulation.after_sales_gross_profit,
                        $scope.simulation.after_sales_gross_profit_age
                    ]
                ],
                //options: {barShowStroke : false}
            };


        }

        $scope.watch('calcService.simulation',function(){
            console.log([
                    calcService.static_simulation.service_bodyshop_gross_profit,
                    calcService.static_simulation.spare_parts_gross_profit,
                    calcService.static_simulation.after_sales_gross_profit,
                    calcService.static_simulation.after_sales_gross_profit_age
                ],
                [
                    $scope.simulation.service_bodyshop_gross_profit,
                    $scope.simulation.spare_parts_gross_profit,
                    $scope.simulation.after_sales_gross_profit,
                    $scope.simulation.after_sales_gross_profit_age
                ]);
        });

        $scope.$on('update', function (event, chart) {
            console.log(chart);
        });

        $scope.resetForm = function(){
            calcService.simulation = angular.copy(calcService.static_simulation);
            $scope.simulation = calcService.simulation;
            //$scope.apply();
            $scope.setGraph();

        }

        $scope.close = function(){
            ngDialog.close();

        }

    });