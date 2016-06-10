'use strict';
var views = require('co-views');
var parse = require('co-body');
var Util = require('../util/util');
var http = require('http');
var https = require('https');
var util = require('util');
var _= require('../util/underscore.js');
var Order = require('./order.js');
var User = require('./user.js');
var queryString = require("querystring");
//var render = views(__dirname + '/../views', {
var staticRoot = '/Users/harry/workspace/pincarweb';
// var staticRoot = '/root/pincarweb';
var render = views(staticRoot, {
  map: { html: 'swig' }
});

var weixin = require('weixin-api');


var config = require('../app.js').config;
// var zhaoRen = {
// };
//console.log('Order is :' + JSON.stringify(Order));
//console.log('Util is :' + JSON.stringify(Util));

module.exports = ZhaoRen;
function ZhaoRen(){
    if(!(this instanceof ZhaoRen))
        return new ZhaoRen();
};

ZhaoRen.prototype.home = function *home(){
    console.log('new pingcar:------------');
    var openId = this.query.openId || "1234"; 
    var nickName = "";

    if(this.query.code){

        //get openId 
        var userInfo = yield getPageAuthToken(this.query.code);
        userInfo = yield getUserInfoOfWeixin(userInfo.access_token,userInfo.openid);
        console.log('the userInfo is:%j',userInfo);
        openId = userInfo.openid;
        nickName = userInfo.nickname;
        User.save(userInfo);

    }else{

        var appId = config.appId;
        var redirectUrl = 'http://'+config.domain+'/zhaoRen';
        redirectUrl = encodeURI(redirectUrl);
        var scope = "snsapi_userinfo";

        var authUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=1#wechat_redirect";

        authUrl = util.format(authUrl,appId,redirectUrl,scope);

        this.redirect(authUrl);
        return;
    }




    var type = 1;
    var userId = getUserByOpenId(openId);
    var lastestOrder = Order.getUserLastestOrder(userId,type);
    var qsObj = {};
    qsObj = _.pick(lastestOrder,"userId","nickName","type","card","phone","seat","startPoint","destination","detail","time","id");
    
    var redirectUrl = 'http://'+config.domain+'/pincarweb/pincar.html#menuId=zhaoRen';

    if(!_.isEmpty(qsObj)){
        qsObj.time = qsObj.time.replace(' ','T');
        redirectUrl += "#" + queryString.stringify(qsObj,"#");
    }else{
        redirectUrl += "#" + "userId=" + openId+ "#nickName=" + nickName;
    }
    this.redirect(redirectUrl);
};


function getPageAuthToken(code){
   var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code"; 
   url = util.format(url,config.appId,config.appSecuret,code);
   var promise = new Promise(function(resolve,reject){
        https.get(url,function(res){
            var data ="";
            res.on('data', (chunk) => {
                data += chunk;
            });
          res.on('end', () => {
            console.log("the data is:%s",data);
            data = JSON.parse(data);
            console.log('No more data in response.');
            resolve(data);
          });
        }).on('error',(e)=>{
            console.log(`Got error: ${e.message}`);
            reject(e);
        });
        
  });
  return promise;

}


function getUserInfoOfWeixin(at,openId){
    var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN';
    url = util.format(url,at,openId);
   var promise = new Promise(function(resolve,reject){
        https.get(url,function(res){
            var data ="";
            res.on('data', (chunk) => {
                data += chunk;
            });
          res.on('end', () => {
            console.log("the data is:%s",data);
            data = JSON.parse(data);
            console.log('No more data in response.');
            resolve(data);
          });
        }).on('error',(e)=>{
            console.log(`Got error: ${e.message}`);
            reject(e);
        });
        
  });
  return promise;
}
ZhaoRen.prototype.homeZhaoChe = function *homeZhaoChe(){
    //this.redirect('http://120.25.196.109/pincar.html#&menuId=zhaoChe');
    //this.redirect('http://'+config.domain+'/pincarweb/pincar.html#menuId=zhaoChe');
    var openId = this.query.openId || "12345"; 
    var nickName = "";

    if(this.query.code){

        //get openId 
        var userInfo = yield getPageAuthToken(this.query.code);
        userInfo = yield getUserInfoOfWeixin(userInfo.access_token,userInfo.openid);
        console.log('the userInfo is:%j',userInfo);
        openId = userInfo.openid;
        nickName = userInfo.nickname;
        User.save(userInfo);

    }else{

        var appId = config.appId;
        var redirectUrl = 'http://'+config.domain+'/zhaoChe';
        redirectUrl = encodeURI(redirectUrl);
        var scope = "snsapi_userinfo";

        var authUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=1#wechat_redirect";

        authUrl = util.format(authUrl,appId,redirectUrl,scope);

        this.redirect(authUrl);
        return;
    }



    var type = 2;//找车
    var userId = getUserByOpenId(openId);
    var lastestOrder = Order.getUserLastestOrder(userId,type);
    var qsObj = {};
    qsObj = _.pick(lastestOrder,"userId","nickName","type","card","phone","seat","startPoint","destination","detail","time","id");
    var redirectUrl = 'http://'+config.domain+'/pincarweb/pincar.html#menuId=zhaoChe';
    if(!_.isEmpty(qsObj)){
        qsObj.time = qsObj.time.replace(' ','T');
        redirectUrl += "#" + queryString.stringify(qsObj,"#");
    }else{
        redirectUrl += "#" + "userId=" + openId + "#nickName=" + nickName;
    }
    this.redirect(redirectUrl);


}
ZhaoRen.prototype.index= function *index(){
    //this.redirect('http://120.25.196.109/pingCar/index.html');
    //this.body = yield render('zhaoRen', { });
    var param = this.query;
    this.body = param.echostr;
};
ZhaoRen.prototype.indexForPost= function *indexForPost(){
    var bodyParam = this.request.body;
    console.log("------" + bodyParam);
    //var param = this.query;
    //var reqData = this.request.params;
    var reqData = {
        q:this.query,
        a:this.params || "a",
        b:this.request.queryString || "b",
        body : bodyParam || "c"
        //d: yield parse(this) || "d"
    };
    var reqData = reqData || {test:11};
    console.log('body is:%s ',JSON.stringify(reqData));

    var rawMsg = bodyParam.xml;
    var msg = {
                fromUserName : rawMsg.toUserName,
                toUserName : rawMsg.fromUserName,
                msgType : "text",
                content : "这是文本回复",
                funcFlag : 0
    };
    var output = "" + "<xml>"+
    "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
         "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
         "<CreateTime>" + (new Date()).getTime() + "</CreateTime>" +
         "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
         "<Content><![CDATA[" + msg.content + "]]></Content>" +
         "<FuncFlag>" + msg.funcFlag + "</FuncFlag>" +
    "</xml>";
    //weixin.loop(this.req,this.res);
    this.body = output;  
};

weixin.textMsg(function(msg){
    console.log("textMsg received");
    console.log(JSON.stringify(msg));
    var resMsg = {
        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "text",
        content : "这是文本回复",
        funcFlag : 0
    };
    weixin.sendMsg(resMsg);
});

ZhaoRen.prototype.createOrder = function *createOrder(userId){
    //save order 
    var param = yield parse(this);
    //console.log('body is:%s :::%s', JSON.stringify(param),userId);
    if(userId == '1234') userId = -1;
    param.userId = userId;
    param.type = 1;//找人
    var result = Order.createOrder(param);
    this.body = result;
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


ZhaoRen.prototype.allOrder= function *allOrder(){
    var allOrder = order.getAllOrder();
}


function getUserByOpenId(openId){
    //从用户表中检查是否已经注册，如果没有注册，那么注册，反之，直接获取用户的id
    //暂时以openId为用户的id
    return openId;
}

/* var Order = {};
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
// */
