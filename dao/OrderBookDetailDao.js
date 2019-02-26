var dbutil = require("./DBUtil");

function queryOrderBoolDetailByOrderCode (orderCode, success) {
    var querySql = "select * from order_book where orderCode=?";
    var params = [orderCode];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    connection.end()
}
module.exports = {
    "queryOrderBoolDetailByOrderCode": queryOrderBoolDetailByOrderCode
};