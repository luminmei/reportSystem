var dbutil = require("./DBUtil");
var log = require("../log");
function insertLogin(userid, username, password, ctime, success) {
    var insertSql = "insert into login (`userId`,`username`,`password`,`loginTime`) values (?,?,?,?)";
    var params = [userid, username, password, ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
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
function queryLoginByDay (date, success) {
    var   querySql = "select count(*) as total,loginTime from login group by DATE_FORMAT(loginTime,'%Y-%m-%d') having DATE_FORMAT(loginTime,'%Y-%m-%d') = ?";
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
    "insertLogin": insertLogin,
    "queryLoginByDay": queryLoginByDay
};