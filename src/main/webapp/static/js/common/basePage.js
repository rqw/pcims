/**
 * Created by Administrator on 2017/7/11 0011.
 */
/**
 * Created by hjk on 2017/3/4.
 */
var depends = [

    {name: "utils"},
    { name: "font-awesome", type: "css" },
    { name: "hjkplug", type: "css" },
    { name: "bootstrap" },
    { name: "floatWindow" },
    {name: "daterangepicker"}

];

modular.define({name:"common.basePage"},depends,function(){
    /*区间日期选择*/
    $('.rangeDatepicker').daterangepicker({
        "startDate": "03/04/2018",
        "endDate": "03/10/2017"
    }, function(start, end, label) {
        //日期选择回调
        console.log("开始时间: ' + start.format('YYYY-MM-DD') + ' 结束时间 ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });

    /*单个日期选择*/
    $('.datepicker').daterangepicker({
        "singleDatePicker": true,
        "startDate": "03/04/2018",
        "endDate": "03/10/2017"
    }, function(start, end, label) {
        //日期选择回调
        console.log("开始时间: ' + start.format('YYYY-MM-DD') + ' 结束时间 ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });




});