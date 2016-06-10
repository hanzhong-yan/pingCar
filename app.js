'use strict';
var config = require('./config.js').config;
config = config[config['env']];
exports.config = config;
console.log(config);

//var messages = require('./controllers/messages');
var zhaoRen = require('./controllers/zhaoRen')();
var zhaoChe = require('./controllers/zhaoChe')();
var order = require('./controllers/order');

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var xmlParser = require('koa-xml-body').default; 
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());
app.use(xmlParser());

app.use(function *(next){
    yield next;
    //console.log("the response body is:" + JSON.stringify(this.body)); 
    this.set("access-control-allow-origin","*");
});

// app.use(route.get('/', messages.home));
// app.use(route.get('/messages', messages.list));
// app.use(route.get('/messages/:id', messages.fetch));
// app.use(route.post('/messages', messages.create));
// app.use(route.get('/async', messages.delay));
app.use(route.post('/zhaoRen/:id', zhaoRen.createOrder));
app.use(route.get('/zhaoRen', zhaoRen.home));
app.use(route.get('/zhaoChe', zhaoRen.homeZhaoChe));
app.use(route.get('/index', zhaoRen.index));
app.use(route.get('/getAllOrder', zhaoRen.allOrder));
app.use(route.post('/index', zhaoRen.indexForPost));

app.use(route.post('/getOrderList', order.getOrderList));
app.use(route.get('/getOrderList', order.getOrderListGet));
app.use(route.get('/getAllOrderList', order.getAllOrderList));
//app.use(route.get('/zhaoRen', messages.list));
/* app.use(route.get('/zhaoRen', function*(){
    console.log("111111111111111");
    yield zhaoRen.home();
})); */
app.use(route.post('/zhaoChe/:id', zhaoChe.createOrder));

// Serve static files
//var staticRoot = '/Users/harry/workspace/pincarweb';
var staticRoot = config.staticRoot;
//app.use(serve(path.join(__dirname, 'public')));
app.use(serve(staticRoot));
// Compress
app.use(compress());

var port = config.port;
if (!module.parent) {
  app.listen(port);
  console.log('listening on port %d',port);
}


function init(){
	console.log('the config is:' + JSON.stringify(config));
}
init();
