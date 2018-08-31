/*
*
* account_info表的SQL语句
*
* */

exports.AccountSql={
    select:"select * from account_info where user_name = ?",
    insert:"insert into account_info(user_name,account_address) values(?,?)"
};