import TabBar from "../home/TabBar";
let tabs={
    open:function(options){
        //{
        //     id:tabid,
        //     name: title,
        //     url: url
        // }
        TabBar.open(options);
    }
}
window.modular.register("tabs",tabs);
export default tabs;