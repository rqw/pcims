import store from "@/store.js";
window.modular={
    topModular : function() {
        var win = window;
        try {
            while (win.parent == null || !win.parent.modular || win !== win.parent) {
                win = win.parent;
            }
        } catch (e) {
            console.log(e);
        }
        return win.modular;
    },
    container:{

    },
    register:function(name,obj){
        this.container[name]=obj;
    },
    find: function(name) {
        return this.container[name];
    },
    win:window,
    currentUser:store.state.session
}