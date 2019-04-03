var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/"));

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
app.get("/api/queryOrderInfoByPayMethodOfMoney", loader.get("/api/queryOrderInfoByPayMethodOfMoney"));
app.get("/api/queryOrderInfoByPostMethod", loader.get("/api/queryOrderInfoByPostMethod"));
app.get("/api/queryOrderInfoByRecCity", loader.get("/api/queryOrderInfoByRecCity"));
app.get("/api/queryOrderInfoByRecProvince", loader.get("/api/queryOrderInfoByRecProvince"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});