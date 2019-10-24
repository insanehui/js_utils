/*
 * 用于promise-mysql connection对象的一个包装，令其执行sql语句能打日志
 */

const log = require('debug')('utils:sql')
const mysql = require('mysql')

/*
 * db可能是promise-mysql的一个connection或者是pool
 */
export function logify(db){ 
  return {
    query : (sql, para)=>{
      sql = mysql.format(sql, para)
      log(sql)
      return db.query(sql) // 其实这是一个async函数，但由于这里没有出现await，故也不用加上async
    }, 
  }
}
