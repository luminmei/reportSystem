var manageinfoDao = require("../dao/ManageinfoDao");
var loginDao = require("../dao/LoginDao");
var respUtil = require("../util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var moment = require("moment");
var url = require("url");
var path = new Map();

function login(request, response) {
    var username=request.body.username;
    var password=request.body.password;
    manageinfoDao.queryManageByName(username, function (result) {
        if (result && result.length > 0 && result[0].password == password) {
            // 写cookie
            response.cookie("id", result[0].id);
            delete result[0].password
            response.header("Content-Type", "text/html; charset=utf-8");
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "登录成功", result[0]));
            response.end();
            loginDao.insertLogin(result[0].id,username, password, moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), function (result) {
            })
        } else {
            response.header("Content-Type", "text/html; charset=utf-8");
            response.writeHead(200);
            response.write(respUtil.writeResult("error", "用户名或密码错误", null));
            response.end()
        }
    });
}
path.set("/login", login);
module.exports.path = path;