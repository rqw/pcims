/**
 * Created by hjk on 2017/3/10.
 */
//多选支持需要引入的依赖
var depends = [
    {name: "jquery"},
    {name:"hjkplug",type:"css"},
    {name:"echarts"}
];
modular.define({name: "hecharts"}, depends, function () {
    var defaultColorArr=['#0188cc','#18b358','#7e6b5a','#eb6876','#C1232B','#B5C334','#FCCE10','#E87C25'];
    var hcharts={
        /**
         * @parameter containerid String 容器id
         * @parameter title String 标题
         * @parameter yAxisStringArr String[] y轴列表标题
         * @parameter xAxisValArr int[] y轴对应x轴的值列表
         * @parameter colorArr String[]  颜色值列表
         * **/
        createCharts:function(containerid,title,yAxisStringArr,xAxisValArr,colorArr){
            $(".containerid").width($(".containerid"));
            //颜色为空时给定默认值
            if(colorArr==null||colorArr.length<1){
                colorArr=defaultColorArr;
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(containerid),theme);
            option = {
                title: {
                    show:false,
                    x: 'center',
                    text:title,
                    subtext: 'Rainbow bar example',
                    link: 'http://www.xx.html',
                    left:"10px",
                    top:"middle"
                },
                tooltip: {
                    trigger: 'item'
                },
                calculable: true,
                grid: {
                    top:'0',
                    left: '0',
                    right: '150px',
                    bottom: '0'
                },
                xAxis: [
                    {
                        type: 'value',
                        show: false
                    }
                ],
                yAxis: [
                    {
                        type : 'category',
                        show: false,
                        data: ['Line'],
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#eb6876','#7e6b5a','#18b358','#0188cc'
                                        /* '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                         '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                         '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                         */
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label : {show: true, position: 'right'}
                            }
                        }
                    }
                ],
                legend: {
                    data: yAxisStringArr,//['上派镇中心医院','严店乡卫生室','官亭镇中心卫生所','肥西县'],
                    left:'right',
                    top:'middle',
                    orient:'vertical'
                },
                series: []
            };

            for(var i=0;i<yAxisStringArr.length;i++){
                var o={
                    name: yAxisStringArr[i],
                    type: 'bar',
                    barWidth : 15,//柱图宽度
                    barGap:"70%",
                    itemStyle: {
                        normal: {
                            color:[colorArr[i]]
                        }

                    },
                    data: [xAxisValArr[i]]
                }
                option.series.push(o);
            }
            // 使用刚指定的配置项和数据显示图表。



            myChart.setOption(option);
            $(window).resize(myChart.resize);
            return myChart;
        },

        /**
         * 创建一个默认饼图
         * @parameter containerid String 容器id
         * @parameter title String 标题
         * @parameter seriesName String 饼图名称
         * @parameter seriesData int[{value:0,name:''},...];
         * @parameter colorArr String[]  颜色值列表
         * **/
        createDefaultPie:function(containerid,title,seriesName,seriesData,colorArr){
            if(!colorArr){
                colorArr=defaultColorArr;
            }
            option = {
                color:colorArr,

                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:144, name:'安徽'}

                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };



            var myChart = echarts.init(document.getElementById("chart"),theme);
            myChart.setOption(option);
            $(window).resize(myChart.resize);

            return myChart;

        },
        /**
         * 创建一个饼图
         * @parameter containerid String 容器id
         * @parameter title String 标题
         * @parameter seriesName String 饼图名称
         * @parameter seriesData int[{value:0,name:''},...];
         * @parameter colorArr String[]  颜色值列表
         * **/
        createPie:function(containerid,title,seriesName,seriesData,colorArr){
            if(!colorArr){
                colorArr=defaultColorArr;
            }
            option = {
                backgroundColor: '#fff',
                title: {
                    text: title,
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#333'
                    }
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 0,
                    max: 10000,
                    inRange: {
                        colorLightness: [0.5, 1]
                    }
                },
                series : [
                    {
                        name:seriesName,
                        type:'pie',
                        radius : 100,
                        center: ['50%', '50%'],
                        data:seriesData.sort(function (a, b) { return a.value - b.value}),
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#044f73'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(150, 150, 150, 0.4)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {

                            normal: {
//	        	                	color: function(params) {
//	                                    // build a color map as your need.
//	        	                		var colorList=defaultColorArr;
//	                                    if(colorArr!=null){
//	                                    	colorList = colorArr;
//	                                    }	                                   
//	                                    return colorList[params.dataIndex]
//	                                },
                            	color: '#c55252',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                label:{ 
                                    show: true, 
                                    formatter: '{b}\n{c} ({d}%)' 
                                  }, 
                                labelLine :{show:true} 
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById("chart"),theme);
            myChart.setOption(option);
            $(window).resize(myChart.resize);
            return myChart;
        },
        /**
         *
         * @param containerid
         * @param xDatas
         * @param yDatas
         * @returns {myChart|*}
         */
        createPEDChart:function(containerid,xDatas,yDatas){
            var option = {
                backgroundColor:"#fff",
                legend: {
                    data:[]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLine:{
                        lineStyle:{
                            color:"#aaaaaa"
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:"#aaaaaa"
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    offset:20
                },
                series: []
            };
            var colorsArr=["#f07d00","#16b455","#16b455","#a764db","#f22200","#9bb200"];
            var serie=function(){
                var _serie={
                    name:'--',
                    type:'line',
                    stack: '总量',
                    data:[],
                    itemStyle: {
                        normal: {
                            color:"#666",
                            lineStyle:{
                                type:'dotted'
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position:'bottom'
                        }
                    },
                    symbolSize:6,
                    symbol:"circle",
                    lineStyle:{
                        normal:{
                            width:1
                        }
                    }
                }
                return _serie;
            }
            option.xAxis.data=xDatas;
            for(var i=0;i<yDatas.length;i++){
                var _s=serie();
                _s.name=yDatas[i].name;
                option.legend.data.push(_s.name);
                _s.data=yDatas[i].data;
                if(yDatas[i].color==null){
                    _s.itemStyle.normal.color=colorsArr[i];
                }else{
                    _s.itemStyle.normal.color=yDatas[i].color;
                }
                option.series.push(_s);
            }

            var chart = echarts.init(document.getElementById(containerid),theme);
            chart.setOption(option);
            $(window).resize(chart.resize);
            return myChart;
        },

        /**
         * 创建折线图
         * @param containerid
         * @param xDatas
         * @param yDatas
         * @param colorsArr
         * @param title
         * @param lineType 连线类型,支持参数:'dotted'虚线 'solid'实线
         * @returns {*}
         */
        createBrokenLine:function(containerid,xDatas,yDatas,colorsArr,title,lineType){
            var option = {
                backgroundColor:"#fff",
                legend: {
                    data:[]
                },
                title : {
                    text: '',
                    subtext: ''
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '30%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    //设置字体倾斜  
                    axisLabel:{  
                        interval:0,  
                        rotate:45,//倾斜度 -90 至 90 默认为0  
                        margin:2,  
                        textStyle:{  
                            fontWeight:"bolder",  
                            color:"#000000"  
                        }  
                    },    
                    axisLine:{
                        lineStyle:{
                            color:"#aaaaaa"
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:"#aaaaaa"
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    offset:30
                },
                series: []
            };
            var _colorsArr=["#f07d00","#16b455","#a764db","#f22200","#9bb200"];
            if(colorsArr!=null){
                _colorsArr=colorsArr;
            }
            if(title!=null){
	            option.title.text=title[0].text;
	            option.title.subtext=title[0].subtext;
            }
            var serie=function(){
            	if(lineType==null||lineType==""){
            		_lineType='dotted';
            	}else{
            		_lineType=lineType;
            	}
                var _serie={
                    name:'--',
                    type:'line',
                    data:[],
                    itemStyle: {
                        normal: {
                            color:"#666",
                            lineStyle:{
                                type:_lineType
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position:'bottom'
                        }
                    },
                    symbolSize:6,
                    symbol:"circle",
                    lineStyle:{
                        normal:{
                            width:1
                        }
                    }
                }
                return _serie;
            }
            option.xAxis.data=xDatas;
            for(var i=0;i<yDatas.length;i++){
                var _s=serie();
                _s.name=yDatas[i].name;
                option.legend.data.push(_s.name);
                _s.data=yDatas[i].data;
                if(yDatas[i].color==null){
                    _s.itemStyle.normal.color=_colorsArr[i];
                }else{
                    _s.itemStyle.normal.color=yDatas[i].color;
                }
                option.series.push(_s);
            }
            var myChart = echarts.init(document.getElementById(containerid),theme);
            myChart.setOption(option);
            $(window).resize(myChart.resize);
            return myChart;
        },

        /**
         * 创建一个增量的bar
         * @param containerid
         * @param itemDatas.项目数据
         * @param yDatas y轴数据
         * @param seriesData 数据列表
                数据实例：[
                             {
                                 name: '搜索引擎',
                                 type: 'bar',
                                 stack: '总量',
                                 label: {
                                     normal: {
                                         show: true,
                                         position: 'insideRight'
                                     }
                                 },
                                 data: [820, 832, 901, 934, 1290, 1330, 1320]
                             }
                         ]
         * @param colorsArr
         */
        createIncreasedBar:function(containerid,itemDatas,yDatas,seriesData,colorsArr){

            option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: itemDatas
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: yDatas
                },
                series: seriesData
            };

            var myChart = echarts.init(document.getElementById(containerid),theme);
            myChart.setOption(option);
            $(window).resize(myChart.resize);
            return myChart;
        }

    }



    return hcharts;

});