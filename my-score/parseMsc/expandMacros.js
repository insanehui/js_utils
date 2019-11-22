/*
 * 替换宏
 * 
 */
import _ from 'lodash'

export default function expandMacros(text, patterns) {
  let last
  do {
    last = text
    text = text.replace(new RegExp('%\\w+\\b', 'g'), s=>{
      // 取到名字
      s = s.slice(1)
      return _.get(patterns, s, '')
    })
  } while ( last !== text)

  return text
}
