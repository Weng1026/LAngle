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
    this.getHealthyData=function () {
        if (healthyData == null) {
            return new HealthyData();
        } else {
            return healthyData;
        }
    };
}

module.exports=HealthyDataDao;