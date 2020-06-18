/*
 * 用于promise-mysql connection对象的一个包装，令其执行sql语句能打日志
 */
import _ from 'lodash'
const log = require('debug')('utils:sql')
const mysql = require('mysql')

/*
 * db可能是promise-mysql的一个connection或者是pool
 */
export function logify(db){ 

  const query = (sql, para)=>{
    sql = mysql.format(sql, para)
    log(sql)
    return db.query(sql) // 其实这是一个async函数，但由于这里没有出现await，故也不用加上async
  }

  const exist = async (table, obj) => {
    const res = await query(`select * from ${table} where ?`, obj)
    return res[0]
  }

  const update = async (table, obj, ...keys) => {
    const res = await query(`update ${table} set ? where ?`, [obj, _.pick(obj, keys)])
    return res
  }

  const insert = async (table, obj) => {
    const res = await query(`insert into ${table} set ?`, obj)
    return res
  }

  const setData = async (table, obj, ...keys) => {
    const filter = _.pick(obj, keys)
    const isExist = await exist(table, filter)
    let res
    if ( isExist ) {
      res = await update(table, obj, ...keys)
    } 
    else {
      res = await insert(table, obj)
    }
    return res
  }

  const setDatas = async (table, objs, ...keys) => {
    for (const obj of objs) {
      await setData(table, obj, ...keys)
    }
  }

  return {
    exist,
    query, 
    update, 
    insert,
    setData,
    setDatas,
  }
}
