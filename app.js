'use strict';
var messages = require('./controllers/messages');
var zhaoRen = require('./controllers/zhaoRen')();
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));
app.use(route.post('/zhaoRen/:id', zhaoRen.createOrder));
app.use(route.get('/zhaoRen', zhaoRen.home));
app.use(route.get('/index', zhaoRen.index));
app.use(route.post('/index', zhaoRen.indexForPost));
//app.use(route.get('/zhaoRen', messages.list));
/* app.use(route.get('/zhaoRen', function*(){
    console.log("111111111111111");
    yield zhaoRen.home();
})); */

// Serve static files
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join('/root', 'pincarweb')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(80);
  console.log('listening on port 4000');
}
