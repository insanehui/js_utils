/*
 * 写命令行程序的一些工具
 */
import 'colors'

export function need(condition, msg, retcode = 0){
  if ( !condition ) {
    console.log(`ERROR! ${msg}`.red)
    process.exit(retcode)
  } 
}

