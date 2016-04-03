'use strict';
var views = require('co-views');
var parse = require('co-body');
var Util = require('../util/util');
var Order = require('./order.js');
//var render = views(__dirname + '/../views', {
var staticRoot = '/Users/harry/workspace/pincarweb';
// var staticRoot = '/root/pincarweb';
var render = views(staticRoot, {
  map: { html: 'swig' }
});

// var zhaoRen = {
// };

module.exports = ZhaoChe;
function ZhaoChe(){
    if(!(this instanceof ZhaoChe))
        return new ZhaoChe();
};

ZhaoChe.prototype.home = function *home(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    //var param = yield parse(this);
    //console.log('body is:%s', JSON.stringify(param));
    console.log('new pingcar:------------');
    this.body = yield render('html/pincar',{});
};
ZhaoChe.prototype.index= function *index(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    var param = this.query;
    this.body = param.echostr;
};
ZhaoChe.prototype.indexForPost= function *indexForPost(){
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

ZhaoChe.prototype.createOrder = function *createOrder(userId){
    //save order 
    var param = yield parse(this);
    console.log('body is:%s :::%s', JSON.stringify(param),userId);
    param.userId = userId;
    param.type = 2;//找车
    var result = Order.createOrder(param);
    this.body = result;
};


