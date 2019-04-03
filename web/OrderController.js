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
function queryOrderBookDetailByOrderCode (request, response) {
    var params = url.parse(request.url, true).query;
    orderBookDetailDao.queryOrderBookDetailByOrderCode(params.orderCode ,function (result) {
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
path.set("/api/queryOrderBookDetailByOrderCode", queryOrderBookDetailByOrderCode);

function queryOrderBookByIdOfCountAll (request, response) {
    orderBookDetailDao.queryOrderBookByIdOfCountAll(10, function (result) {
        result.forEach(val => {
            val.book = null;
        });
        result.forEach((val, index) => {
            bookInfoDao.queryBookDetailById(val.bookId, function (res) {
                val.book = res[0];
                if (index == result.length -1) {
                    result.map(val => {
                        var temp = val;
                        temp.book && (temp.book.bookPubDate = timeUtil.formatDate(val.book.bookPubDate));
                        temp.book && (temp.book.bookStoreTime = timeUtil.formatDate(val.book.bookStoreTime));
                        return temp
                    });
                    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
                    response.write(respUtil.writeResult("success", "查询成功", result));
                    response.end();
                }
            })
        })
    })
}
path.set("/api/queryOrderBookByIdOfCountAll", queryOrderBookByIdOfCountAll);

// 按月份进行查询
function queryOrderInfoByMonth (request, response) {
    orderDao.queryOrderInfoByMonth(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}

path.set("/api/queryOrderInfoByMonth", queryOrderInfoByMonth);

// 按支付方式进行查询 查询数量
function queryOrderInfoByPayMethod (request, response) {
    orderDao.queryOrderInfoByPayMethod(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/api/queryOrderInfoByPayMethod", queryOrderInfoByPayMethod);
// 按支付方式进行查询 查询金额
function queryOrderInfoByPayMethodOfMoney (request, response) {
    orderDao.queryOrderInfoByPayMethodOfMoney(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/api/queryOrderInfoByPayMethodOfMoney", queryOrderInfoByPayMethodOfMoney);


function queryOrderInfoByPostMethod (request, response) {
    orderDao.queryOrderInfoByPostMethod(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/api/queryOrderInfoByPostMethod", queryOrderInfoByPostMethod);

function queryOrderInfoByRecCity (request, response) {
    orderDao.queryOrderInfoByRecCity(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/api/queryOrderInfoByRecCity", queryOrderInfoByRecCity);

function queryOrderInfoByRecProvince (request, response) {
    orderDao.queryOrderInfoByRecProvince(function (res) {
        response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", res));
        response.end();
    })
}
path.set("/api/queryOrderInfoByRecProvince", queryOrderInfoByRecProvince);

module.exports.path = path;