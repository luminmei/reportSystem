var path = new Map();
var bookInfoDao = require("../dao/BookInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

function queryBookInfoByPage(request, response) {
    var params = url.parse(request.url, true).query;
    bookInfoDao.queryBookInfoByPage(parseInt(params.page-1), parseInt(params.pageSize), function (result) {
        var arr = result;
        arr.map(val => {
           var temp = val;
           val.bookPubDate = timeUtil.formatDate(val.bookPubDate);
           val.bookStoreTime = timeUtil.formatDate(val.bookStoreTime);
           return temp
        });
        bookInfoDao.queryBookInfoOfTotal(function (res) {
            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
            response.write(respUtil.writeTotal("success", "查询成功", arr, res[0].total));
            response.end()
        });

    })
}
path.set("/queryBookInfoByPage", queryBookInfoByPage);

module.exports.path = path;