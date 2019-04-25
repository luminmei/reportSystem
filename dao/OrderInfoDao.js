var dbutil = require("./DBUtil");
// 分页查找订单信息
function queryOrderInfoByPage(page, pageSize, orderCode,  success) {
    var querySql = "";
    var params = [];
    if (orderCode) {
        querySql = "select * from orderinfo where orderCode=? limit ?, ?";
        params = [orderCode, page * pageSize, pageSize];
    } else {
        querySql = "select * from orderinfo limit ?, ?";
        params = [page * pageSize, pageSize];
    }

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
// 计算总的订单数量
function queryOrderInfoOfTotal(orderCode ,success) {
    var querySql = "";
    var params = [];
    if (orderCode) {
        querySql = "select count(*) as total from orderinfo where orderCode=?";
        params = [orderCode];
    } else {
        querySql = "select count(*) as total from orderinfo";
        params = [];
    }

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
// 按月查询订单情况
function queryOrderInfoByMonth (success) {
    var   querySql = "select DATE_FORMAT(orderDate,'%c') as month,sum(expressFee) as post,(sum(totalPrice) - sum(primeCost)) as base,sum(totalPrice) as sales,(sum(totalPrice) - sum(primeCost)) / sum(totalPrice) as rate from orderinfo group by DATE_FORMAT(orderDate,'%Y-%c') order by cast(`month` as signed integer)";
    var   params = [];

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
// 根据支付方式进行统计 （占比）
function queryOrderInfoByPayMethod (success) {
    var   querySql = "select payMethod,count(*) as totalNum,sum(totalPrice) as totalPrice from orderinfo group by payMethod";
    var   params = [];
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

// 根据取货方式进行统计
function queryOrderInfoByPostMethod (success) {
    var   querySql = "select postMethod,count(*) as total from orderinfo group by postMethod";
    var   params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            // success(result);
            console.log(result)
        } else {
            console.log(error)
        }
    });
    connection.end()
}

// 根据城市进行统计，统计出销售额
function queryOrderInfoByRecCity(success) {
    var querySql = "";
    querySql = "select recCity,recProvince,sum(expressFee) as post,(sum(totalPrice) - sum(primeCost)) as base,sum(totalPrice) as sales,(sum(totalPrice) - sum(primeCost)) / sum(totalPrice) as rate from orderinfo  group by recCity order by sum(totalPrice) desc";
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

// 根据省份进行统计，统计出销售额
function queryOrderInfoByRecProvince(success) {
    var querySql = "";
    querySql = "select recProvince,sum(expressFee) as post,(sum(totalPrice) - sum(primeCost)) as base,sum(totalPrice) as sales,(sum(totalPrice) - sum(primeCost)) / sum(totalPrice) as rate from orderinfo  group by recProvince   order by sum(totalPrice) desc";
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

// 按日查询今日订单数和金额
function queryOrderByDay (date, success) {
    var   querySql = "select count(*) as total,sum(totalPrice) as totalmoney,orderDate from orderinfo group by DATE_FORMAT(orderDate,'%Y-%m-%d') having orderDate = ?";
    var   params = [date];

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
    "queryOrderInfoByPage": queryOrderInfoByPage,
    "queryOrderInfoOfTotal": queryOrderInfoOfTotal,
    "queryOrderInfoByMonth": queryOrderInfoByMonth,
    "queryOrderInfoByPayMethod": queryOrderInfoByPayMethod,
    "queryOrderInfoByPostMethod": queryOrderInfoByPostMethod,
    "queryOrderInfoByRecCity": queryOrderInfoByRecCity,
    "queryOrderInfoByRecProvince": queryOrderInfoByRecProvince,
    "queryOrderByDay": queryOrderByDay
};