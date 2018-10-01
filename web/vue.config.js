module.exports = {
    baseUrl: '/pms/app/',
    outputDir: '../src/main/resources/public/app',
    devServer: {
        https: false,
        host:"0.0.0.0",
        port:8081,
        hotOnly: false,
        // 设置代理
        proxy: {
            "^/pms/(?!app$)(?!app\/).*": {
                // 域名
                target: "http://localhost:8080", 
                 // 是否启用websockets
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/": "/"
                }
            }
        }
    }
}