var Util = require('../util/util');
var _= require('../util/underscore.js');
var dateFormat = require('dateformat');
var fs = require("fs");
//order sample
/* var orderSample = {
    id : 201603172010501231 ,
    type : 1 ,//1:zhaoren  2:zhaoche
    userId : 123 , 
    startPoint : '',//见hotSpot表
    destination : '',
    time : '2016-04-02 21:15',//出发时间，精确到分
    mobileNo : ''
    sex : 1 ,//0 : 不限 1:女 2:男
    remainderSeatNum : 3 ,
    addTime : '',
    status : 0  //0:正常  1:已满 2:已取消 
}; */


var Order = {};
Order.createOrder = function(order){
    Order.save(order);
    //检查有没有满足该订单的找人的信息
    var result = Order.matchPingChe(order);
    result = {order:order,data:result};
    return result;
};
Order.save = function(order){
    if(!order.id){
        var id = Util.mkTimestampId();
        console.log("**********************create new order :" + id);
        order.id = id + "" + order.type;
        order.addTime = new Date();
    }else{
        //update the order by id
        this.cache[order.id] = order ; 
    }
    order.modifyTime = new Date();
    console.log('save order of : ' + JSON.stringify(order));
    this.cache[order.id] = order ; 
    Order.persistToFile();
};

Order.matchPingChe = function(order){
   //mock it  
   var result = [];
   var isMock = order.isMock || 0;
   if(isMock == 1){
       result = mockMatch(order);
   }else{
       result = realMatch(order);
   }
   console.log("the match result is:%s" , JSON.stringify(result));
   return result ; 

   function realMatch(reqOrder){
       console.log("all order is:" + JSON.stringify(Order.cache));
       var reqOrderTime = new Date(reqOrder.time);
       var matched = [];
       if(Order.cache ){
           for(var id in Order.cache){
               var order = Order.cache[id];
               //ignore 过期的订单 
               var orderTime = new Date(order.time);
               console.log("the order is : " + JSON.stringify(order));
               console.log("the req order is : " + JSON.stringify(reqOrder));
               if(orderTime.getTime() < (new Date()).getTime()) return;

               if(order.status && order.status !== 0) return ; //订单已满或者已取消
               if(parseInt(order.type) != parseInt(reqOrder.type)){//1:车找人  2:人找车 
                   order.score = Math.abs(orderTime - reqOrderTime);
                   console.log("===============matched 1" + JSON.stringify(order));
                   matched.push(order);
               }
           }
       }
       if(matched && matched.length > 0){
           matched.sort(function(o1,o2){
               return o1.score - o2.score ; 
           });
       }
       return matched ; 
   }

   function mockMatch(order){
       var result = [];
       for(var i=0;i<30;i++){
           result.push(order);
       }
       return result;
       /* result.push({
           userId : 123 , 
           nickname : 'harry.yan',
           startpoint : order.startpoint ,
           destination : order.startpoint ,
           time : order.time , 
           mobileNo : 13795461789
       }); */
   }
};

var persisting = 0;//是否真正持久化
Order.persistToFile = function(){
    if(persisting === 1) return;
    persisting = 1;
    var fileName = './data/Order_' + dateFormat(new Date(),"yyyymmdd");
    var data = JSON.stringify(Order.cache);
    fs.writeFile(fileName,data,function(err){
        persisting = 0;
        if(err) console.log('occurred error when persist order:%s',err);
        else console.log("finished of persist order")
    });
}
//加载最近5天的数据
Order.load = function(){
    var fileName = './data/Order_' + dateFormat(new Date(),"yyyymmdd");
    fs.readFile(fileName,function(err,data){
        if(err) throw err;
        Order.cache = JSON.parse(data);
    });
    Order.cache = Order.cache || {};
    var i = 5;
    while(i > 0){
                
        i--;
    }
}

//找出用户最近一次的订单，考虑在时间上与当前比较贴近
Order.getUserLastestOrder = function(userId){
    var allUserOrder = [];
    for(var orderId in Order.cache){
       var order = Order.cache[orderId] ;
       if(order.userId === userId){
           allUserOrder.add(order);
       }
    }
    if(allUserOrder.length > 0){
       allUserOrder.sort(function(a,b){
       var time2MinuteOfNow = util.time2Minute(now);
          return diffTime(util.time2Minute(a.time),time2MinuteOfNow) - diffTime(util.time2Minute(b.time),time2MinuteOfNow)
          function diffTime(a,b){
              return Math.abs(a-b);
          }
       });    
       return allUserOrder[0];
    }
}

Order.cache = {};
//TODO:cache的持久化
//TODO:cache的初始化

module.exports= Order;
