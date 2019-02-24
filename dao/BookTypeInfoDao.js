var dbutil = require("./DBUtil");

function queryAllBookTypeInfo (success) {
    var querySql = "select * from booktypeinfo";
    var params = [];
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
    "queryAllBookTypeInfo": queryAllBookTypeInfo
};