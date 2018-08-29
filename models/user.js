var DBconfig=require('../DB/mysql').config.db;
var mysql=require('mysql');

/*
* @author TimmyWang
* @time 2018/8/29
* 操作表user_info，将操作结果返回
* */


/*
* 搜索用户
* @param{string}user_name
* @return{string}err 错误信息，无错误为undefined
* @return{object}results 查询结果，无查询结果返回undefined
* */
exports.seachUserByName=function (user_name,callback) {
    var querySql='select * from user_info where user_name=\''+user_name+'\'';
    cn=mysql.createConnection(
        DBconfig
    );
    cn.connect();
    cn.query(querySql,function (err,results) {
        if(err!=undefined){
            //数据库查询有错误
            //返回错误信息
            cn.end();
            callback(err,undefined);
        }else{
            //数据库查询成功
            cn.end();
            callback(undefined,results);
        }
    });
};

/*
* 添加用户
* @param{string}user_name
* @param{string}password
* @param{int}sex 0:male 1:female
* @param{int}height
* @param{int}weight
* @param{int}age
*
* @return{string}err
* @return{object}
*
* 用户数据默认保存到本地/data目录下
* 健康数据保存在/data/healthyData下
* 头像图片保存在/data/portrait下
*
*
* */
exports.addUser=function (user_name,password,sex,height,weight,age,callback) {
    cn=mysql.createConnection(
        DBconfig
    );
    cn.connect();
    var addSql="insert into user_info(" +
        "user_name," +
        "password," +
        "sex," +
        "height," +
        "weight," +
        "age," +
        "portrait_location," +
        "data_location" +
        ") values(?,?,?,?,?,?,?,?)";
    var portrait_location='/data/portrait/'+user_name+'.png';
    var data_location='/data/healthyData/'+user_name+'.txt';
    var addSqlParams=[user_name,password,sex,height,weight,age,portrait_location,data_location];
    cn.query(addSql,addSqlParams,function (err,result) {
        if(err!=undefined){
            //数据库插入失败
            cn.end();
            callback(err,undefined);
        }else{
            cn.end();
            callback(undefined,result);
        }
    });
};


/*
* 更新用户数据
* @param{string}user_name 需要更新数据的用户名
* @param{string}updateConfig 更新的选项
* @return{string} err
* @return{object}
* */
exports.updataUser=function (user_name,updateConfig,callback) {
    //根据更新项创建sql语句
    var updateSql="update user info set ";
    var updataParam=[];
    for(var key in updateConfig){
        updateSql=updateSql+key+"=?,";
        updataParam.push(updateConfig[key]);
    }
    updateSql=updateSql.substring(0,updateSql.length-1);
    updateSql+=' where user_name=\''+user_name+'\'';
    cn=mysql.createConnection(
        DBconfig
    );
    cn.connect();
    //更新数据库
    cn.query(updateSql,updataParam,function (err,result) {
        if(err!=undefined){
            cn.end();
            callback(err,undefined);
        }else{
            cn.end();
            callback(undefined,result);
        }
    })
};

/*
* 删除用户
* @param{string}user_name
* @return{string} err
* */
exports.deleteUser=function (user_name,callback) {
    var deleteSql='delete from user_info where user_name =\'' +
        user_name+
        '\'';
    cn=mysql.createConnection(
        DBconfig
    );
    cn.connect();
    cn.query(deleteSql,function (err,result) {
        if(err!=undefined){
            cn.end();
            callback(err,undefined);
        }else{
            cn.end();
            callback(undefined,result);
        }
    })
};
