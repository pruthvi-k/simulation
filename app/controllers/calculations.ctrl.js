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
            // calcService.simulation.after_sales_gross_profit = calcService.get_after_sales_gross_profit();
            calcService.simulation.after_sales_gross_profit_age = calcService.get_after_sales_gross_profit_age();

            //calcService.simulation.accessory_sales = calcService.get_accessory_sales();
            //calcService.simulation.profit_acc_sales = calcService.get_profit_acc_sales();

            calcService.simulation.upselling_gross_profit = calcService.get_upselling_gross_profit();
            calcService.simulation.service_pack_sale= calcService.get_service_pack_sale();
            calcService.simulation.profit_service_pack= calcService.get_profit_service_pack();
            calcService.simulation.profit_ew_sale= calcService.get_profit_ew_sale();

            //   calcService.simulation.overall_profit = calcService.get_overall_profit();

            calcService.simulation.body_throughput = calcService.get_body_throughput();

            var profit = Math.round(calcService.simulation.after_sales_gross_profit_age);
            if(profit>=13706696 && calcService.isStaticSimulationSet == false) {
                $scope.static_simulation = angular.copy(calcService.simulation);
                calcService.static_simulation = $scope.static_simulation;
                //calcService.static_simulation.after_sales_gross_profit_age = calcService.simulation.after_sales_gross_profit_age;
                calcService.isStaticSimulationSet = true;
            } else {
                $scope.static_simulation = angular.copy(calcService.static_simulation);
            }

            $scope.setGraph();

        }, true);


        $scope.flag = false;
        var dlabels = {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        };

        $scope.setGraph = function() {
            $scope.chart_shop_profit = {
                labels:['Service & Body Shop Profit', 'Spare Parts Profit'],
                series:["Initial", "Changed"],
                fillColor : ["#85c51f","#f9a7a9" ,"#f9a7a9" ,"#f9a7a9"],
                data:[
                                        [
                        Math.round(calcService.simulation.service_bodyshop_gross_profit),
                        Math.round(calcService.simulation.spare_parts_gross_profit)
                    ],
                    [
                        Math.round(calcService.static_simulation.service_bodyshop_gross_profit),
                        Math.round(calcService.static_simulation.spare_parts_gross_profit)
                    ]
                ],
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                }
            };

            $scope.chart_overall_profit = {
                labels:['Overall Profit'],
                series:["Initial", "Changed"],
                fillColor : ["#f15c80","#f15c80"],
                "colours": [{ // default
                    "fillColor": "rgba(241, 92, 128, 1)",
                    "strokeColor": "rgba(155,23,54,1)",
                    "pointColor": "rgba(155,23,54,1)",
                    "pointStrokeColor": "#f15c80",
                    "pointHighlightFill": "#f15c80",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                },{ // default
                    "fillColor": "rgba(153, 51, 255, 1)",
                    "strokeColor": "rgba(77,11,144,1)",
                    "pointColor": "rgba(77,11,144,1)",
                    "pointStrokeColor": "#9933FF",
                    "pointHighlightFill": "#9933FF",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                }
                ],
                data:[
                    [
                        Math.round(calcService.simulation.after_sales_gross_profit_age)
                    ],
                    [
                        Math.round(calcService.static_simulation.after_sales_gross_profit_age)
                    ]
                ],
                options: {
                    responsive: false,
                    maintainAspectRatio: false,

                }
            };
        }
        //$scope.highcharts_shop_profit = {};
        //$scope.setGraph = function() {
        //    $scope.highcharts_shop_profit.series = [];
        //    if($scope.flag == false) {
        //        $scope.flag = true;
        //        $scope.highcharts_shop_profit = {
        //            options: {
        //                chart: {
        //                    type: 'column'
        //                },events: {
        //                    redraw: function() {
        //                        alert ('The chart is being redrawn');
        //                    }
        //
        //                },
        //                yAxis: {
        //                    min: 100000,
        //                    title: {
        //                        text: ''
        //                    }
        //                },
        //                legend: {
        //                    enabled: false // Enable/Disable the legend
        //                }
        //            },
        //            xAxis: {
        //                categories: [
        //                    'Service & Body Shop Profit', 'Spare Parts Profit'
        //                ],
        //                crosshair: true
        //            },
        //            plotOptions: {
        //                series: {
        //                    dataLabels: {
        //                        align: 'left',
        //                        enabled: true
        //                    }
        //                }
        //            },
        //            series: [
        //                {
        //                    name: '',
        //                    data: [
        //                        Math.round(calcService.static_simulation.service_bodyshop_gross_profit),
        //                        Math.round(calcService.static_simulation.spare_parts_gross_profit)
        //                    ],
        //                    dataLabels: dlabels
        //
        //                }, {
        //                    name: '',
        //                    data: [
        //                        Math.round($scope.simulation.service_bodyshop_gross_profit),
        //                        Math.round($scope.simulation.spare_parts_gross_profit)
        //                    ],
        //                    dataLabels: dlabels
        //                }
        //            ],
        //
        //
        //        }
        //    } else {
        //       // $scope.highcharts_shop_profit.options.chart.type = "column";
        //
        //        $scope.highcharts_shop_profit.series[1] =  {
        //            name: '',
        //            data: [
        //                Math.round($scope.simulation.service_bodyshop_gross_profit),
        //                Math.round($scope.simulation.spare_parts_gross_profit)
        //            ],
        //            dataLabels: dlabels
        //        };
        //        ////angular.forEach(seriesArray, function(value, key) {
        //        //    seriesArray[0] = {
        //        //        name: '',
        //        //        data: [
        //        //            Math.round(calcService.static_simulation.service_bodyshop_gross_profit),
        //        //            Math.round(calcService.static_simulation.spare_parts_gross_profit)
        //        //        ],
        //        //        dataLabels: dlabels
        //        //
        //        //    };
        //        //seriesArray[1] = {
        //        //    name: '',
        //        //    data: [
        //        //        Math.round($scope.simulation.service_bodyshop_gross_profit),
        //        //        Math.round($scope.simulation.spare_parts_gross_profit)
        //        //    ],
        //        //    dataLabels: dlabels
        //        //
        //        //};
        //        //
        //        //
        //        //    console.log('', seriesArray);
        //       // });
        //        //forEach(seriesArray, index, val) {}
        //        //seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        //       //console.log(seriesArray);
        //
        //        //$scope.highcharts_shop_profit.series = seriesData;
        //    }
        //
        //    //new Highcharts.Chart($scope.highcharts_shop_profit);
        //    //$scope.$apply();
        //    console.log("highchart", $scope.highcharts_shop_profit.series);

        //$scope.chart_shop_profit = {};
        //$scope.grossProfit = {};
        //$scope.chart_shop_profit = {
        //    labels:['Service & Body Shop Profit','Spare Parts Profit', 'Gross After Sales Profit'],
        //    series:["Initial", "Changed"],
        //    data:[
        //        [
        //            Math.round(calcService.static_simulation.service_bodyshop_gross_profit),
        //            Math.round(calcService.static_simulation.spare_parts_gross_profit),
        //            Math.round(calcService.static_simulation.after_sales_gross_profit),
        //            //Math.round(calcService.static_simulation.after_sales_gross_profit_age)
        //        ],
        //        [
        //            Math.round($scope.simulation.service_bodyshop_gross_profit),
        //            Math.round($scope.simulation.spare_parts_gross_profit),
        //            Math.round($scope.simulation.after_sales_gross_profit),
        //            //Math.round($scope.simulation.after_sales_gross_profit_age)
        //        ]
        //    ],
        //    options: {
        //
        //        //responsive: false,
        //        //maintainAspectRatio: false,
        //        //scaleShowGridLines: false,
        //        //barShowStroke : false,
        //        //barDatasetSpacing : 4,
        //
        //    }
        //};
        //
        //var diff = 0;
        //if(Math.round(calcService.static_simulation.after_sales_gross_profit_age) >
        //    Math.round($scope.simulation.after_sales_gross_profit_age))
        //{
        //    diff = Math.round(calcService.static_simulation.after_sales_gross_profit_age)-Math.round($scope.simulation.after_sales_gross_profit_age);
        //} else {
        //    diff = Math.round($scope.simulation.after_sales_gross_profit_age) -  Math.round(calcService.static_simulation.after_sales_gross_profit_age);
        //}
        //
        //$scope.grossProfit = {
        //    title:"Gross Profit %age",
        //    labels: ["Initial", "Changed", "Difference"],
        //    data: [
        //        Math.round(calcService.static_simulation.after_sales_gross_profit_age),
        //        Math.round($scope.simulation.after_sales_gross_profit_age),
        //        diff
        //    ],
        //    options: {
        //        title:"Gross Profit %age"
        //    }
        //};
        //console.log($scope.grossProfit);

        //}



        //, 'Gross Profit %age'

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