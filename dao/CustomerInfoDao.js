var dbutil = require("./DBUtil");
// 分页查找客户信息
function queryCustomerByPage(page, pageSize, customerName,  success) {
    var querySql = "";
    var parmas = [];
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
            console.log(error)
        }
    });
    connection.end()
}
// 计算总的客户数量
function queryCustomerInfoOfTotal(customerName ,success) {
    var querySql = "";
    var parmas = [];
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
            console.log(error)
        }
    });
    connection.end()
}

module.exports = {
    "queryCustomerByPage": queryCustomerByPage,
    "queryCustomerInfoOfTotal": queryCustomerInfoOfTotal
};