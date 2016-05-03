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
                $scope.tab.label = "Customer Retention";
                $scope.tab.type = "customer";
                $scope.tab.customer_retention = false;
                break;
            case 'productivity':
                $scope.tab.label = "Productivity";
                $scope.tab.type = "productivity";
                $scope.tab.productivity = false;
                break;
            case 'upselling':
                $scope.tab.label = "Upselling";
                $scope.tab.type = "upselling";
                $scope.tab.upselling = false;
                break;
            case 'body-shop':
                $scope.tab.label = "Body Shop";
                $scope.tab.type = "body-shop";
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

        $scope.setGraph = function() {
            $scope.chart_shop_profit = {
                labels:['Service & Body Shop Profit', 'Spare Parts Profit', 'Upselling Profit'],
                series:["Initial", "Changed"],
                "colours": [
                    {
                        "fillColor": "rgba(0, 157, 222, 1)",
                        "strokeColor": "rgba(0,105,184,1)",
                        "pointColor": "rgba(0,105,184,1)",
                        "pointStrokeColor": "#009DDE",
                        "pointHighlightFill": "#0069B8",
                        "pointHighlightStroke": "rgba(151,187,205,0.8)"
                    },
                    {
                        "fillColor": "rgba(221, 215, 64, 1)",
                        "strokeColor": "rgba(194,188,49,1)",
                        "pointColor": "rgba(194,188,49,1)",
                        "pointStrokeColor": "#DDD740",
                        "pointHighlightFill": "#C2BC31",
                        "pointHighlightStroke": "rgba(151,187,205,0.8)",
                    }
                ],
                data:[
                    [
                        Math.round(calcService.static_simulation.service_bodyshop_gross_profit),
                        Math.round(calcService.static_simulation.spare_parts_gross_profit),
                        Math.round(calcService.static_simulation.upselling_gross_profit)
                    ],
                    [
                        Math.round(calcService.simulation.service_bodyshop_gross_profit),
                        Math.round(calcService.simulation.spare_parts_gross_profit),
                        Math.round(calcService.simulation.upselling_gross_profit)
                    ]
                ],
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    isFixedWidth:false,

                }
            };

            $scope.chart_overall_profit = {
                multiTooltipTemplate: function(label) {
                    return '---';
                },
                labels:['Overall Profit'],
                series:["Initial", "Changed"],
                borderWidth:1,
                "colours": [{
                    "fillColor": "rgba(127, 168, 76, 1)",
                    "strokeColor": "rgba(88,123,45,1)",
                    "pointColor": "rgba(88,123,45,1)",
                    "pointStrokeColor": "#7FA84C",
                    "pointHighlightFill": "#587B2D",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)",
                    borderWidth:1,
                    pointBorderWidth:1
                },{
                    "fillColor": "rgba(243, 170, 56, 1)",
                    "strokeColor": "rgba(219, 168, 35,1)",
                    "pointColor": "rgba(219, 168, 35,1)",
                    "pointStrokeColor": "#F3AA38",
                    "pointHighlightFill": "#DBA823",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)",
                    borderWidth:1,
                    pointBorderWidth:1
                }
                ],
                data:[
                    [
                        Math.round(calcService.static_simulation.after_sales_gross_profit_age)
                    ],
                    [
                        Math.round(calcService.simulation.after_sales_gross_profit_age)
                    ]
                ],
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    scaleBeginAtZero : false,
                    //tooltipEvents: [],

                    showTooltips : true,
                    //showInlineValues : true,
                    centeredInllineValues : false,
                    //tooltipCaretSize : 6,
                    //tooltipTemplate :'<%=value %>',

                    onAnimationComplete: function () {
                        //this.showTooltip(this.datasets[0].bars, true);
                        //this.eachBars(function(bar){
                        //    var tooltipPosition = bar.tooltipPosition();
                        //    new Chart.Tooltip({
                        //        x: Math.round(tooltipPosition.x),
                        //        y: Math.round(tooltipPosition.y),//this.options.centeredInllineValues
                        //            //? Math.round( bar.y + (bar.height() / 2) + ((this.options.tooltipFontSize + this.options.tooltipYPadding) / 2) )
                        //            //: Math.round(tooltipPosition.y),
                        //        xPadding: this.options.tooltipXPadding,
                        //        yPadding: this.options.tooltipYPadding,
                        //        fillColor: this.options.tooltipFillColor,
                        //        textColor: this.options.tooltipFontColor,
                        //        fontFamily: this.options.tooltipFontFamily,
                        //        fontStyle: this.options.tooltipFontStyle,
                        //        fontSize: this.options.tooltipFontSize,
                        //        caretHeight: this.options.tooltipCaretSize,
                        //        cornerRadius: this.options.tooltipCornerRadius,
                        //        text :Chart.helpers.template(this.options.tooltipTemplate, bar),
                        //        chart: this.chart
                        //    }).draw();
                        //});
                    }

                }
            };
        }



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