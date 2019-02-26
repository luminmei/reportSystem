var dbutil = require("./DBUtil");
// 分页查找订单信息
function queryOrderInfoByPage(page, pageSize, orderCode,  success) {
    var querySql = "";
    var parmas = [];
    if (orderCode) {
        querySql = "select * from orderinfo where orderCode=? limit ?, ?";
        params = [orderCode, page * pageSize, pageSize];
    } else {
        querySql = "select * from orderinfo limit ?, ?";
        params = [page * pageSize, pageSize];
    }

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}
// 计算总的客户数量
function queryOrderInfoOfTotal(orderCode ,success) {
    var querySql = "";
    var parmas = [];
    if (orderCode) {
        querySql = "select count(*) as total from orderinfo where orderCode=?";
        params = [orderCode];
    } else {
        querySql = "select count(*) as total from orderinfo";
        params = [];
    }

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

module.exports = {
    "queryOrderInfoByPage": queryOrderInfoByPage,
    "queryOrderInfoOfTotal": queryOrderInfoOfTotal
};