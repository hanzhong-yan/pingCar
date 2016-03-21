var _ = require('./underscore');
var date = require('date');
var dateFormat = require('dateformat');
module.exports.mkTimestampId = function(){
    return  dateFormat(new Date(),"yyyymmddHHMMssSSS");
}
