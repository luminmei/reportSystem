var bookTypeInfoDao = require("../dao/BookTypeInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

function queryAllBookTypeInfo (request, response) {
    bookTypeInfoDao.queryAllBookTypeInfo(function (result) {
        response.writeHead(200, {"ContentType": "Aplication/json;charset:UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/api/queryAllBookTypeInfo", queryAllBookTypeInfo);

module.exports.path = path;