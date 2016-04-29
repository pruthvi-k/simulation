/**
 * Created by pruthvi on 28/4/16.
 */
angular.module('app.core')
    .factory('calcService', calculateSimulation);

function calculateSimulation() {
    var factory = {};

    factory.multiply = function(a, b) {
        return a * b
    }

    factory.isStaticSimulationSet = false;
    factory.static_simulation = {};
    factory.simulation = {
        vehicle_park: 4500,
        customer_retention_0_4_yrs : 93, //%
        customer_retention_4_8_yrs : 73, //%
        customer_retention_8_12_yrs : 30, //%
        customer_retention_12_yrs : 31, //%
        projected_yearly_load : "",

        service_turn_around_time : 3,
        body_turn_around_time : 7,

        accessory_sales_car : 10000,
        ew_sale_total:10,
        service_package_sale: 5,
        accessory_sales : "",
        profit_acc_sales:"",
        service_pack_sale:"",
        profit_service_pack:"",
        ew_sales : "",
        profit_ew_sale:"",

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

        body_throughput_ratio:20,
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
        overall_profit : "",
        after_sales_gross_profit_age : ""
    };

    //factory.roundNumber = function (number, precision){
    //    precision = Math.abs(parseInt(precision)) || 0;
    //    var multiplier = Math.pow(10, precision);
    //    return (Math.round(number * multiplier) / multiplier);
    //};

    factory.get_projected_yearly_load  = function() {
        //=(D2*0.4*D3)*3+(D2*0.3*D4)*2.5+(D2*0.12*D5)*2+(D2*0.08*D6)*2
        var val = ((factory.simulation.vehicle_park*0.4* (factory.simulation.customer_retention_0_4_yrs/100))*3) +
            ((factory.simulation.vehicle_park*0.3 * (factory.simulation.customer_retention_4_8_yrs/100))*2.5) +
            ((factory.simulation.vehicle_park* 0.12 * (factory.simulation.customer_retention_8_12_yrs/100))*2) +
            ((factory.simulation.vehicle_park * 0.08 * (factory.simulation.customer_retention_12_yrs/100))*2);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }

    }



    factory.get_no_of_service_bays = function() {
        var val = factory.simulation.service_throughput / 25 / 2;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_accessory_sales = function() {
        //=(H2+H11)*C23*0.2
        var val = (factory.simulation.service_throughput+factory.simulation.body_throughput)*factory.simulation.accessory_sales_car*0.2;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_no_of_bodyshop_bays = function() {
        var val = factory.simulation.body_throughput/7;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_technicians = function() {
        //=H2/25/1.2+H11/10
        var val = ((factory.simulation.service_throughput / 25 )/ 1.2)+(factory.simulation.body_throughput/10);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_service_advisor = function() {
        var val = factory.simulation.service_throughput / 25 / 4;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_customer_care = function() {
        //=(D7/12/25/5)+((I2+I11)/25/20)
        var val = (factory.simulation.projected_yearly_load / 12 / 25 / 5) +
            ((factory.simulation.service_throughput + factory.simulation.body_throughput) / 25 / 20);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_fixed_cost = function() {
        //=(D14*20000)+(D15*30000)+(D16*25000)+(D17*60000)+((D12+D13)*5000)
        var val = (factory.simulation.technicians * 20000) +
            (factory.simulation.service_advisor * 30000) +
            (factory.simulation.customer_care * 25000) +
            (factory.simulation.management_staff * 60000) +
            ((factory.simulation.no_of_service_bays + factory.simulation.no_of_bodyshop_bays) * 5000);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_parts_stock = function() {
        //=(I6+I14)*1.2
        var val = (factory.simulation.total_parts + factory.simulation.body_total_parts) * 1.2;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_interest_cost = function() {
        var val = factory.simulation.parts_stock * 0.1;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }


    factory.get_service_throughput = function() {
        //=(D7/12)*(3/D9)
        var val = (factory.simulation.projected_yearly_load / 12) * (3 / factory.simulation.service_turn_around_time);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_ew_sales = function() {
        var val = factory.simulation.service_throughput * (factory.simulation.ew_sale_total/100) * 40000;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_total_labour = function() {
        var val = factory.simulation.service_throughput*factory.simulation.service_labour_vehicle;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_total_parts = function() {
        var val = factory.simulation.service_parts_vehicle * factory.simulation.service_throughput;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }

    }

    factory.get_profit_on_labour = function() {
        var val = factory.simulation.total_labour * 0.6;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_profit_on_parts = function() {
        var val = factory.simulation.total_parts * 0.22;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_body_throughput = function() {
        //=(I2*(I10/100))*(7/D10)
        var val = ((factory.simulation.service_throughput) * (factory.simulation.body_throughput_ratio/100))*(7/factory.simulation.body_turn_around_time);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_body_total_labour = function() {
        var val = factory.simulation.body_labour_vehicle * factory.simulation.body_throughput;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_body_total_parts = function() {
        var val = factory.simulation.body_parts_vehicle * factory.simulation.body_throughput;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_body_profit_on_labour = function() {
        var val = factory.simulation.body_total_labour * 0.6;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_body_profit_on_parts = function() {
        return factory.simulation.body_total_parts * 0.22;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_service_bodyshop_gross_profit = function() {
        //=(I7+I8+I15+I16)-C18
        var val = (factory.simulation.profit_on_labour +
            factory.simulation.profit_on_parts +
            factory.simulation.body_profit_on_labour +
            factory.simulation.body_profit_on_parts) -
            factory.simulation.fixed_cost;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_spare_parts_gross_profit = function() {
        //=(I8+I16)-C21
        var val = (factory.simulation.profit_on_parts + factory.simulation.body_profit_on_parts) - factory.simulation.interest_cost;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_after_sales_gross_profit = function() {
        //=I19+I20+D27+D29+D31
        //console.log(" gross",factory.simulation.service_bodyshop_gross_profit);
        //console.log(" parts",factory.simulation.spare_parts_gross_profit);
        //console.log(" acc",factory.simulation.profit_acc_sales);
        //console.log(" service",factory.simulation.profit_service_pack);
        //console.log(" ew",factory.simulation.profit_ew_sale);


        var val = Math.round(factory.simulation.service_bodyshop_gross_profit) +
            Math.round(factory.simulation.spare_parts_gross_profit) +
            Math.round(factory.simulation.profit_acc_sales) +
            Math.round(factory.simulation.profit_service_pack) +
            Math.round(factory.simulation.profit_ew_sale);
         //factory.simulation.service_bodyshop_gross_profit + factory.simulation.spare_parts_gross_profit;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_overall_profit = function() {
        //=I21+((I2*0.1)*200000)
        //console.log('overall', factory.simulation.after_sales_gross_profit);
        var val = factory.simulation.after_sales_gross_profit + ((factory.simulation.service_throughput * 0.1) * 200000);

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_after_sales_gross_profit_age = function() {
        var val = (factory.simulation.after_sales_gross_profit / factory.simulation.overall_profit)*100;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_profit_acc_sales = function() {
        var val = factory.simulation.accessory_sales*0.4;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_service_pack_sale = function() {
        var val = factory.simulation.service_throughput*(factory.simulation.service_package_sale/100)*100000;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_profit_service_pack = function() {
        var val = factory.simulation.service_pack_sale*0.3;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }

    factory.get_profit_ew_sale = function() {
        var val = factory.simulation.ew_sales*0.3;

        if(isFinite(val)) {
            return val;
        } else {
            return 0;
        }
    }


    return factory;
}