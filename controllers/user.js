var User = {};

User.cache = {};
//TODO:cache的持久化
//TODO:cache的初始化

module.exports= User;

User.save=function(user){
	user.cache[user.openid] = user;
};

var persisting = 0;//是否真正持久化
User.persistToFile = function(){
    if(persisting === 1) return;
    persisting = 1;
    var fileName = './data/User';
    var data = JSON.stringify(User.cache);
    fs.writeFile(fileName,data,function(err){
        persisting = 0;
        if(err) console.log('occurred error when persist order:%s',err);
        else console.log("finished of persist order")
    });
}

var loadFilePromise = function(fileName){
  var promise = new Promise(function(resolve,reject){
    if(!fs.existsSync(fileName)) {
      console.log("the file:%s is not exists",fileName);
      resolve({});
    }else{
      fs.readFile(fileName,function(err,data){
        if(err) reject(err);
        resolve(JSON.parse(data));
      });
    }
  });
  return promise;
};

//加载最近5天的数据
User.load = function(){
    User.cache = User.cache || {};

    var fileName = './data/User';

    var promise = loadFilePromise(fileName);
    promise.then(function(data){
    	User.cache = data;
    });


}

User.load();