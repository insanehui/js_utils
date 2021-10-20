/*
 * 递归读取一个文件的内容，支持无限的include机制
 * 默认通过 #include '../aa/bb'的方式
 */
import _ from 'lodash'
const fs = require('fs-extra')
const path = require('path')
import yaml from 'js-yaml'

import {arrayExpand} from '../modash/arrayExpand.js'

/*
 * from是开始标记，比如'#副歌'
 */
export default function deepReadFile(fp, pattern, wd, from, to) {
  // 处理缺省参数
  if ( !pattern ) {
    pattern = '#include'
  } 

  if ( !wd ) {
    wd = path.dirname(fp)
  } 

  // 先把文件全部内容读进来
  let s = fs.readFileSync(fp, 'utf8')

  // 按行分割
  s = s.split('\n')

  if ( !from ) {
    from = 0
  } 
  else { // 这时from是一个要搜索的字符串
    from = _.findIndex(s, x=>x.startsWith(from))
  }

  if ( !to ) {
    to = undefined
  } 
  else {
    to = _.findIndex(s, x=>x.startsWith(to))
  }

  s = s.slice(from, to)

  s = _.map(s, line => {
    if ( line.startsWith(pattern) ) {
      // 分割一下
      line = line.replace(pattern, '')

      // 找到包含的文件路径
      // line = yaml.load(line)
      const arr = line.split(',').map(_.trim)
      const [subPath, subFrom, subTo] = arr
      const subDir = path.dirname(subPath)
      const subWd = path.join(wd, subDir)

      // 递归
      return deepReadFile(path.join(wd, subPath), pattern, subWd, subFrom, subTo)
    } 
    return line
  })

  s = s.join('\n')
  return s
}
