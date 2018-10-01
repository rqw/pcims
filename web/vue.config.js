module.exports = {
    baseUrl: '/app/',
    outputDir: '../src/main/resources/public/app',
    lintOnSave: false,
    devServer: {
        open: true,
        https: false,
        port:8081,
        hotOnly: false,
        // 设置代理
        proxy: {
            "^/(?!app$)(?!app\/).*": {
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