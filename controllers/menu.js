var nodeWeixinMenu = require('node-weixin-menu');

var nodeWeixinSettings = require('node-weixin-settings');


// var app = {
//   id: process.env.APP_ID,
//   secret: process.env.APP_SECRET,
//   token: process.env.APP_TOKEN
// };

var app = {
  id: 'wxceea13e5e6fb3ddf',
  secret: '751683817412f0e660c0516103b26fb3',
  token: 'nddM2qfHHmeCZ9A5pUc14jbyfHXjnsFoycH4j6ng2HeC_WrBbyt5NPqxjVjVA6fQjFeKdBqt9UwHK9MpMEu0ul7MC1I6eHtAuhrJpKeDBt0ATQfADADWT'
};

console.log("----------i am here !");
var auth = require("node-weixin-auth");
var config = require("node-weixin-config");
config.app.init(app);


  var menu = {
      "button": [
        {
          "type": "view",
          "name": "找人",
          "url": "http://www.52pincar.com/zhaoRen"
        },
        {
          "type": "view",
          "name": "找车",
          "url": "http://www.52pincar.com/zhaoChe"
        },
        {
          "type": "view",
          "name": "所有信息",
          "url": "http://www.52pincar.com/getOrderList"
        },
        // {
        //   "type": "view",
        //   "name": "我的",
        //   "url": "http://www.52pincar.com/myOrder"
        // },
        // {
        //   "name": "菜单",
        //   "sub_button": [
        //     {
        //       "type": "view",
        //       "name": "搜索",
        //       "url": "http://www.soso.com/"
        //     },
        //     {
        //       "type": "view",
        //       "name": "视频",
        //       "url": "http://v.qq.com/"
        //     },
        //     {
        //       "type": "click",
        //       "name": "赞一下我们",
        //       "key": "V1001_GOOD"
        //     }
        //   ]
        // }
      ]
    };

var setting = nodeWeixinSettings;
nodeWeixinMenu.create(setting,app, menu, function (error, data) {
  //error === true
  //data.errcode === 0
  //data.errmsg === 'ok'
  console.log("the menu is created success.");
});

// nodeWeixinMenu.get(app, function (error, data) {
//   //error === true
//   //typeof data.menu
//   //typeof data.menu.button
// });

// nodeWeixinMenu.customize(app, function (error, data) {
//   //error === true
//   //data.is_menu_open === 1
//   //data.selfmenu_info
//   //data.selfmenu_info.button
// });

// nodeWeixinMenu.remove(setting,app, function (error, data) {
//   //error === true
//   //data.errcode
//   //data.errmsg
//   console.log("the menu removed success.");
// });
