/*
 * 递归读取一个文件的内容，支持无限的include机制
 * 默认通过 #include '../aa/bb'的方式
 */
import _ from 'lodash'
const fs = require('fs-extra')
const path = require('path')
import yaml from 'js-yaml'

import {arrayExpand} from '../modash/arrayExpand.js'

export default function deepReadFile(fp, pattern = '#include', wd = path.dirname(fp)) {
  // 先把文件全部内容读进来
  let s = fs.readFileSync(fp, 'utf8')

  // 按行分割
  s = s.split('\n')

  s = _.map(s, line => {
    if ( line.startsWith(pattern) ) {
      // 分割一下
      line = line.replace(pattern, '')
      // 找到包含的文件路径
      const subPath = yaml.load(line)
      const subDir = path.dirname(subPath)
      const subWd = path.join(wd, subDir)

      // 递归
      return deepReadFile(path.join(wd, subPath), pattern, subWd)
    } 
    return line
  })

  s = s.join('\n')
  return s
}
