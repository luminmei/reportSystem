var path = new Map();
var bookInfoDao = require("../dao/BookInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

function queryBookInfoByPage(request, response) {
    var params = url.parse(request.url, true).query;
    bookInfoDao.queryBookInfoByPage(parseInt(params.page-1), parseInt(params.pageSize), function (result) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryBookInfoByPage", queryBookInfoByPage);

module.exports.path = path;