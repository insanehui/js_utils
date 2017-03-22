import shell from 'shelljs'
import _ from 'lodash'

import {digits} from 'utils/regexps.js'

export function get_version(dir) { // 该dir是可以被cd的
  const _s = shell.config.silent
  shell.config.silent = true
  shell.cd(dir)

  // 先在本地执行一下svn info
  const info0 = shell.exec(`svn info`).grep(`^URL:`)
  const url = _.get(info0.match(/http.*/),'0')

  const info1 = shell.exec(`svn info ${url}`).grep(`Last Changed Rev`).match(digits)
  const ver = _.get(info1, '0')

  shell.config.silent = _s
  return ver
}

// 例
// console.log(get_version(`C:/Users/guanghui/Desktop/mart/branches/composer/images`))

