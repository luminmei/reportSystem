var dbutil = require("./DBUtil");

// 分页查找图书信息
function queryBookInfoByPage(page, pageSize, success) {
    var querySql = "select * from bookinfo limit ?, ?";
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
// 计算总的图书数量
function queryBookInfoOfTotal(success) {
    var querySql = "select count(*) as total from bookinfo";
    var params = [];
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
    "queryBookInfoByPage": queryBookInfoByPage,
    "queryBookInfoOfTotal": queryBookInfoOfTotal
};