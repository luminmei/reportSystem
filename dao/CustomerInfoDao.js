var dbutil = require("./DBUtil");
var log = require("../log");
// 分页查找客户信息
function queryCustomerByPage(page, pageSize, customerName,  success) {
    var querySql = "";
    var params = [];
    if (customerName) {
        querySql = "select * from customerinfo where customerName=? limit ?, ?";
        params = [customerName, page * pageSize, pageSize];
    } else {
        querySql = "select * from customerinfo limit ?, ?";
        params = [page * pageSize, pageSize];
    }

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
// 计算总的客户数量
function queryCustomerInfoOfTotal(customerName ,success) {
    var querySql = "";
    var params = [];
    if (customerName) {
        querySql = "select count(*) as total from customerinfo where customerName=?";
        params = [customerName];
    } else {
        querySql = "select count(*) as total from customerinfo";
        params = [];
    }

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
// 按日查询客户数量
function queryCustomerByDay (date, success) {
    var   querySql = "select count(*) as total,customerRegTime from customerinfo group by DATE_FORMAT(customerRegTime,'%Y-%m-%d') having customerRegTime = ?";
    var   params = [date];

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
    "queryCustomerByPage": queryCustomerByPage,
    "queryCustomerInfoOfTotal": queryCustomerInfoOfTotal,
    "queryCustomerByDay": queryCustomerByDay
};