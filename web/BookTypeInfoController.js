var bookTypeInfoDao = require("../dao/BookTypeInfoDao");
var bookTypeMappingDao = require("../dao/BookTypeMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

function queryAllBookTypeInfo (request, response) {
    bookTypeInfoDao.queryAllBookTypeInfo(function (result) {
        response.writeHead(200, {"ContentType": "Aplication/json;charset:UTF-8"});
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/api/queryAllBookTypeInfo", queryAllBookTypeInfo);

function queryBookCountOfBookType (request, response) {
    bookTypeMappingDao.queryBookCountOfBookType(function (result) {
        var temp = result;
        result.forEach((val, index) => {
            bookTypeInfoDao.queryBookTypeById(val.bookTypeId, function (res) {
                val.bookTypeName = res[0].bookTypeName;
                if (index == temp.length-1) {
                    response.writeHead(200, {"ContentType": "Aplication/json;charset:UTF-8"});
                    response.write(respUtil.writeResult("success", "查询成功", result));
                    response.end()
                }
            })
        });
    })
}
path.set("/api/queryBookCountOfBookType", queryBookCountOfBookType);
module.exports.path = path;