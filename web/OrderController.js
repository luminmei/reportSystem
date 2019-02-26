var orderDao = require("../dao/OrderInfoDao");
var orderBookDetailDao = require("../dao/OrderBookDetailDao");
var bookInfoDao = require("../dao/BookInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

// 按条件查询订单信息
function queryOrderInfoByPage(request, response) {
    var params = url.parse(request.url, true).query;
    orderDao.queryOrderInfoByPage(parseInt(params.page-1), parseInt(params.pageSize),params.orderCode ,function (result) {
        var arr = result;
        arr.map(val => {
            var temp = val;
            temp.orderDate = timeUtil.formatDate(val.orderDate);
            return temp
        });
        orderDao.queryOrderInfoOfTotal(params.orderCode ,function (res) {
            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
            response.write(respUtil.writeTotal("success", "查询成功", arr, res[0].total));
            response.end()
        });

    })
}
path.set("/api/queryOrderInfoByPage", queryOrderInfoByPage);

// 查询订单的详细信息
function queryOrderBoolDetailByOrderCode (request, response) {
    var params = url.parse(request.url, true).query;
    orderBookDetailDao.queryOrderBoolDetailByOrderCode(params.orderCode ,function (result) {
        result.forEach(val => {
            val.book = null;
        });
        result.forEach((val, index) => {
            bookInfoDao.queryBookDetailById(val.bookId, function (res) {
                val.book = res[0];
                if (index == result.length -1) {
                    result.map(val => {
                        var temp = val;
                        temp.book.bookPubDate = timeUtil.formatDate(val.book.bookPubDate);
                        temp.book.bookStoreTime = timeUtil.formatDate(val.book.bookStoreTime);
                        return temp
                    });
                    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
                    response.write(respUtil.writeResult("success", "查询成功", result));
                    response.end()
                }
            })
        })
    })
}
path.set("/api/queryOrderBoolDetailByOrderCode", queryOrderBoolDetailByOrderCode);
module.exports.path = path;