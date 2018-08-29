var user=require('./user');
var async=require('async');

/*
* 搜索用户并对搜索结果进行封装，返回字典对象，如：
* [ user_name: 'test',
  password: '123456789',
  sex: 0,
  height: 192,
  weight: 80,
  age: 22,
  portrait_location: '/portrait/0001.png',
  data_location: '/data/test.txt' ]
*
* @param{string} username
* @return{string} err
* @return{object} user
*
* */

exports.searchUserByName=function (user_name,callback) {
    async.waterfall([
        function (cb) {
            user.seachUserByName(user_name,function (err,results) {
                cb(err,results);
            })
        },
        function (results,cb) {
            if(results==undefined){
                cb('该用户不存在',undefined);
            }else{
                var user=new Array();
                user['user_name']=results[0].user_name;
                user['password']=results[0].password;
                user['sex']=results[0].sex;
                user['height']=results[0].height;
                user['weight']=results[0].weight;
                user['age']=results[0].age;
                user['portrait_location']=results[0].portrait_location;
                user['data_location']=results[0].data_location;
                cb(undefined,user);
            }
        }
    ],function (err,result) {
        if(err){
            callback(err,undefined);
        }else{
            callback(undefined,result);
        }
    })
};



