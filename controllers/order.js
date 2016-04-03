
var Util = require('../util/util');
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
        order.id = id + "" + order.type;
        order.addTime = new Date();
    }else{
        //update the order by id
        this.cache[order.id] = order ; 
    }
    order.modifyTime = new Date();
    console.log('save order of : ' + JSON.stringify(order));
    this.cache[order.id] = order ; 
};

Order.matchPingChe = function(order){
   //mock it  
   var result = [];
   var isMock = order.isMock || 1;
   if(isMock == 1){
       result = mockMatch(order);
   }else{
       result = realMatch(order);
   }
   console.log("the match result is:%s" + JSON.stringify(result));
   return result ; 

   function realMatch(reqOrder){
       console.log("all order is:" + JSON.stringify(Order.cache));
       var reqOrderTime = new Date(reqOrder.time);
       var matched = [];
       if(Order.cache && Order.cache.length > 0){
            Order.cache.forEach(function(order,idx){
                //ignore 过期的订单 
                var orderTime = new Date(order.time);
                if(orderTime.getTime() < (new Date()).getTime()) return;

                if(order.status && order.status !== 0) return ; //订单已满或者已取消
                if(order.type != reqOrder.type){//1:车找人  2:人找车 
                    order.score = Math.abs(orderTime - reqOrderTime);
                    matched.push(order);
                }
            });
       }
       if(matched && matched.length > 0){
           matched.sort(function(o1,o2){
               return o1.score - o2.score ; 
           });
       }
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

Order.cache = {};
//TODO:cache的持久化
//TODO:cache的初始化

module.exports= Order;
