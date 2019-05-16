var dbutil = require("./DBUtil");
var log = require("../log");
// 根据图书编号查找图书
function queryOrderBookDetailByOrderCode (orderCode, success) {
    var querySql = "select * from order_book where orderCode=?";
    var params = [orderCode];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            log(error)
            console.log(error)
        }
    });
    connection.end()
}
// 查找销量最高的图书
function queryOrderBookByIdOfCountAll (endNum = 10, success) {
    var querySql = "select bookId,sum(bookCount) as total from order_book group by bookId order by sum(bookCount) desc limit ?";
    var params = [endNum];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            log(error)
            console.log(error)
        }
    });
    connection.end()
}
// 根据分类查找销量最高的图书
function queryOrderBookByIdOfCountByType (bookTypeName, endNum = 10, success) {
    var querySql = "select bookId,bookTypeName,sum(bookCount) as total from order_book  group by bookId having bookTypeName = ? order by sum(bookCount) desc limit ?";
    var params = [bookTypeName, endNum];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            log(error)
            console.log(error)
        }
    });
    connection.end()
}

// 按日期查询订单
function queryOrderBookByMonth (month, success) {
    var querySql = "select bookId,bookTypeName,sum(bookCount) as total,orderDate from order_book  group by bookId having DATE_FORMAT(orderDate,'%c') = ? order by sum(bookCount) desc";
    var params = [month];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            log(error)
            console.log(error)
        }
    });
    connection.end()
}
module.exports = {
    "queryOrderBookDetailByOrderCode": queryOrderBookDetailByOrderCode,
    "queryOrderBookByIdOfCountAll": queryOrderBookByIdOfCountAll,
    "queryOrderBookByIdOfCountByType": queryOrderBookByIdOfCountByType,
    "queryOrderBookByMonth":queryOrderBookByMonth
};