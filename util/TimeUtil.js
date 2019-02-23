var moment = require("moment");

function getNow () {
    return parseInt(Date.now() / 1000);
}
function formatDate (time) {
    return moment(time).format("YYYY-MM-DD")
    // HH:mm:ss
}
module.exports = {
    "getNow": getNow,
    "formatDate": formatDate
}