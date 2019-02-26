var dbutil = require("./DBUtil");

function queryBookCountOfBookType (success) {
    var querySql = "select bookTypeId,count(bookId) as total from book_type_mapping group by bookTypeId";
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
    "queryBookCountOfBookType": queryBookCountOfBookType
};