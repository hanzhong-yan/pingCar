'use strict';
var views = require('co-views');
var parse = require('co-body');
var Util = require('../util/util');
//vau Order = require('./order');
//var render = views(__dirname + '/../views', {
var render = views('/root/pincarweb', {
//var render = views('/root/pincer-client', {
  map: { html: 'swig' }
});

// var zhaoRen = {
// };

module.exports = ZhaoRen;
function ZhaoRen(){
    if(!(this instanceof ZhaoRen))
        return new ZhaoRen();
};

ZhaoRen.prototype.home = function *home(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    //var param = yield parse(this);
    //console.log('body is:%s', JSON.stringify(param));
    console.log('new pingcar:------------');
    this.body = yield render('pincar',{});
};
ZhaoRen.prototype.index= function *index(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    var param = this.query;
    this.body = param.echostr;
};
ZhaoRen.prototype.indexForPost= function *indexForPost(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    console.log("------");
    //var param = this.query;
    //var reqData = this.request.params;
    var reqData = {
	q:this.query,
	a:this.params || "a",
	b:this.request.params || "b",
	body : this.request.body || "c"
        //d: yield parse(this) || "d"
    };
    var reqData = reqData || {test:11};
    console.log('body is:%s ',JSON.stringify(reqData));
    this.body = yield render('pincar',{});
};

ZhaoRen.prototype.createOrder = function *createOrder(id){
    //save order 
    console.log('id is:%s',id);
    var param = yield parse(this);
    console.log('body is:%s', JSON.stringify(param));
    var order = param ; 
    order.type = 1 ;//订单类型是找人 
    var id = Order.save(order);
    //检查有没有满足该订单的找人的信息
    var result = Order.matchZhaoRen(order);
    this.body = yield result;
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
    console.log('save order of : ' + JSON.stringify(order));
    this.cache[order.id] = order ; 
};

Order.matchZhaoRen = function(order){
   //mock it  
   var result = [];
   result.push({
       userId : 123 , 
       nickname : 'harry.yan',
       startpoint : order.startpoint ,
       destination : order.startpoint ,
       time : order.time , 
       mobileNo : 13795461789
   });
   return result ; 
};

Order.cache = {};
//TODO:cache的持久化
//TODO:cache的初始化
