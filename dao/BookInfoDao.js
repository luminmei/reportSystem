var dbutil = require("./DBUtil");

function queryBookInfoByPage(page, pageSize, success) {
    var querySql = "select * from tb_bookinfo limit ?, ?";
    // 偏移量
    var params = [page * pageSize, pageSize];

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
    "queryBookInfoByPage": queryBookInfoByPage
};