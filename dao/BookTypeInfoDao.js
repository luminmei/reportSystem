var dbutil = require("./DBUtil");
var log = require("../log");

function queryAllBookTypeInfo (success) {
    var querySql = "select * from booktypeinfo";
    var params = [];
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

function queryBookTypeById (id, success) {
    var querySql = "select * from booktypeinfo where id = ?";
    var params = [id];
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
    "queryAllBookTypeInfo": queryAllBookTypeInfo,
    "queryBookTypeById": queryBookTypeById
};