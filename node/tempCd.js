/*
 * 用于临时cd到别的目录做一些事情，完成之后能cd回原cwd的函数
 */

export default async function(fn){
  const dir = process.cwd() 
  await fn()
  process.chdir(dir) 
}
