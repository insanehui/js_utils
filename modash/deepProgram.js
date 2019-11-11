/*
 * deepProcess多次调用的语法糖
 * 进一步体现拼积木的思想
 */
import deepProcess from './deepProcess.js'

export default function program(obj, ...processes) {
  let res = obj
  for (const process of processes) {
    res = deepProcess(res, ...process)
  }
  return res
}
