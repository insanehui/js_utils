/*
 * 用于promise-mysql connection对象的一个包装，令其执行sql语句能打日志
 */

const log = require('debug')('utils:sql')

export function logify(db){ // db是一个promise-mysql的连接对象
  return {
    query : (sql, para)=>{
      sql = db.format(sql, para)
      log(sql)
      return db.query(sql) // 其实这是一个async函数，但由于这里没有出现await，故也不用加上async
    }, 
  }
}
