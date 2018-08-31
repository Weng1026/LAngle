var account=require('./account');

function accountDao() {
    const Account=new account();
    this.getAccount=function () {
        if(Account){
            return Account;
        }else{
            return new account();
        }
    }
}

module.exports=accountDao;