var dbutil = require("./DBUtil");
var log = require("../log");
// 分页查找图书信息
function queryBookInfoByPage(page, pageSize,bookName, bookTypeName, success) {
    var querySql = "";
    var params = [];
    if (bookName && bookTypeName) {
        querySql = `select * from bookinfo where bookName like '%${bookName}%' and bookTypeName=? limit ?, ?`;
        params = [bookTypeName, page * pageSize, pageSize];
    } else if (bookName) {
        querySql = `select * from bookinfo where bookName like '%${bookName}%' limit ?, ?`;
        params = [page * pageSize, pageSize];
    } else if (bookTypeName) {
        querySql = "select * from bookinfo where bookTypeName=? limit ?, ?";
        params = [bookTypeName, page * pageSize, pageSize];
    } else {
        querySql = "select * from bookinfo limit ?, ?";
        params = [page * pageSize, pageSize];
    }

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
// 计算总的图书数量
function queryBookInfoOfTotal(bookName ,bookTypeName ,success) {
    var querySql = "";
    var params = [];
    if (bookName && bookTypeName) {
        querySql = `select count(*) as total from bookinfo where bookName like '%${bookName}%' and bookTypeName=?`;
        params = [bookTypeName];
    } else if (bookName) {
        querySql = `select count(*) as total from bookinfo where bookName like '%${bookName}%'`;
        params = [];
    } else if (bookTypeName) {
        querySql = "select count(*) as total from bookinfo where bookTypeName=?";
        params = [bookTypeName];
    } else {
        querySql = "select count(*) as total from bookinfo";
        params = [];
    }

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
// 根据id查找图书信息
function queryBookDetailById(id, success) {
    var querySql = "select * from bookinfo where id = ?";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params , function (error, result) {
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
    "queryBookInfoByPage": queryBookInfoByPage,
    "queryBookInfoOfTotal": queryBookInfoOfTotal,
    "queryBookDetailById": queryBookDetailById
};