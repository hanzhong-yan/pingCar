'use strict';
var views = require('co-views');
var parse = require('co-body');
var Util = require('../util/util');
//var Order = require('./order');

var zhaoRen = {
};

zhaoRen.createOrder = function(param){
    /*param is object of 
    * { userId : 123 , 
    *   startPoint : '',//见hotSpot表
        destination : '',
        time : '21:15',//出发时间，精确到分
        sex : 1 ,//0 : 不限 1:女 2:男
        remainderSeatNum : 3 
    * }
    * /
    //save order 
    var order = param ; 
    order.type = 1 ;//订单类型是找人 
    var id = Order.save(order);
    //检查有没有满足该订单的找人的信息
    Order.matchZhaoRen(order);
};


//order sample
var orderSample = {
    id : 201603172010501231 ,
    type : 1 ,//1:zhaoren  2:zhaoche
    userId : 123 , 
    startPoint : '',//见hotSpot表
    destination : '',
    time : '21:15',//出发时间，精确到分
    sex : 1 ,//0 : 不限 1:女 2:男
    remainderSeatNum : 3 
};


var Order = {};
Order.save = function(order){
    if(!order.id){
        var id = Util.mkTimestampId();
        order.id = id + "" + order.type;
    };
    this.cache[order.id] = order ; 
};

Order.cache = {};
//TODO:cache的持久化
//TODO:cache的初始化
