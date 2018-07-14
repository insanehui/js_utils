const child_process = require('child_process')

// export const exec = util.promisify(cp.exec); // 原来直接调用官方提供的promisify

// 支持传入标准输入的exec
export const exec = (cmd, input)=>new Promise((ok, err)=>{
  const sub = child_process.exec(cmd, {
    maxBuffer : 999999999, // 1G
  }, (error, stdout, stderr)=>{
    ok({error, stdout, stderr})
  })
  if ( input !== undefined ) {
    sub.stdin.end(input)
  } 
})
