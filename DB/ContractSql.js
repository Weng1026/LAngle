/*
*
* contract_info表的SQL语句
*
* */

exports.ContractSql={
    select:"select * from contract_info where contract_name = ?",
    insert:"insert into contract_info(contract_name,contract_address,contract_abi,contract_object) values(?,?,?,?)"
};