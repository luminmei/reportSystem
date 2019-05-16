var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");

var bosyParser = require("body-parser");
var log = require("./log");
var app = new express();
app.use(bosyParser.urlencoded({extended: false}))
app.use(cookie());

// 静态页面
app.use(express.static("./page/"));

// 拦截器
app.get("/api/*", function (request, response, next) {
    if (request.cookies.id) {
        next();
        log(request.url)
    } else {
        response.writeHead(200, {"Content-type": "text/html;charset=utf-8"}); // 返回中文时候设置
        response.write(JSON.stringify({status: 'error', msg: '未登录', data: null}));
        response.end();
    }
});

app.get("/api/queryBookInfoByPage", loader.get("/api/queryBookInfoByPage"));
app.get("/api/queryAllBookTypeInfo", loader.get("/api/queryAllBookTypeInfo"));
app.get("/api/queryBookDetailById", loader.get("/api/queryBookDetailById"));
app.get("/api/queryCustomerByPage", loader.get("/api/queryCustomerByPage"));
app.get("/api/queryOrderInfoByPage", loader.get("/api/queryOrderInfoByPage"));
app.get("/api/queryOrderBookDetailByOrderCode", loader.get("/api/queryOrderBookDetailByOrderCode"));
app.get("/api/queryBookCountOfBookType", loader.get("/api/queryBookCountOfBookType"));
app.get("/api/queryOrderBookByIdOfCountAll", loader.get("/api/queryOrderBookByIdOfCountAll"));
app.get("/api/queryOrderInfoByMonth", loader.get("/api/queryOrderInfoByMonth"));
app.get("/api/queryOrderInfoByPayMethod", loader.get("/api/queryOrderInfoByPayMethod"));
app.get("/api/queryOrderInfoByPostMethod", loader.get("/api/queryOrderInfoByPostMethod"));
app.get("/api/queryOrderInfoByRecCity", loader.get("/api/queryOrderInfoByRecCity"));
app.get("/api/queryOrderInfoByRecProvince", loader.get("/api/queryOrderInfoByRecProvince"));
app.get("/api/queryOrderBookByMonth", loader.get("/api/queryOrderBookByMonth"));
app.get("/api/queryCustomerInfoOfTotal", loader.get("/api/queryCustomerInfoOfTotal"));
app.get("/api/queryCustomerByDay", loader.get("/api/queryCustomerByDay"));
app.get("/api/queryOrderByDay", loader.get("/api/queryOrderByDay"));
app.get("/api/queryLoginByDay", loader.get("/api/queryLoginByDay"));

app.post("/login", loader.get("/login"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
    log("服务已启动")
});