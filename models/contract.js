var query=require('../DB/DbPool');
var contractSql=require("../DB/ContractSql").ContractSql;

function contract() {
    this.getContract=function (contract_name,callback) {
        var sql=contractSql.select;
        query(sql,[contract_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results[0]){
                    var returnData={
                        "contract_name":results[0].contract_name,
                        "contract_address":results[0].contract_address,
                        "contract_abi":results[0].contract_abi,
                        "contract_object":results[0].contract_object
                    };
                    callback(null,returnData);
                }else{
                    callback(null,null);
                }
            }
        })
    };
    this.insertContract=function (name,address,abi,object,callback) {
        var sql=contractSql.insert;
        var options=[name,address,abi,object];
        query(sql,options,function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results['affectedRows']);
            }
        })
    };
};

module.exports=contract;