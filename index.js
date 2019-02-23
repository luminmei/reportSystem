var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var app = new express();

app.use(express.static("./page/"));

app.get("/queryBookInfoByPage", loader.get("/queryBookInfoByPage"));

app.listen(globalConfig.port, function () {
    console.log("服务已启动");
});