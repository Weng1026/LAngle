var User=require('./user');

/*
*
* @author TimmyWang
* @time 2018/8/30
* userDao接口
*
* */

function userDao() {
    const user=new User();
    this.getUser=function () {
        if(user==null){
            return user;
        }else{
            return new User();
        }
    }
}

module.exports=userDao;




