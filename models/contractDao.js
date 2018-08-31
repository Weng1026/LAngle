var contarct=require('contract');

function contractDao() {
    const Contract=new contarct();
    this.getContrct=function () {
        if(Contract){
            return Contract;
        }else{
            return new contarct();
        }
    };
};

module.exports=contractDao;