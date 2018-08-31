/*
*
* @author TimmyWang
* @time 2018/8/31
* 与文件交互，实现用户医疗数据件的读写操作
*
* 医疗数据格式
* {
*   "Data":[
*         {
*            "data":"20180825",
*            "hos_name":...
*            ...
*         },
*         {
*            "data":"20180825",
*            "hos_name":...
*            ...
*         }
*   ]
* }
* */

var fs=require('fs');
var basicPath='/data/MedicalRecords';

function MedicalRecords() {
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

    this.getData=function (user_name,options,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists){
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                if(options){
                    //有条件查找
                    if(options[0]!=null){
                        //按照医院名字查找
                        var returnData=new Array();
                        for(var i=0;i<readData.Data.length;i++){
                            if(readData.Data[readData.Data.length-1-i]['hos_name']==options[0]){
                                returnData[i]=readData.Data[readData.Data.length-1-i];
                            }
                        }
                        var healthyData={
                            "data":returnData,
                        };
                        callback(JSON.stringify(healthyData));
                    }else{
                        //按照病历条数查找
                        var returnData=new Array();
                        for(var i=0;i<5;i++){
                            returnData[i]=readData.Data[readData.Data.length-1-i-options[1]];
                        }
                        var healthyData={
                            "data":returnData,
                        };
                        callback(JSON.stringify(healthyData));
                    }
                }else{
                    //未按照医院数量查找
                    var returnData=new Array();
                    for(var i=0;i<5;i++){
                        returnData[i]=readData.Data[readData.Data.length-1-i];
                    }
                    var healthyData={
                        "data":returnData,
                    };
                    callback(JSON.stringify(healthyData));
                }
            }else{
                callback(null);
            }
        });
    };


    //按照时间医生判断所要添加的医疗是否在本地文件中已经存在
    function isRepetitive(Data,insertData) {
        for(var i=0;i<Data.length;i++){
            if((Data[i].date==insertData.date)&&(Data[i].doctor==insertData.doctor)){
                return true;
            }
        }
        return false;
    };
}

module.exports=MedicalRecords;