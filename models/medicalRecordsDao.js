/*
*
* @author TimmyWang
* @time 2018/8/31
* 提供医疗数据的接口
*
* */

var MedicalRecords=require('./medicalRecords');

function medecalRecordsDao() {
    const medicalRecords=new MedicalRecords();
    this.getMedicalRecords=function () {
        if(medicalRecords){
            return medicalRecords;
        }else{
            return new MedicalRecords();
        }
    }
}