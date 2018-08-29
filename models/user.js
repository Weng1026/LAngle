var DBconfig=require('../DB/mysql').config.db;
var mysql=require('mysql');

/*
* @author TimmyWang
* @time 2018/8/29
* 操作表user_info，将操作结果返回
*
* */


/*
* @param{string}user_name
* @return{string}err 错误信息，无错误为undefined
* @return{string}results 查询结果，无查询结果返回undefined
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
* @param{string}user_name
* @param{string}password
* @param{int}sex 0:male 1:female
* @param{int}height
* @param{int}weight
* @param{int}age
*
* @return{string}err
* @return{int} returnCode 0:有错误 1:没错误
*
* 
* */
exports.addUser=function (user_name,password,sex,height,weight,age,callback) {
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
    cn=mysql.createConnection(
        DBconfig
    );
    cn.connect();
    cn.query(addSql,addSqlParams,function (err,result) {
        if(err!=undefined){
            //数据库插入失败
            cn.end();
            callback(err,0);
        }else{
            cn.end();
            callback(undefined,1);
        }
    })
};