var path = new Map();
var bookInfoDao = require("../dao/BookInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

// 按条件查询图书信息
function queryBookInfoByPage(request, response) {
    var params = url.parse(request.url, true).query;
    bookInfoDao.queryBookInfoByPage(parseInt(params.page-1), parseInt(params.pageSize),params.bookName , params.bookTypeName ,function (result) {
        var arr = result;
        arr.map(val => {
           var temp = val;
            temp.bookPubDate = timeUtil.formatDate(val.bookPubDate);
            temp.bookStoreTime = timeUtil.formatDate(val.bookStoreTime);
           return temp
        });
        bookInfoDao.queryBookInfoOfTotal(params.bookName , params.bookTypeName ,function (res) {
            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
            response.write(respUtil.writeTotal("success", "查询成功", arr, res[0].total));
            response.end()
        });

    })
}
path.set("/api/queryBookInfoByPage", queryBookInfoByPage);
function queryBookDetailById (request, response) {
    var params = url.parse(request.url, true).query;

    bookInfoDao.queryBookDetailById(params.id, (result) => {
        var arr = result;
        arr.map(val => {
            var temp = val;
            val.bookPubDate = timeUtil.formatDate(val.bookPubDate);
            val.bookStoreTime = timeUtil.formatDate(val.bookStoreTime);
            return temp
        });
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeTotal("success", "查询成功", arr[0]));
        response.end()
    })
}
path.set("/api/queryBookDetailById", queryBookDetailById);
module.exports.path = path;