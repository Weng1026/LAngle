/*
*
* @author TimmyWang
* @time 2018/8/29
* 提供健康数据的接口
*
* */

var HealthyData=require('./healthyData')

function HealthyDataDao() {
    var healthyData=new HealthyData();
    this.addHealthyData=function (user_name,addDataInJson,callback) {
        healthyData.addData(user_name,addDataInJson['Data'],function (result) {
            if(result){
                callback(true);
            }else{
                callback(false);
            }
        })
    };
    this.getHealthyData=function (user_name,days,callback) {
        healthyData.getData(user_name,days,function (iterms,returnData) {
            //将返回的数组组成json格式的字符串
            var healthyData={
                "data":returnData,
                "days":iterms
            };
            callback(JSON.stringify(healthyData));
        })
    }
}

module.exports=HealthyDataDao;