var mysql=require('mysql');
var dbConfig=require('./dbconfig').config.db;

const dbPool=mysql.createPool(
    dbConfig
);

var query=function (sql,options,callback) {
    dbPool.getConnection(function (err,conn) {
        if(err){
            callback(err,null);
        }else{
            conn.query(sql,options,function (err,results,fields) {
                if(err){
                    callback(err,null);
                }else{
                    conn.release();
                    callback(err,results);
                }
            })
        }
    })
};

module.exports=query;