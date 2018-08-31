/*
*
* @author TimmyWang
* @time 2018/8/29
* 与文件交互，实现用户健康数据文件的读写操作
*
* 健康数据格式
* {
*   "Data":[
*         {
*            "rate":[...],
*            "step":[...],
*            "deepTime":[...],
*            "shallowTime":[...],
*            "awakeTime":[...]
*         },
*         {
*            "rate":[...],
*            "step":[...],
*            "deepTime":[...],
*            "shallowTime":[...],
*            "awakeTime":[...]
*         }
*   ]
* }
*
* */

var fs=require('fs');
var basicPath='/data/healthyData/';

function HealthyData() {
    /*
    *
    * 添加用户健康数据
    * 先判断对应目录下用户健康数据文件是否存在
    * 若不存在，直接新建文件，将数据写入
    * 若存在，判断用户数据是更新还是加入
    * 写入成功后返回true
    *
    * @param{string}user_name
    * @param{object} data:写入的数据
    * 
    * callback(bool result)
    * 
    * */
    this.addData=function (user_name,data,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists) {
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                //根据上传日期判断上传的数据是否在文件中已经存在
                var flag=isRepetitive(readData.Data,data);
                if(flag){
                    //上传数据已经存在，更新数据
                    readData.Data[readData.Data.length-1]=data;
                    writeData=JSON.stringify(readData);
                    fs.writeFileSync(dataPath,writeData);
                    callback(true);
                }else{
                    readData.Data.push(data);
                    writeData=JSON.stringify(readData);
                    fs.writeFileSync(dataPath,writeData);
                    callback(true);
                }
            }else{
                //文件不存在
                var writeData={
                    "Data":[data]
                };
                writeData=JSON.stringify(writeData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }
        });
    };

    /*
    * 获取用户数据
    * 先判断用户数据文件是否存在
    * 若不存在直接返回0
    * 若存在比较获取的天数和记录的天数，若需要的信息天数比记录的天数多，则将记录的信息存在数组全部返回
    * 反之将最近的N天返回
    * 返回数组按天数倒序排列
    *
    * @param{string}user_name
    * @param{int}days
    *
    * @callback(string returnData)
    * 返回的数据
    *
    * */

    this.getData=function (user_name,days,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists){
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                var recordedDays=readData.Data.length;
                if(recordedDays<days){
                    //记录的天数比需要的天数少
                    var returnData=new Array();
                    for(var i=0;i<recordedDays;i++){
                        returnData[i]=readData.Data[recordedDays-1-i];
                    }
                    var healthyData={
                        "data":returnData,
                        "days":recordedDays
                    };
                    callback(JSON.stringify(healthyData));
                }else{
                    //记录的天数比需要的天数多
                    var returnData=new Array();
                    for(var i=0;i<days;i++){
                        returnData[i]=readData.Data[recordedDays-1-i];
                    }
                    var healthyData={
                        "data":returnData,
                        "days":days
                    };
                    callback(JSON.stringify(healthyData));
                }
            }else{
                callback(null);
            }
        });
    };


    //判断所要添加的用户数据是否在本地文件中已经存在
    function isRepetitive(Data,insertData) {
        for(var i=0;i<Data.length;i++){
            if(Data[i].date==insertData.date){
                return true;
            }
        }
        return false;
    };
}

module.exports=HealthyData;