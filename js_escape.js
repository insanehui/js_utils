/*
 * 用于将一个【js的字符串】转成可以被引号括起来的【js文件】的形式
 */

// 单引号转义
export function single_quote_escape(str = ''){
  str = str.replace(/'/g, `\\'`)
  str = str.replace(/\n/g, `\\n`)
  return str
}
