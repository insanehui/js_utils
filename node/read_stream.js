/*
 * 从stream里一次性读完数据的库
 * 使用该函数的前提是：该stream不能在其他地方再被读取（用完即废）
 */
export default s => {
  return new Promise((ok)=>{
    let buf = Buffer.from('')
    s.on('data', data=>{
      buf = Buffer.concat([buf, data])
    })
    s.on('end', ()=>{
      ok(buf)
    })
  })
}
