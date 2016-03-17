var _ = require('./underscore');
var date = require('date');
var dateFormat = require('dateformat');
module.exports = utility ; 
var utility = {};
var u = utility ; 
u.mkTimestampId = function(){
    return  dateFormat(new Date(),"yyyymmddHHMMssSSS");
}
