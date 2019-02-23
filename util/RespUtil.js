function writeResult (status, msg, data) {
    return JSON.stringify({status: status, msg: msg, data: data});
}
function writeTotal(status, msg, data, total) {
    return JSON.stringify({status: status, msg: msg, data: data, total: total});
}
module.exports = {
    "writeResult": writeResult,
    "writeTotal": writeTotal
};