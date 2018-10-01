import SockJS from "socket.io-client";
let news = {
        controller : {},
        register : function(args) {
            this.controller[args.name] = args.control;
        },
        unregister:function(args){
            delete this.controller[args.name] ;
        },
        execute : function(data) {
            var json = {};
            try {
                json = eval(data);
            } catch (e) {
                console.log(e);
            }
            if (json.name !== void 0) {
                try {
                    this.controller[json.name](json);
                } catch (e) {
                }
            }
        },
        subscribe : function(args) {
            var transports = [ "xdr-streaming" ];
            var _this = this;
            if ('WebSocket' in window) {
                var protocol = location.protocol;
                var hostname = location.hostname;
                var root = loader.dynamicPath;
                var port = location.port;
                if (protocol.indexOf("s") != -1)
                    protocol = "wss://";
                else
                    protocol = "ws://";
                if (port !== "") {
                    port = ":" + port;
                }
                ws = new WebSocket(protocol + hostname + port + root
                    + "web/socket/server?channel=" + args.channel);
            } else {
                var protocol = location.protocol + "//";
                var hostname = location.hostname;
                var root = loader.dynamicPath;
                var port = location.port;
                if (port !== "") {
                    port = ":" + port;
                }
                try {
                    ws = new SockJS(protocol + hostname + port + root
                        + "web/socket/server/socketjs", undefined, {
                        protocols_whitelist : transports
                    });
                } catch (e) {

                }
            }
            ws.onopen = function() {
            };
            ws.onmessage = function(event) {
                args.recvMsg(event.data);
                _this.execute(event.data);
            };
            ws.onclose = function(event) {
            };
            if ('WebSocket' in window) {
            } else {
                var inter = setInterval(function() {
                    try {
                        ws.send("channel=" + args.channel);
                        clearInterval(inter);
                    } catch (e) {
                    }
                }, 2000);
            }
        }
    };
modular.topModular().register("news",news);
export default news;