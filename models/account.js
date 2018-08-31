var query=require('../DB/DbPool');
var accountSql=require('../DB/accountSql').AccountSql;

function account() {
    this.getAccount=function (user_name,callback) {
        var sql=accountSql.select;
        query(sql,[user_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results){
                    callback(null,results[0].account_address);
                }else{
                    callback(null,null);
                }
            }
        })
    };
    this.insertAccount=function (user_name,account_address,callback) {
        var sql=accountSql.insert;
        query(sql,[user_name,account_address],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(err,results['affectedRows']);
            }
        })
    };
};

module.exports=account;