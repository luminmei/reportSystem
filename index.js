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
app.get("/api/queryOrderBoolDetailByOrderCode", loader.get("/api/queryOrderBoolDetailByOrderCode"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});