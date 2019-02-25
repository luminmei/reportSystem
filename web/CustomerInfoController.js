var customerInfoDao = require("../dao/CustomerInfoDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

// 按条件查询客户信息
function queryCustomerByPage(request, response) {
    var params = url.parse(request.url, true).query;
    customerInfoDao.queryCustomerByPage(parseInt(params.page-1), parseInt(params.pageSize),params.customerName ,function (result) {
        var arr = result;
        arr.map(val => {
            var temp = val;
            temp.customerRegTime = timeUtil.formatDate(val.customerRegTime);
            return temp
        });
        customerInfoDao.queryCustomerInfoOfTotal(params.customerName ,function (res) {
            response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
            response.write(respUtil.writeTotal("success", "查询成功", arr, res[0].total));
            response.end()
        });

    })
}
path.set("/api/queryCustomerByPage", queryCustomerByPage);

module.exports.path = path;