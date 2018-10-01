/**
 * Created by hjk on 2017/3/11.
 */

var depends = [
    {name: "hjkplug",type:"css"},
    {name: "jquery"}
];

modular.define({name:"table"},depends,function() {

	/**
     * 插件表格
     * @param selector 创建表格放置的容器
     * @param data 表格数据对象 data.fields,data.values
     * data示例
     * var data={
     *       fields:["a","b","c"],
     *      values:[["值1","值2","值3"],["值1","值2","值3"]]
     *  }
     */
    var createDefaultTable=function(selector,data){
        var fields=data.fields;
        var values=data.values;
        var table=document.createElement("table");
        var _headTr=document.createElement("tr");
        $(_headTr).addClass("title");
        table.appendChild(_headTr);
        for(var i=0;i< fields.length;i++){
            var td=document.createElement("td");
            td.innerText=fields[i];
            _headTr.appendChild(td);
        }
        for(var i=0;i<values.length;i++){
            var tr=document.createElement("tr");
            for(var j=0;j<values[i].length;j++){
                var td=document.createElement("td");
                td.innerText=values[i][j];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        $(table).addClass("h_table h_table_blue");
        $(selector).append(table);


    }

    this.createDefaultTable=createDefaultTable;

    return this;
});