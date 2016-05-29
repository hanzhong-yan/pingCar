var _ = require('./underscore');
var date = require('date');
var dateFormat = require('dateformat');
var orderCount = 1; 
module.exports.mkTimestampId = function(){
    return  dateFormat(new Date(),"yyyymmddHHMMssl") + String(orderCount++);
}

module.exports.isAm= function(){
    var nowHour = new Date();
    return  nowHour.getHours() < 12;
}

//把8:30 转换为8*60 + 30
module.exports.time2Minute= function(date){
    var hour , minute ; 
    if(!_.isDate(date)){
        date = new Date(date);
    }
    hour = date.getHours();
    minute = date.getMinutes();
    return hour*60 + minute;
}
