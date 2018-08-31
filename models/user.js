var query=require('../DB/DbPool');
var userSql=require('../DB/UserSql').UserSql;
/*
*
* @author TimmyWang
* @time 2018/8/29
* 操作表user_info，将操作结果返回
*
* */
function user(){
    /*
    *
    * 搜索用户
    *
    * @param{string}user_name
    *
    * @callback{string err,string result}
    * err:错误信息
    * result：用户数据JSON格式
    *
    * */
    this.searchUserByName=function (user_name,callback) {
        var sql=userSql.select;
        query(sql,[user_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results[0]){
                    var user={
                        "user_name":results[0].user_name,
                        "password":results[0].password,
                        "sex":results[0].sex,
                        "height":results[0].height,
                        "weight":results[0].weight,
                        "age":results[0].age,
                        "portrait_location":results[0].portrait_location,
                        "data_location":results[0].data_location
                    };
                    callback(null,JSON.stringify(user));
                }else{
                    callback(null,null);
                }
            }
        })
    };

    /*
    *
    * 添加用户
    *
    * @param{string}userInfo
    *
    * @callback{string err,int result}
    * err:错误信息
    * result：添加条数
    *
    * */

    this.addUser=function (userInfo,callback) {
        var sql=userSql.insert;
        var user=JSON.parse(userInfo);
        var options=[
            user['user_name'],
            user['password'],
            user['sex'],
            user['height'],
            user['weight'],
            user['age'],
            '/data/portrait/'+user['user_name']+'.jpg',
            '/data/healthyData/'+user['user_name']+'.json'
        ];
        query(sql,options,function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results['affectedRows']);
            }
        })
    };

    /*
    *
    * 更新用户
    *
    * @param{string}user_name
    * @param{string}updateData
    *
    * @callback{string err,int result}
    * err:错误信息
    * result：更新的条数
    *
    * */
    this.updateUser=function (user_name,updateData,callback) {
        var sqlPreffix=userSql.updateSqlPrefix;
        var sqlSuffix=userSql.updateSqlSuffix;
        var data=JSON.parse(updateData);
        var options=[];
        for(var key in data){
            sqlPreffix=sqlPreffix+key+"=?,";
            options.push(data[key]);
        }
        sqlPreffix=sqlPreffix.substring(0,sqlPreffix.length-1);
        var sql=sqlPreffix+sqlSuffix;
        options.push(user_name);
        query(sql,options,function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results['affectedRows']);
            }
        });
    };

    /*
    *
    * 检测用户名是否存在
    *
    * @param{string}user_name
    *
    * @callback{string err,bool result}
    * err:错误信息
    * result：表示用户是否存在
    *
    * */
    this.isNull=function (user_name,callback) {
        var sql=userSql.select;
        query(sql,[user_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results[0]?false:true);
            }
        });
    };

    /*
    *
    * 登陆检测
    *
    * @param{string}user_name
    * @param{string}password
    *
    * @callback{string err,bool result}
    * err:错误信息
    * result：用户密码是否正确
    *
    * */
    this.loginCheck=function (user_name,password,callback) {
        var sql=userSql.select;
        query(sql,[user_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results){
                    callback(null,results[0]['password']==password?true:false);
                }else{
                    callback(null,false);
                }
            }
        })
    }
}

module.exports=user;