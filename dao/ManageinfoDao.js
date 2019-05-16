var dbutil = require("./DBUtil");
var log = require("../log");
function queryManageByName (username, success) {
    var querySql = "select * from manageinfo where username = ?";
    var params = [username];
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
module.exports = {
    "queryManageByName": queryManageByName
};