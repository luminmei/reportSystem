var loginDao = require("../dao/LoginDao");
var respUtil = require("../util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var moment = require("moment");
var url = require("url");
var path = new Map();

function queryLoginByDay(request, response) {
    var params = url.parse(request.url, true).query;
    loginDao.queryLoginByDay(params.date, function (result) {
        if (result.length > 0) {
            response.header("Content-Type", "text/html; charset=utf-8");
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result[0]));
            response.end()
        } else {
            response.header("Content-Type", "text/html; charset=utf-8");
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", {total:0}));
            response.end()
        }
    });
}
path.set("/api/queryLoginByDay", queryLoginByDay);
module.exports.path = path;