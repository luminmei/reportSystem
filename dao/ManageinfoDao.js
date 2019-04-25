var dbutil = require("./DBUtil");

function queryManageByName (username, success) {
    var querySql = "select * from manageinfo where username = ?";
    var params = [username];
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
    "queryManageByName": queryManageByName
};