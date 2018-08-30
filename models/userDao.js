var user=require('./user');

/*
*
* @author TimmyWang
* @time 2018/8/30
* userDao接口
*
* */

/*
*
* 搜索用户并对搜索结果进行封装，返回字典对象，如：
*
* @param{string} username
*
* @callback{string err,object result}
* (err,undefined)查询数据库出错
* (undefined,undefined)数据库中没有该用户
* (undefined,object)找到该用户并返回
*
* */

exports.searchUserByName=function (user_name,callback) {
    user.seachUserByName(user_name,function (err,results) {
       if(err){
           callback(err,undefined);
       } else{
           if(results){
               var user=new Array();
               user['user_name']=results[0].user_name;
               user['password']=results[0].password;
               user['sex']=results[0].sex;
               user['height']=results[0].height;
               user['weight']=results[0].weight;
               user['age']=results[0].age;
               user['portrait_location']=results[0].portrait_location;
               user['data_location']=results[0].data_location;
               callback(undefined,user);
           }else{
               callback(undefined,undefined);
           }
       }
    });
};

/*
* 判断用户是否已经存在
*
* @param{string}user_name
*
* @callback(string err,bool isNull)
* err: undefined:没有错误
* isNull: true:用户不存在 false:用户存在
*
* */
exports.isNull=function (user_name,callback) {
    user.seachUserByName(user_name,function (err,results) {
        if(err){
            callback(err,undefined);
        }else{
            if(results){
                callback(undefined,false);
            }else{
                callback(undefined,true);
            }
        }
    })
};

/*
*
* 添加用户
*
* @param{object}userConfig 字典数组
*
* callback{string err,bool result}
* (err,undefined) err:错误信息
* (undefined,true) true:成功插入 false:插入失败
* */
exports.adduser=function (userConfig,callback) {
    user.addUser(userConfig['user_name'],
        userConfig['password'],
        userConfig['sex'],
        userConfig['height'],
        userConfig['weight'],
        userConfig['age'],
        function (err,result) {
            if(err){
                callback(err,undefined);
            }else{
                callback(undefined,result==undefined?false:true);
            }
        });
};

/*
* 更新用户数据
*
* @param{string}user_name
* @param{object} updateConfig
*
* callback(string err,int affectedRows)
* err:错误信息
* affectedRows:更新的表行数
* */
exports.updateUser=function (user_name,updateConfig,callback) {
    user.updataUser(user_name,updateConfig,function (err,result) {
        if(err){
            callback(err,undefined);
        }else{
            callback(undefined,result['affectedRows']);
        }
    });
};

/*
*
* 删除用户
*
* @param{string}user_name
*
* callback(string err,int affectedRows)
* err:错误信息
* affectedRows:删除的行数
*
* */
exports.deleteUser=function (user_name,callback) {
    user.deleteUser(user_name,function (err,result) {
        if(err){
            callback(err,undefined);
        }else{
            callback(undefined,result['affectedRows']);
        }
    })
};

/*
*
* 登陆检测
*
* @param{string}user_name
* @param{string}password
*
* callback(string err,bool result)
* err:错误信息
* result:true表示密码账号正确，false表示密码或者用户吗不正确
*
* */
exports.loginCheck=function (user_name,password,callback) {
    user.seachUserByName(user_name,function (err,results) {
        if(err){
            callback(err,undefined);
        }else{
            if(results){
                callback(undefined,password==results[0].password?true:false);
            }else{
                callback(undefined,false);
            }
        }
    })
};


